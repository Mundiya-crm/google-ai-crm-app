import React, { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import { ClearingAgent } from '../constants/clearingAgentsData';
import { Vehicle, ClearingDocument } from '../constants/vehicleData';
import { ClearingAssignmentModal } from '../components/ClearingAssignmentModal';

interface ClearingStatusViewProps {
    setView: (view: string, queryParams?: Record<string, any>) => void;
    agentId?: string;
}

const SortableHeader: React.FC<{
    label: string;
    sortKey: string;
    sortConfig: { key: string; direction: string; };
    setSortConfig: (config: { key: string; direction: string; }) => void;
    className?: string;
}> = ({ label, sortKey, sortConfig, setSortConfig, className }) => {
    const isSorted = sortConfig.key === sortKey;
    const directionIcon = sortConfig.direction === 'ascending' ? '▲' : '▼';

    const handleSort = () => {
        let direction = 'ascending';
        if (isSorted && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key: sortKey, direction });
    };

    return (
        <th className={`text-left p-2 text-xs font-semibold cursor-pointer select-none hover:bg-tertiary/80 ${className}`} onClick={handleSort}>
            {label} {isSorted && <span className="text-accent">{directionIcon}</span>}
        </th>
    );
};


export const ClearingStatusView: React.FC<ClearingStatusViewProps> = ({ setView, agentId }) => {
    const { clearingAgents, vehicles, setVehicles } = useData();
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'clearingAgentId', direction: 'ascending' });

    const agentMap = useMemo(() => new Map(clearingAgents.map(a => [a.id, a.name])), [clearingAgents]);

    const filteredVehicles = useMemo(() => {
        let baseVehicles = vehicles.filter(v => v.purchaseType === 'import');
        if (agentId) {
            baseVehicles = baseVehicles.filter(v => v.clearingAgentId === agentId);
        }
        return baseVehicles;
    }, [vehicles, agentId]);
    
    const agent = useMemo(() => agentId ? clearingAgents.find(a => a.id === agentId) : null, [agentId, clearingAgents]);

    const filteredAndSortedVehicles = useMemo(() => {
        let searchedVehicles = filteredVehicles;

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            searchedVehicles = searchedVehicles.filter(v =>
                v.chassisNumber.toLowerCase().includes(lowercasedTerm) ||
                v.stockNumber.toLowerCase().includes(lowercasedTerm) ||
                v.make.toLowerCase().includes(lowercasedTerm) ||
                v.model.toLowerCase().includes(lowercasedTerm)
            );
        }
        
        const sorted = [...searchedVehicles].sort((a, b) => {
            let aVal, bVal;

            if (sortConfig.key === 'assignedAgent') {
                aVal = a.clearingAgentId ? agentMap.get(a.clearingAgentId) || 'Z' : 'A'; // Unassigned first
                bVal = b.clearingAgentId ? agentMap.get(b.clearingAgentId) || 'Z' : 'A';
            } else {
                aVal = (a as any)[sortConfig.key];
                bVal = (b as any)[sortConfig.key];
            }

            if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });

        return sorted;

    }, [filteredVehicles, searchTerm, sortConfig, agentMap]);
    
    const handleSaveAssignment = (vehicleId: number, newAgentId: string | undefined, documents: ClearingDocument[]) => {
        setVehicles(prev => prev.map(v => 
            v.id === vehicleId 
            ? { ...v, clearingAgentId: newAgentId, clearingDocuments: documents } 
            : v
        ));
        setEditingVehicle(null);
    };

    return (
        <div className="bg-secondary p-4 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            {editingVehicle && (
                <ClearingAssignmentModal 
                    vehicle={editingVehicle}
                    onClose={() => setEditingVehicle(null)}
                    onSave={handleSaveAssignment}
                />
            )}

            <div className="flex flex-wrap justify-between items-center gap-2 mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">
                    {agent ? `Vehicles Assigned to: ${agent.name}` : "Clearing Status Dashboard"}
                </h2>
                <div className="flex items-center gap-2">
                    {agentId ? (
                         <button onClick={() => setView('clearing_dashboard')} className="btn-secondary text-sm">&larr; Back to All Agents</button>
                    ) : (
                        <>
                            <button onClick={() => setView('clearing')} className="btn-secondary text-sm">Manage Agents</button>
                            <button onClick={() => setView('add_clearing_agent')} className="btn-primary text-sm">+ Add New Agent</button>
                        </>
                    )}
                </div>
            </div>
             <div className="mb-3">
                <input
                    type="text"
                    placeholder="Search by make, model, chassis, stock#..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-72 text-sm px-3 py-1.5 border border-secondary rounded-btn bg-tertiary/50 text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                />
            </div>

            <div className="overflow-auto flex-grow">
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-primary z-10">
                        <tr>
                            <SortableHeader label="Stock #" sortKey="stockNumber" sortConfig={sortConfig} setSortConfig={setSortConfig} />
                            <th className="text-left p-2 text-xs font-semibold">Vehicle</th>
                            <SortableHeader label="Chassis #" sortKey="chassisNumber" sortConfig={sortConfig} setSortConfig={setSortConfig} />
                            <SortableHeader label="Location" sortKey="location" sortConfig={sortConfig} setSortConfig={setSortConfig} />
                            {!agentId && <SortableHeader label="Assigned Agent" sortKey="assignedAgent" sortConfig={sortConfig} setSortConfig={setSortConfig} className="w-1/4" />}
                            <th className="text-left p-2 text-xs font-semibold">Docs</th>
                            <th className="text-left p-2 text-xs font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary">
                        {filteredAndSortedVehicles.map(v => (
                            <tr key={v.id} className="hover:bg-tertiary/50">
                                <td className="p-2 font-mono whitespace-nowrap">{v.stockNumber}</td>
                                <td className="p-2 font-semibold whitespace-nowrap">{v.make} {v.model} ({v.year})</td>
                                <td className="p-2 font-mono whitespace-nowrap">{v.chassisNumber}</td>
                                <td className="p-2 whitespace-nowrap">{v.location}</td>
                                {!agentId && (
                                     <td className="p-2 whitespace-nowrap">
                                        {v.clearingAgentId ? (
                                            <span className="font-semibold text-primary">{agentMap.get(v.clearingAgentId)}</span>
                                        ) : (
                                            <span className="text-secondary italic">-- Not Assigned --</span>
                                        )}
                                    </td>
                                )}
                                <td className="p-2 text-center">{v.clearingDocuments?.length || 0}</td>
                                <td className="p-2">
                                    <button 
                                        onClick={() => setEditingVehicle(v)} 
                                        className="text-accent hover:underline text-xs font-semibold"
                                    >
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredAndSortedVehicles.length === 0 && (
                    <div className="text-center py-16 text-secondary">
                        <p className="font-semibold">{agentId ? `No vehicles assigned to ${agent?.name}.` : 'No import vehicles found.'}</p>
                         {!agentId && <p className="text-sm">Add an import vehicle to begin clearing process.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};
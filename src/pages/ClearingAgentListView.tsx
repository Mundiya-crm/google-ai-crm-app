import React, { useState, useMemo } from 'react';
import { ClearingAgent } from '../constants/clearingAgentsData';
import { ICONS } from '../constants/icons';
import { useData } from '../context/DataContext';
import { Vehicle } from '../constants/vehicleData';

interface ClearingAgentListViewProps {
    setView: (view: string, queryParams?: Record<string, any>) => void;
}

export const ClearingAgentListView: React.FC<ClearingAgentListViewProps> = ({ setView }) => {
    const { clearingAgents, setClearingAgents, vehicles, setVehicles, chartOfAccounts, setChartOfAccounts } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
    const [agentToMove, setAgentToMove] = useState<ClearingAgent | null>(null);
    const [targetAgentId, setTargetAgentId] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const vehiclesByAgent = useMemo(() => {
        const map = new Map<string, Vehicle[]>();
        clearingAgents.forEach(agent => map.set(agent.id, []));
        vehicles.forEach(vehicle => {
            if (vehicle.clearingAgentId) {
                const agentVehicles = map.get(vehicle.clearingAgentId);
                if (agentVehicles) {
                    agentVehicles.push(vehicle);
                }
            }
        });
        return map;
    }, [vehicles, clearingAgents]);

    const filteredAgents = useMemo(() => {
        if (!searchTerm) return clearingAgents;
        return clearingAgents.filter(agent =>
            Object.values(agent).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, clearingAgents]);

    const handleDelete = (agentToDelete: ClearingAgent) => {
        const assignedVehiclesCount = vehiclesByAgent.get(agentToDelete.id)?.length || 0;
        if (assignedVehiclesCount > 0) {
            setMessage({ type: 'error', text: 'Cannot delete agent with assigned vehicles. Please move them first.' });
            setTimeout(() => setMessage(null), 4000);
            return;
        }

        if (window.confirm(`Are you sure you want to delete the agent "${agentToDelete.name}"? This will also remove their A/P account.`)) {
            setClearingAgents(prev => prev.filter(agent => agent.id !== agentToDelete.id));
            setChartOfAccounts(prev => prev.filter(acc => acc.code !== agentToDelete.apAccountCode));
            setMessage({ type: 'success', text: `Agent "${agentToDelete.name}" deleted.` });
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const openMoveModal = (agent: ClearingAgent) => {
        setAgentToMove(agent);
        setTargetAgentId('');
        setIsMoveModalOpen(true);
    };

    const handleMoveVehicles = () => {
        if (!agentToMove || !targetAgentId) return;

        setVehicles(prev =>
            prev.map(v =>
                v.clearingAgentId === agentToMove.id ? { ...v, clearingAgentId: targetAgentId } : v
            )
        );

        setMessage({ type: 'success', text: `All vehicles moved from ${agentToMove.name}.` });
        setTimeout(() => setMessage(null), 3000);
        setIsMoveModalOpen(false);
        setAgentToMove(null);
    };

    return (
        <>
            <div className="bg-content-secondary p-6 rounded-md border border-content-primary shadow-inner h-full flex flex-col">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-content-primary pb-3">
                    <h2 className="text-2xl font-bold text-content-primary">Manage Clearing Agents</h2>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setView('clearing_dashboard')} className="text-sm font-semibold text-accent hover:underline">
                            &larr; Back to Clearing Dashboard
                        </button>
                        <button onClick={() => setView('add_clearing_agent')} className="btn-primary text-sm">+ Add New Agent</button>
                    </div>
                </div>
                
                {message && <div className={`p-2 rounded-md text-xs my-2 text-center ${message.type === 'success' ? 'bg-blue-900/50 text-blue-200' : 'bg-red-900/50 text-red-200'}`}>{message.text}</div>}
                
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name, contact, phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/2 text-sm px-3 py-2 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>

                <div className="overflow-x-auto flex-grow">
                    <table className="min-w-full bg-content-tertiary/30 rounded-md shadow-inner">
                        <thead className="bg-content-header text-content-secondary">
                            <tr>
                                <th className="text-left py-2 px-3 text-xs font-semibold">Agent Name</th>
                                <th className="text-left py-2 px-3 text-xs font-semibold">Contact Person</th>
                                <th className="text-center py-2 px-3 text-xs font-semibold">Vehicles Assigned</th>
                                <th className="text-center py-2 px-3 text-xs font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-content-primary">
                            {filteredAgents.map((agent, index) => {
                                const assignedCount = vehiclesByAgent.get(agent.id)?.length || 0;
                                return (
                                <tr key={agent.id} className="hover:bg-content-tertiary/50 text-xs border-b border-content-primary">
                                    <td className="py-2 px-3 font-semibold">{agent.name}</td>
                                    <td className="py-2 px-3">{agent.contactPerson || 'N/A'} ({agent.phone || 'N/A'})</td>
                                    <td className="py-2 px-3 text-center font-mono font-bold">{assignedCount}</td>
                                    <td className="py-2 px-3">
                                        <div className="flex items-center justify-center gap-4">
                                            <button onClick={() => setView('edit_clearing_agent', { id: agent.id })} className="text-accent hover:underline font-semibold">Edit</button>
                                            <button onClick={() => handleDelete(agent)} disabled={assignedCount > 0} className="text-red-400 hover:underline font-semibold disabled:text-content-secondary/50 disabled:cursor-not-allowed disabled:no-underline">Delete</button>
                                            <button onClick={() => openMoveModal(agent)} disabled={assignedCount === 0} className="text-green-400 hover:underline font-semibold disabled:text-content-secondary/50 disabled:cursor-not-allowed disabled:no-underline">Move Vehicles</button>
                                        </div>
                                    </td>
                                </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                     {filteredAgents.length === 0 && (
                        <div className="text-center py-10 text-content-secondary">
                            No agents found. Add an agent to get started.
                        </div>
                    )}
                </div>
            </div>

            {isMoveModalOpen && agentToMove && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm" onClick={() => setIsMoveModalOpen(false)}>
                    <div className="bg-primary border border-primary rounded-lg shadow-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-bold text-primary mb-2">Move Vehicles</h3>
                        <p className="text-sm text-secondary mb-4">Re-assign all vehicles from <span className="font-bold">{agentToMove.name}</span> to another agent.</p>
                        <div className="space-y-2">
                            <label htmlFor="agent-select" className="text-sm text-secondary">Assign to:</label>
                            <select 
                                id="agent-select" 
                                value={targetAgentId} 
                                onChange={e => setTargetAgentId(e.target.value)}
                                className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50"
                            >
                                <option value="" disabled>Select new agent...</option>
                                {clearingAgents.filter(a => a.id !== agentToMove.id).map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                            </select>
                            <div className="text-center">
                                <button 
                                    type="button" 
                                    onClick={() => { setIsMoveModalOpen(false); setView('add_clearing_agent'); }}
                                    className="text-accent text-xs font-semibold hover:underline mt-2"
                                >
                                    + Create New Agent
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-6">
                            <button onClick={() => setIsMoveModalOpen(false)} className="py-2 px-4 bg-tertiary text-primary rounded-btn hover:bg-tertiary/70">Cancel</button>
                            <button onClick={handleMoveVehicles} disabled={!targetAgentId} className="btn-primary py-2 px-6">Confirm Move</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
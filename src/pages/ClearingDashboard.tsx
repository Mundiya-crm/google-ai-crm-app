import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { ICONS } from '../constants/icons';
import { Vehicle } from '../constants/vehicleData';

interface ClearingDashboardProps {
    setView: (view: string, queryParams?: Record<string, any>) => void;
}

export const ClearingDashboard: React.FC<ClearingDashboardProps> = ({ setView }) => {
    const { clearingAgents, vehicles } = useData();

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

    return (
        <div className="bg-content-secondary p-4 rounded-lg border border-content-primary shadow-lg h-full flex flex-col">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-content-primary">Clearing Dashboard</h2>
                <div className="flex items-center gap-2">
                     <a onClick={() => setView('clearing_status')} className="text-sm text-accent hover:underline cursor-pointer">View Full Status Board</a>
                    <button onClick={() => setView('add_clearing_agent')} className="btn-primary text-sm">+ Add New Agent</button>
                </div>
            </div>
            <p className="text-sm text-content-secondary mb-4">
                Select a clearing agent below to view all vehicles assigned to them.
            </p>

            <div className="flex-grow overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {clearingAgents.map(agent => {
                        const assignedCount = vehiclesByAgent.get(agent.id)?.length || 0;
                        return (
                            <button
                                key={agent.id}
                                onClick={() => setView('clearing_status', { agentId: agent.id })}
                                className="p-4 bg-content-tertiary rounded-lg border border-content-primary/50 text-left transition-all duration-200 hover:border-accent hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1"
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-content-primary text-base mb-1">{agent.name}</h3>
                                    <div className={`text-2xl font-black text-red-500 ${assignedCount > 0 ? '' : 'opacity-50'}`}>{assignedCount}</div>
                                </div>
                                <p className="text-xs text-content-secondary font-mono mb-2">
                                    <span className="font-semibold text-red-400">{agent.contactPerson}</span>
                                    {' - '}
                                    <span className="font-semibold text-green-400">{agent.phone}</span>
                                </p>
                                <div className="text-xs text-accent-text font-semibold">View Assigned Vehicles &rarr;</div>
                            </button>
                        )
                    })}
                </div>
                {clearingAgents.length === 0 && (
                     <div className="text-center py-16 text-content-secondary">
                        <p className="font-semibold">No clearing agents found.</p>
                        <button onClick={() => setView('add_clearing_agent')} className="mt-2 btn-primary">Add your first agent</button>
                    </div>
                )}
            </div>
        </div>
    );
};
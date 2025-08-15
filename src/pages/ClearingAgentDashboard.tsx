import React, { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Vehicle } from '../constants/vehicleData';
import { ICONS } from '../constants/icons';

export const ClearingAgentDashboard: React.FC = () => {
    const { user } = useAuth();
    const { vehicles } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const assignedVehicles = useMemo(() => {
        if (!user || !user.clearingAgentId) return [];
        
        const agentVehicles = vehicles.filter(v => v.clearingAgentId === user.clearingAgentId);
        
        if (!searchTerm) return agentVehicles;
        
        const lowercasedTerm = searchTerm.toLowerCase();
        return agentVehicles.filter(v => 
            v.make.toLowerCase().includes(lowercasedTerm) ||
            v.model.toLowerCase().includes(lowercasedTerm) ||
            v.chassisNumber.toLowerCase().includes(lowercasedTerm) ||
            v.stockNumber.toLowerCase().includes(lowercasedTerm)
        );
    }, [user, vehicles, searchTerm]);

    return (
        <div className="bg-secondary p-4 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-primary">Assigned Vehicles ({assignedVehicles.length})</h2>
                <input
                    type="text"
                    placeholder="Search by make, model, chassis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 text-sm px-3 py-2 border border-secondary rounded-btn bg-tertiary/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>
            <p className="text-sm text-secondary mb-4">
                Below is a list of all vehicles currently assigned to you for clearing. You can view vehicle details and download any associated documents.
            </p>

            <div className="overflow-auto flex-grow">
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-header z-10">
                        <tr>
                            {['Stock #', 'Vehicle Details', 'Chassis #', 'Location', 'Documents'].map(header => (
                                <th key={header} className="text-left font-semibold text-secondary p-2 border-b border-primary text-xs whitespace-nowrap">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/50">
                        {assignedVehicles.map(vehicle => (
                            <tr key={vehicle.id} className="hover:bg-tertiary/30">
                                <td className="p-2 font-mono text-xs">{vehicle.stockNumber}</td>
                                <td className="p-2 font-bold text-xs">{vehicle.make} {vehicle.model} ({vehicle.year})</td>
                                <td className="p-2 font-mono text-xs">{vehicle.chassisNumber}</td>
                                <td className="p-2 text-xs">{vehicle.location}</td>
                                <td className="p-2">
                                    {vehicle.clearingDocuments && vehicle.clearingDocuments.length > 0 ? (
                                        <div className="flex flex-col gap-1">
                                            {vehicle.clearingDocuments.map((doc, index) => (
                                                <a 
                                                    key={index}
                                                    href={doc.url} 
                                                    download={doc.name}
                                                    className="text-accent text-xs hover:underline flex items-center gap-1"
                                                >
                                                   <div className="w-3 h-3">{ICONS.upload}</div>
                                                   {doc.name}
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-xs text-secondary italic">No documents</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                         {assignedVehicles.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-secondary">
                                    You have no vehicles assigned to you at the moment.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
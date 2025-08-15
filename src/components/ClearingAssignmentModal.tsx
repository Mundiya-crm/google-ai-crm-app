import React, { useState } from 'react';
import { Vehicle, ClearingDocument } from '../constants/vehicleData';
import { useData } from '../context/DataContext';
import { DocumentUploadManager } from './DocumentUploadManager';

interface ClearingAssignmentModalProps {
    vehicle: Vehicle;
    onClose: () => void;
    onSave: (vehicleId: number, agentId: string | undefined, documents: ClearingDocument[]) => void;
}

export const ClearingAssignmentModal: React.FC<ClearingAssignmentModalProps> = ({ vehicle, onClose, onSave }) => {
    const { clearingAgents } = useData();
    const [agentId, setAgentId] = useState(vehicle.clearingAgentId || '');
    const [documents, setDocuments] = useState(vehicle.clearingDocuments || []);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        onSave(vehicle.id, agentId || undefined, documents);
        // The parent component will handle closing the modal
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-primary border border-primary rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-primary mb-2">Manage Clearing for Vehicle</h3>
                
                {/* Vehicle Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3 mb-4 bg-tertiary/50 rounded-md border border-primary/20">
                    <div><span className="text-xs text-secondary">Make:</span><p className="font-semibold">{vehicle.make}</p></div>
                    <div><span className="text-xs text-secondary">Model:</span><p className="font-semibold">{vehicle.model}</p></div>
                    <div><span className="text-xs text-secondary">Stock #:</span><p className="font-mono text-sm">{vehicle.stockNumber}</p></div>
                    <div><span className="text-xs text-secondary">Chassis #:</span><p className="font-mono text-sm">{vehicle.chassisNumber}</p></div>
                </div>

                <div className="space-y-4 flex-grow overflow-y-auto pr-2">
                    {/* Agent Assignment */}
                    <div>
                        <label htmlFor="clearingAgentId" className="block text-sm font-semibold text-secondary mb-1">Assign Clearing Agent</label>
                        <select 
                            id="clearingAgentId"
                            name="clearingAgentId" 
                            value={agentId} 
                            onChange={e => setAgentId(e.target.value)}
                            className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                            <option value="">Not Assigned</option>
                            {clearingAgents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                    </div>

                    {/* Document Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-secondary mb-1">Clearing Documents</label>
                        <DocumentUploadManager 
                            documents={documents} 
                            onDocumentsChange={setDocuments} 
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-primary/50">
                    <button type="button" onClick={onClose} className="py-2 px-4 bg-tertiary text-primary rounded-btn hover:bg-tertiary/70">Cancel</button>
                    <button type="button" onClick={handleSave} disabled={isLoading} className="btn-primary py-2 px-6">
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};
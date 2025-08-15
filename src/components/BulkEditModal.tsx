
import React, { useState } from 'react';
import { VehicleLocation, VehicleStatus } from '../constants/vehicleData';
import { vehicleLocations, vehicleColors } from '../constants/vehicleOptions';

interface BulkEditModalProps {
    onClose: () => void;
    onSave: (field: string, value: any) => void;
    vehicleCount: number;
}

const editableFields: {id: string, label: string, type: 'select' | 'text' | 'date', options?: any[]}[] = [
    { id: 'location', label: 'Location', type: 'select', options: vehicleLocations },
    { id: 'status', label: 'Status', type: 'select', options: ['Available', 'Reserved', 'On Way', 'Sold'] },
    { id: 'color', label: 'Color', type: 'select', options: vehicleColors },
    { id: 'portOfLoading', label: 'Port Of Loading', type: 'text' },
    { id: 'vessel', label: 'Vessel', type: 'text' },
    { id: 'eta', label: 'ETA', type: 'date' },
];

export const BulkEditModal: React.FC<BulkEditModalProps> = ({ onClose, onSave, vehicleCount }) => {
    const [field, setField] = useState('location');
    const [value, setValue] = useState<any>(vehicleLocations[0]);

    const selectedField = editableFields.find(f => f.id === field);

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newField = e.target.value;
        setField(newField);
        // Reset value when field changes
        const fieldDef = editableFields.find(f => f.id === newField);
        if (fieldDef?.type === 'select' && fieldDef.options) {
            setValue(fieldDef.options[0]);
        } else {
            setValue('');
        }
    };

    const handleSave = () => {
        if (!field || value === undefined) {
            alert("Please select a field and provide a value.");
            return;
        }
        onSave(field, value);
    };

    const renderValueInput = () => {
        if (!selectedField) return null;

        switch (selectedField.type) {
            case 'select':
                return (
                    <select value={value} onChange={e => setValue(e.target.value)} className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50">
                        {selectedField.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                );
            case 'date':
                return <input type="date" value={value} onChange={e => setValue(e.target.value)} className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50" />;
            case 'text':
            default:
                return <input type="text" value={value} onChange={e => setValue(e.target.value)} className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50" />;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-secondary border border-primary rounded-lg shadow-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-primary mb-4">Bulk Edit {vehicleCount} Vehicles</h3>
                <div className="space-y-4">
                    <div className='grid grid-cols-3 gap-2 items-end'>
                        <div className="col-span-1">
                            <label className="text-xs text-secondary">Field to Update:</label>
                            <select value={field} onChange={handleFieldChange} className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50">
                                {editableFields.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                            </select>
                        </div>
                        <div className="col-span-2">
                             <label className="text-xs text-secondary">New Value:</label>
                             {renderValueInput()}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-primary/50">
                    <button onClick={onClose} className="py-2 px-4 bg-tertiary text-primary rounded-btn hover:bg-tertiary/70">Cancel</button>
                    <button onClick={handleSave} className="btn-primary py-2 px-6">Apply Changes</button>
                </div>
            </div>
        </div>
    );
};

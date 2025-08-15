
import React, { useState, useEffect, useMemo } from 'react';
import { Vehicle } from '../constants/vehicleData';
import { useData } from '../context/DataContext';
import { vehicleMakes, vehicleModelsByMake } from '../constants/vehicleOptions';

export interface ExtractedField {
    value: string;
    confidence: number;
}

export interface ExtractedData {
    chassisNumber: ExtractedField;
    make: ExtractedField;
    model: ExtractedField;
    year: ExtractedField;
    mileage: ExtractedField;
    color: ExtractedField;
    grade?: ExtractedField;
    engineCC?: ExtractedField;
}

interface OcrReviewPanelProps {
    data: ExtractedData;
    onConfirm: (vehicleData: Partial<Vehicle>) => void;
    onCancel: () => void;
}

const ConfidenceBadge: React.FC<{ score: number }> = ({ score }) => {
    const scorePercent = Math.round(score * 100);
    let colorClasses = 'bg-gray-400 text-gray-900';
    if (score > 0.9) colorClasses = 'bg-green-400 text-green-900';
    else if (score > 0.75) colorClasses = 'bg-yellow-400 text-yellow-900';
    else if (score > 0.5) colorClasses = 'bg-orange-400 text-orange-900';
    else colorClasses = 'bg-red-400 text-red-900';

    return <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${colorClasses}`}>{scorePercent}%</span>;
};

const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="grid grid-cols-4 gap-x-4 items-center">{children}</div>;
const Label: React.FC<{ htmlFor?: string, children: React.ReactNode }> = ({ htmlFor, children }) => <label htmlFor={htmlFor} className="font-semibold text-content-secondary text-right">{children}</label>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent" />;
const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...props} className="col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent" />


export const OcrReviewPanel: React.FC<OcrReviewPanelProps> = ({ data, onConfirm, onCancel }) => {
    const { suppliers } = useData();
    const [formData, setFormData] = useState<Record<string, string>>({});

    useEffect(() => {
        const initialFormData: Record<string, string> = {};
        for (const key in data) {
            initialFormData[key] = (data as any)[key]?.value || '';
        }
        setFormData(initialFormData);
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Simple conversion, a more robust solution would handle types better
        const vehicleData: Partial<Vehicle> = {
            ...formData,
            year: formData.year || '0',
            mileage: formData.mileage ? `${parseInt(formData.mileage.replace(/[^0-9]/g, ''))}km` : '0km',
        };
        onConfirm(vehicleData);
    };
    
    const modelsForMake = useMemo(() => {
        if (formData.make && vehicleModelsByMake[formData.make]) {
            return vehicleModelsByMake[formData.make];
        }
        return [];
    }, [formData.make]);

    return (
        <div className="animate-fade-in space-y-4 h-full flex flex-col">
            <h3 className="text-lg font-semibold text-content-primary">Review Extracted Data</h3>
            <p className="text-sm text-content-secondary -mt-2">
                Our AI has extracted the following details. Please review and correct any inaccuracies before creating the vehicle record.
            </p>
            <div className="space-y-3 flex-grow overflow-y-auto pr-2">
                <FormRow>
                    <Label htmlFor="chassisNumber">Chassis #</Label>
                    <Input id="chassisNumber" name="chassisNumber" value={formData.chassisNumber || ''} onChange={handleInputChange} />
                    <ConfidenceBadge score={data.chassisNumber.confidence} />
                </FormRow>
                <FormRow>
                    <Label htmlFor="make">Make</Label>
                    <Select id="make" name="make" value={formData.make || ''} onChange={handleInputChange}>
                       <option value="">Select Make</option>
                       {vehicleMakes.map(m => <option key={m} value={m}>{m}</option>)}
                    </Select>
                    <ConfidenceBadge score={data.make.confidence} />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="model">Model</Label>
                    <Select id="model" name="model" value={formData.model || ''} onChange={handleInputChange} disabled={!formData.make}>
                        <option value="">Select Model</option>
                        {modelsForMake.map(m => <option key={m} value={m}>{m}</option>)}
                    </Select>
                    <ConfidenceBadge score={data.model.confidence} />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" name="year" value={formData.year || ''} onChange={handleInputChange} type="number" />
                    <ConfidenceBadge score={data.year.confidence} />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input id="mileage" name="mileage" value={formData.mileage || ''} onChange={handleInputChange} />
                    <ConfidenceBadge score={data.mileage.confidence} />
                </FormRow>
                <FormRow>
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" name="color" value={formData.color || ''} onChange={handleInputChange} />
                    <ConfidenceBadge score={data.color.confidence} />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="supplierId">Supplier</Label>
                     <Select id="supplierId" name="supplierId" value={formData.supplierId || ''} onChange={handleInputChange} required>
                        <option value="">Select a supplier...</option>
                        {suppliers.filter(s => s.type === 'import').map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </Select>
                </FormRow>
            </div>

            <div className="flex justify-end items-center gap-3 pt-3 border-t border-content-primary mt-auto">
                <button onClick={onCancel} className="btn-secondary">Cancel</button>
                <button onClick={handleSubmit} className="btn-primary">Confirm and Create Vehicle</button>
            </div>
        </div>
    );
};


import React, { useState, useEffect, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Vehicle, defaultCurrencyValue, defaultKESCurrencyValue } from '../constants/vehicleData';
import { CurrencyInput } from '../utils/CurrencyInput';
import { vehicleMakes, vehicleModelsByMake, vehicleColors, transmissionTypes, fuelTypes, vehicleLocations, japaneseAuctionHouses } from '../constants/vehicleOptions';
import { ImageUploadManager } from '../components/ImageUploadManager';
import { DocumentUploadManager } from '../components/DocumentUploadManager';
import { useLogger } from '../hooks/useLogger';

const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 items-start">{children}</div>;
const Label: React.FC<{ htmlFor?: string, children: React.ReactNode }> = ({ htmlFor, children }) => <label htmlFor={htmlFor} className="font-semibold text-content-secondary md:text-right pt-1.5">{children}</label>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent" />;
const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ children, ...props }) => <select {...props} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent">{children}</select>;
const SubSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => <div className="p-4 bg-content-tertiary/20 rounded-lg border border-content-primary/20"><h3 className="text-base font-bold text-content-primary mb-3 pb-2 border-b border-content-primary/30">{title}</h3><div className='space-y-4'>{children}</div></div>;

interface EditVehicleFormProps {
    setView: (view: string, query?: any) => void;
    vehicleId: number;
}

export const EditVehicleForm: React.FC<EditVehicleFormProps> = ({ setView, vehicleId }) => {
    const { vehicles, setVehicles, suppliers, clearingAgents } = useData();
    const { logActivity } = useLogger();
    const [formData, setFormData] = useState<Vehicle | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const vehicleToEdit = vehicles.find(v => v.id === vehicleId);
        if (vehicleToEdit) {
            setFormData(vehicleToEdit);
        } else {
            setMessage({ type: 'error', text: 'Vehicle not found!' });
        }
    }, [vehicleId, vehicles]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!formData) return;
        const { name, value } = e.target;
        
        if (name === 'supplierId') {
            const supplier = suppliers.find(s => s.id === value);
            const firstSalesperson = supplier?.salespersons[0];
            setFormData({ 
                ...formData, 
                [name]: value,
                auction: supplier?.name || '',
                salespersonId: firstSalesperson?.id || '',
                salespersonSubPrefix: firstSalesperson?.subPrefix || '',
            });
        } else if (name === 'salespersonId') {
            const supplier = suppliers.find(s => s.id === formData.supplierId);
            const salesperson = supplier?.salespersons.find(sp => sp.id === value);
            setFormData({ 
                ...formData,
                salespersonId: value,
                salespersonSubPrefix: salesperson?.subPrefix || '',
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCurrencyChange = (name: keyof Vehicle, value: any) => {
        if(formData) setFormData({ ...formData, [name]: value });
    };

    const modelsForMake = useMemo(() => {
        if (formData?.make && vehicleModelsByMake[formData.make]) {
            return vehicleModelsByMake[formData.make];
        }
        return [];
    }, [formData?.make]);
    
    const filteredSuppliers = useMemo(() => suppliers.filter(s => s.type === formData?.purchaseType), [formData?.purchaseType, suppliers]);
    const salespersonsForSupplier = useMemo(() => {
        if (!formData?.supplierId) return [];
        const selected = suppliers.find(s => s.id === formData.supplierId);
        return selected?.salespersons || [];
    }, [formData?.supplierId, suppliers]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;
        setIsLoading(true);
        setMessage(null);
        
        try {
            setVehicles(prev => prev.map(v => v.id === formData.id ? formData : v));
            logActivity('VEHICLE_UPDATED', `updated details for ${formData.stockNumber} (${formData.make} ${formData.model})`, 'vehicle', formData.id);
            setMessage({ type: 'success', text: `Vehicle ${formData.stockNumber} updated successfully!` });
            setTimeout(() => setView('vehicles'), 1500);
        } catch (error: any) {
            setMessage({ type: 'error', text: `Failed to update: ${error.message}` });
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!formData) {
        return <div className="text-center p-8">{message ? message.text : "Loading vehicle data..."}</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="bg-content-secondary p-4 rounded-lg border border-content-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-content-primary">Edit Vehicle: {formData.stockNumber}</h2>
                <button type="button" onClick={() => setView('vehicles')} className="btn-secondary text-xs px-3 py-1">Back to List</button>
            </div>
            
            <div className='flex-grow overflow-y-auto pt-2 pb-6 pr-2 space-y-4'>
                 <SubSection title="Core Details">
                    <FormRow><Label htmlFor="chassisNumber">Chassis #</Label><Input id="chassisNumber" name="chassisNumber" value={formData.chassisNumber} onChange={handleInputChange} required /></FormRow>
                    <FormRow><Label htmlFor="make">Make</Label>
                        <Select name="make" value={formData.make} onChange={handleInputChange}>
                            <option value="">Select Make</option>
                            {vehicleMakes.map(m => <option key={m} value={m}>{m}</option>)}
                        </Select>
                    </FormRow>
                    <FormRow><Label htmlFor="model">Model</Label>
                         <Select name="model" value={formData.model} onChange={handleInputChange} disabled={!formData.make}>
                            <option value="">Select Model</option>
                            {modelsForMake.map(m => <option key={m} value={m}>{m}</option>)}
                        </Select>
                    </FormRow>
                    <FormRow><Label htmlFor="year">Year</Label><Input id="year" name="year" value={formData.year} onChange={handleInputChange} /></FormRow>
                    <FormRow><Label htmlFor="color">Color</Label><Select name="color" value={formData.color} onChange={handleInputChange}>{vehicleColors.map(c => <option key={c} value={c}>{c}</option>)}</Select></FormRow>
                    <FormRow><Label htmlFor="mileage">Mileage</Label><Input id="mileage" name="mileage" value={formData.mileage} onChange={handleInputChange} /></FormRow>
                </SubSection>

                <SubSection title="Purchase & Costing">
                    <FormRow><Label>Purchase Type</Label><Input value={formData.purchaseType.toUpperCase()} readOnly disabled className="md:col-span-2" /></FormRow>
                    <FormRow><Label htmlFor="supplierId">Supplier</Label>
                        <Select name="supplierId" value={formData.supplierId} onChange={handleInputChange} required>
                            <option value="">Select a supplier...</option>
                            {filteredSuppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </Select>
                    </FormRow>
                    <FormRow><Label htmlFor="salespersonId">Salesperson</Label>
                        <Select name="salespersonId" value={formData.salespersonId} onChange={handleInputChange} required disabled={!formData.supplierId}>
                            <option value="">Select a salesperson...</option>
                            {salespersonsForSupplier.map(sp => <option key={sp.id} value={sp.id}>{sp.name}</option>)}
                        </Select>
                    </FormRow>
                     {formData.purchaseType === 'import' && <FormRow><Label htmlFor="totalCnf">Total C&F</Label><CurrencyInput id="totalCnf" value={formData.totalCnf || defaultCurrencyValue} onChange={val => handleCurrencyChange('totalCnf', val)} /></FormRow>}
                     {formData.purchaseType === 'local' && <FormRow><Label htmlFor="purchasePrice">Purchase Price</Label><CurrencyInput id="purchasePrice" value={formData.purchasePrice || defaultKESCurrencyValue} onChange={val => handleCurrencyChange('purchasePrice', val)} forceCurrency="KES" /></FormRow>}
                    <FormRow><Label htmlFor="clearingCost">Clearing Cost</Label><CurrencyInput id="clearingCost" value={formData.clearingCost || defaultKESCurrencyValue} onChange={val => handleCurrencyChange('clearingCost', val)} /></FormRow>
                    <FormRow><Label htmlFor="repairCost">Repair Cost</Label><CurrencyInput id="repairCost" value={formData.repairCost || defaultKESCurrencyValue} onChange={val => handleCurrencyChange('repairCost', val)} /></FormRow>
                </SubSection>

                 <SubSection title="Status & Clearing">
                     <FormRow><Label htmlFor="status">Status</Label><Select name="status" value={formData.status} onChange={handleInputChange}><option>Available</option><option>Sold</option><option>Reserved</option><option>On Way</option></Select></FormRow>
                     <FormRow><Label htmlFor="location">Location</Label><Select name="location" value={formData.location} onChange={handleInputChange}>{vehicleLocations.map(l => <option key={l} value={l}>{l}</option>)}</Select></FormRow>
                     <FormRow><Label htmlFor="clearingAgentId">Clearing Agent</Label>
                        <Select name="clearingAgentId" value={formData.clearingAgentId} onChange={handleInputChange}>
                            <option value="">Not Assigned</option>
                            {clearingAgents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </Select>
                     </FormRow>
                     <FormRow><Label>Clearing Documents</Label>
                        <div className="md:col-span-2">
                            <DocumentUploadManager documents={formData.clearingDocuments || []} onDocumentsChange={docs => handleCurrencyChange('clearingDocuments', docs)} />
                        </div>
                     </FormRow>
                 </SubSection>

                 <SubSection title="Photos">
                    <ImageUploadManager imageUrls={formData.imageUrls} onImageUrlsChange={urls => handleCurrencyChange('imageUrls', urls)} />
                 </SubSection>
            </div>
            
            <div className="flex justify-end items-center gap-3 pt-3 border-t border-content-primary mt-auto">
                {message && <div className={`text-sm font-semibold ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message.text}</div>}
                <button type="submit" disabled={isLoading} className="btn-primary w-full md:w-auto text-sm py-2">
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
};


import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Supplier, Salesperson } from '../constants/suppliersData';
import { useLogger } from '../hooks/useLogger';

const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 items-start">{children}</div>;
const Label: React.FC<{ htmlFor?: string, children: React.ReactNode }> = ({ htmlFor, children }) => <label htmlFor={htmlFor} className="font-semibold text-content-secondary md:text-right pt-1.5">{children}</label>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent" />;
const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ children, ...props }) => <select {...props} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent">{children}</select>;
const SubSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => <div className="p-4 bg-content-tertiary/20 rounded-lg border border-content-primary/20"><h3 className="text-base font-bold text-content-primary mb-3 pb-2 border-b border-content-primary/30">{title}</h3><div className='space-y-4'>{children}</div></div>;

interface EditSupplierFormProps {
    setView: (view: string) => void;
    supplierId: string;
}

export const EditSupplierForm: React.FC<EditSupplierFormProps> = ({ setView, supplierId }) => {
    const { suppliers, setSuppliers } = useData();
    const { logActivity } = useLogger();
    const [formData, setFormData] = useState<Supplier | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const supplierToEdit = suppliers.find(s => s.id === supplierId);
        if (supplierToEdit) {
            setFormData(supplierToEdit);
        } else {
            setMessage({ type: 'error', text: 'Supplier not found.' });
        }
    }, [supplierId, suppliers]);
    
    const handleInputChange = (field: keyof Supplier, value: any) => {
        if (formData) {
            setFormData({ ...formData, [field]: value });
        }
    };

    const handleSalespersonChange = (index: number, field: keyof Salesperson, value: string) => {
        if (formData) {
            const newSalespersons = [...formData.salespersons];
            (newSalespersons[index] as any)[field] = value;
            setFormData({ ...formData, salespersons: newSalespersons });
        }
    };

    const addSalesperson = () => {
        if (formData) {
            const newSalesperson: Salesperson = {
                id: `${formData.id}_new_${Date.now()}`,
                name: '',
                subPrefix: ''
            };
            setFormData({ ...formData, salespersons: [...formData.salespersons, newSalesperson] });
        }
    };

    const removeSalesperson = (index: number) => {
        if (formData && formData.salespersons.length > 1) {
            setFormData({ ...formData, salespersons: formData.salespersons.filter((_, i) => i !== index) });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        setIsLoading(true);
        setMessage(null);
        
        if (!formData.name || !formData.prefix || formData.salespersons.some(sp => !sp.name || !sp.subPrefix)) {
            setMessage({ type: 'error', text: 'Please fill all required fields, including all salesperson names and prefixes.' });
            setIsLoading(false);
            return;
        }
        
        setSuppliers(prev => prev.map(s => s.id === formData.id ? formData : s));
        logActivity('PROVIDER_UPDATED', `updated supplier details for ${formData.name}`, 'provider', formData.id);
        setMessage({ type: 'success', text: `Supplier '${formData.name}' updated successfully.` });
        setTimeout(() => setView('vendors'), 1500);
    };
    
    if (!formData) return <div className="text-center p-8">{message ? message.text : 'Loading...'}</div>;

    return (
        <form onSubmit={handleSubmit} className="bg-content-secondary p-4 rounded-lg border border-content-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-content-primary">Edit Supplier: {formData.name}</h2>
                <button type="button" onClick={() => setView('vendors')} className="btn-secondary text-xs px-3 py-1">Back to List</button>
            </div>

             <div className='flex-grow overflow-y-auto pt-2 pb-6 pr-2 space-y-4'>
                <SubSection title="Supplier Details">
                    <FormRow><Label htmlFor="name">Supplier Name</Label><Input id="name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required /></FormRow>
                    <FormRow><Label htmlFor="prefix">Stock # Prefix</Label><Input id="prefix" value={formData.prefix} onChange={e => handleInputChange('prefix', e.target.value.toUpperCase())} maxLength={4} required /></FormRow>
                    <FormRow><Label htmlFor="type">Supplier Type</Label>
                        <Select id="type" value={formData.type} onChange={e => handleInputChange('type', e.target.value as any)}>
                            <option value="import">Import</option>
                            <option value="local">Local</option>
                        </Select>
                    </FormRow>
                </SubSection>

                <SubSection title="Salespersons / Agents">
                    {formData.salespersons.map((sp, index) => (
                        <div key={sp.id} className="p-3 bg-tertiary/50 rounded-md grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
                            <div className="md:col-span-2"><label className="text-xs text-content-secondary">Agent Name *</label><Input value={sp.name} onChange={e => handleSalespersonChange(index, 'name', e.target.value)} required /></div>
                            <div className="md:col-span-2"><label className="text-xs text-content-secondary">Sub-Prefix *</label><Input value={sp.subPrefix} onChange={e => handleSalespersonChange(index, 'subPrefix', e.target.value)} required /></div>
                            <div className="md:col-span-1 flex justify-end">
                                {formData.salespersons.length > 1 && <button type="button" onClick={() => removeSalesperson(index)} className="btn-secondary text-xs bg-red-600/50 hover:bg-red-500/50 text-white p-1.5">Remove</button>}
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addSalesperson} className="btn-secondary text-xs">+ Add another agent</button>
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

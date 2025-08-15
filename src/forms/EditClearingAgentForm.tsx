
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { ClearingAgent } from '../constants/clearingAgentsData';
import { CurrencyInput } from '../utils/CurrencyInput';
import { CurrencyValue, defaultKESCurrencyValue } from '../constants/vehicleData';
import { useLogger } from '../hooks/useLogger';

const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 items-center">{children}</div>;
const Label: React.FC<{ htmlFor: string, children: React.ReactNode }> = ({ htmlFor, children }) => <label htmlFor={htmlFor} className="font-semibold text-content-secondary md:text-right">{children}</label>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent" />;
const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => <textarea {...props} rows={2} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent" />;


interface EditClearingAgentFormProps {
    setView: (view: string) => void;
    agentId: string;
}

export const EditClearingAgentForm: React.FC<EditClearingAgentFormProps> = ({ setView, agentId }) => {
    const { clearingAgents, setClearingAgents } = useData();
    const { logActivity } = useLogger();
    const [formData, setFormData] = useState<ClearingAgent | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const agentToEdit = clearingAgents.find(s => s.id === agentId);
        if (agentToEdit) {
            setFormData(agentToEdit);
        } else {
            setMessage({ type: 'error', text: 'Clearing Agent not found.' });
        }
    }, [agentId, clearingAgents]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (formData) {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCurrencyChange = (value: CurrencyValue) => {
        if (formData) {
            setFormData({ ...formData, agencyFee: value });
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        setIsLoading(true);
        setMessage(null);
        
        if (!formData.name) {
            setMessage({ type: 'error', text: 'Clearing Company name is required.' });
            setIsLoading(false);
            return;
        }
        
        setClearingAgents(prev => prev.map(agent => agent.id === formData.id ? formData : agent));
        logActivity('PROVIDER_UPDATED', `updated clearing agent: ${formData.name}`, 'provider', formData.id);
        setMessage({ type: 'success', text: `Agent '${formData.name}' updated successfully.` });
        setTimeout(() => setView('clearing'), 1500);
    };
    
    if (!formData) return <div className="text-center p-8">{message ? message.text : 'Loading...'}</div>;

    return (
        <form onSubmit={handleSubmit} className="bg-content-secondary p-6 rounded-md border border-content-primary shadow-inner h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-content-primary pb-4">
                 <h2 className="text-2xl font-bold text-content-primary">Edit Clearing Agent: {formData.name}</h2>
                 <button type="button" onClick={() => setView('clearing')} className="text-sm font-semibold text-accent hover:underline">
                    &larr; Back to Agent List
                </button>
            </div>
            
            {message && (
                <div className={`p-3 rounded-md text-sm mb-4 ${message.type === 'success' ? 'bg-green-900/50 text-green-200 border border-green-700' : 'bg-red-900/50 text-red-200 border border-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="space-y-4 max-w-2xl mx-auto">
                <FormRow>
                    <Label htmlFor="name">Clearing Company</Label>
                    <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="kraPin">KRA Pin No:</Label>
                    <Input id="kraPin" name="kraPin" type="text" value={formData.kraPin || ''} onChange={handleInputChange} />
                </FormRow>
                <FormRow>
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input id="contactPerson" name="contactPerson" type="text" value={formData.contactPerson || ''} onChange={handleInputChange} />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone || ''} onChange={handleInputChange} />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input id="whatsapp" name="whatsapp" type="tel" value={formData.whatsapp || ''} onChange={handleInputChange} placeholder="Include country code, e.g., +254..." />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={formData.email || ''} onChange={handleInputChange} />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="address">Address</Label>
                    <TextArea id="address" name="address" value={formData.address || ''} onChange={handleInputChange} />
                </FormRow>
                <FormRow>
                    <Label htmlFor="agencyFee">Standard Agency Fee</Label>
                    <CurrencyInput id="agencyFee" value={formData.agencyFee || defaultKESCurrencyValue} onChange={handleCurrencyChange} />
                </FormRow>

                <div className="flex justify-end pt-6">
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="btn-primary text-base">
                        <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>
        </form>
    );
};


import React, { useState } from 'react';
import { ClearingAgent } from '../constants/clearingAgentsData';
import { useData } from '../context/DataContext';
import { Salesperson } from '../constants/suppliersData';
import { CurrencyInput } from '../utils/CurrencyInput';
import { CurrencyValue, defaultKESCurrencyValue } from '../constants/vehicleData';
import { useLogger } from '../hooks/useLogger';

const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 items-center">{children}</div>;
const Label: React.FC<{ htmlFor: string, children: React.ReactNode }> = ({ htmlFor, children }) => <label htmlFor={htmlFor} className="font-semibold text-content-secondary md:text-right">{children}</label>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent" />;
const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => <textarea {...props} rows={2} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent" />;

const CLEARING_AGENT_PAYABLES_ACCOUNT_ID = 14;

const initialFormData = {
    name: '',
    contactPerson: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    kraPin: '',
    agencyFee: defaultKESCurrencyValue,
};

export const AddClearingAgentForm: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const { clearingAgents, setClearingAgents, chartOfAccounts, setChartOfAccounts } = useData();
    const { logActivity } = useLogger();
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [duplicateAgent, setDuplicateAgent] = useState<ClearingAgent | null>(null);

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMessage(null);
        setDuplicateAgent(null);
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleCurrencyChange = (value: CurrencyValue) => {
        setFormData(prev => ({ ...prev, agencyFee: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        setDuplicateAgent(null);

        if (!formData.name) {
            setMessage({ type: 'error', text: 'Agent Name is required.' });
            setIsLoading(false);
            return;
        }

        const trimmedName = formData.name.trim().toLowerCase();
        const newAgentId = formData.name.toLowerCase().replace(/\s+/g, '');
        const existingAgent = clearingAgents.find(c => c.name.toLowerCase() === trimmedName);
        if (existingAgent) {
            setMessage({ type: 'error', text: `A clearing agent named "${formData.name.trim()}" already exists.` });
            setDuplicateAgent(existingAgent);
            setIsLoading(false);
            return;
        }
        
        const parentAccount = chartOfAccounts.find(a => a.id === CLEARING_AGENT_PAYABLES_ACCOUNT_ID);
        const baseCode = parentAccount ? parentAccount.code : '2012';
        const existingSubAccounts = chartOfAccounts.filter(a => a.parentId === CLEARING_AGENT_PAYABLES_ACCOUNT_ID).length;
        const newAccountCode = `${baseCode}-${String(existingSubAccounts + 1).padStart(2, '0')}`;

        const newAgent: ClearingAgent = {
            id: newAgentId,
            name: formData.name,
            apAccountCode: newAccountCode,
            contactPerson: formData.contactPerson,
            phone: formData.phone,
            whatsapp: formData.whatsapp,
            email: formData.email,
            address: formData.address,
            kraPin: formData.kraPin,
            agencyFee: formData.agencyFee,
            salespersons: [
                {
                    id: `${newAgentId}_${(formData.contactPerson || 'default').toLowerCase().replace(/\s+/g, '')}`,
                    name: formData.contactPerson || 'Default Contact',
                    subPrefix: (formData.contactPerson || formData.name).substring(0, 4),
                }
            ],
        };
        setClearingAgents(prev => [...prev, newAgent]);
        
        const newAccount = {
            id: chartOfAccounts.length > 0 ? Math.max(...chartOfAccounts.map(a => a.id)) + 1 : 1,
            code: newAccountCode,
            name: `A/P - ${formData.name}`,
            category: 'Liabilities' as 'Liabilities',
            parentId: CLEARING_AGENT_PAYABLES_ACCOUNT_ID,
        };
        setChartOfAccounts(prev => [...prev, newAccount].sort((a,b) => a.code.localeCompare(b.code)));
        
        logActivity('PROVIDER_CREATED', `created new clearing agent: ${formData.name}`, 'provider', newAgentId);

        setMessage({ type: 'success', text: `Clearing Agent '${formData.name}' and its A/P account have been created successfully!` });
        setFormData(initialFormData);
        setIsLoading(false);

        setTimeout(() => setView('clearing'), 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-content-secondary p-6 rounded-md border border-content-primary shadow-inner h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-content-primary pb-4">
                 <h2 className="text-2xl font-bold text-content-primary">Add New Clearing Agent</h2>
                 <button type="button" onClick={() => setView('clearing')} className="text-sm font-semibold text-accent hover:underline">
                    &larr; Back to Agent List
                </button>
            </div>
            
            {message && (
                <div className={`p-3 rounded-md text-sm mb-4 ${message.type === 'success' ? 'bg-green-900/50 text-green-200 border border-green-700' : 'bg-red-900/50 text-red-200 border border-red-700'}`}>
                    {message.text}
                </div>
            )}
            
            {duplicateAgent && (
                <div className="p-3 my-2 bg-red-900/30 border border-red-700 rounded-lg text-red-200">
                    <p className="font-bold text-sm mb-2">Existing Agent Found:</p>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                        <p><strong>Name:</strong> {duplicateAgent.name}</p>
                        <p><strong>Contact:</strong> {duplicateAgent.contactPerson || 'N/A'}</p>
                        <p><strong>Phone:</strong> {duplicateAgent.phone || 'N/A'}</p>
                        <p><strong>Email:</strong> {duplicateAgent.email || 'N/A'}</p>
                    </div>
                </div>
            )}

            <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-sm text-content-secondary mb-4 bg-content-tertiary/50 p-3 rounded-md border border-content-primary">
                    Enter the agent's information below. An associated 'Accounts Payable' sub-account will be automatically created.
                </p>
                <FormRow>
                    <Label htmlFor="name">Agent Name</Label>
                    <Input id="name" name="name" type="text" value={formData.name} onChange={handleDataChange} required />
                </FormRow>
                <FormRow>
                    <Label htmlFor="kraPin">KRA Pin No:</Label>
                    <Input id="kraPin" name="kraPin" type="text" value={formData.kraPin} onChange={handleDataChange} />
                </FormRow>
                <FormRow>
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input id="contactPerson" name="contactPerson" type="text" value={formData.contactPerson} onChange={handleDataChange} />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleDataChange} />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input id="whatsapp" name="whatsapp" type="tel" value={formData.whatsapp} onChange={handleDataChange} placeholder="Include country code, e.g., +254..." />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleDataChange} />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="address">Address</Label>
                    <TextArea id="address" name="address" value={formData.address} onChange={handleDataChange} />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="agencyFee">Standard Agency Fee</Label>
                    <CurrencyInput id="agencyFee" value={formData.agencyFee} onChange={handleCurrencyChange} />
                </FormRow>

                <div className="flex justify-end pt-6">
                    <button 
                        type="submit" 
                        disabled={isLoading || !!duplicateAgent}
                        className="btn-primary text-base">
                        <span>{isLoading ? 'Saving...' : 'Save Agent'}</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

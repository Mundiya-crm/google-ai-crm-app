
import React, { useState } from 'react';
import { Customer } from '../constants/customersData';
import { useData } from '../context/DataContext';

const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 items-center">{children}</div>;
const Label: React.FC<{ htmlFor: string, children: React.ReactNode }> = ({ htmlFor, children }) => <label htmlFor={htmlFor} className="font-semibold text-content-secondary md:text-right">{children}</label>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent" />;
const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => <textarea {...props} rows={2} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent" />;

const initialFormData = {
    name: '',
    phone: '',
    idNumber: '',
    address: ''
};

export const AddCustomerForm: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const { customers, setCustomers } = useData();
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        if (!formData.name || !formData.phone) {
            setMessage({ type: 'error', text: 'Customer Name and Phone are required.' });
            setIsLoading(false);
            return;
        }

        const newCustomer: Customer = {
            id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
            name: formData.name,
            phone: formData.phone,
            idNumber: formData.idNumber,
            address: formData.address,
        };

        setCustomers(prev => [...prev, newCustomer]);
        
        setMessage({ type: 'success', text: `Customer '${formData.name}' has been created successfully!` });
        setFormData(initialFormData);
        setIsLoading(false);

        setTimeout(() => setView('customers'), 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-content-secondary p-6 rounded-md border border-content-primary shadow-inner h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-content-primary pb-4">
                 <h2 className="text-2xl font-bold text-content-primary">Add New Customer</h2>
                 <button type="button" onClick={() => setView('customers')} className="text-sm font-semibold text-accent hover:underline">
                    &larr; Back to Customer List
                </button>
            </div>
            
            {message && (
                <div className={`p-3 rounded-md text-sm mb-4 ${message.type === 'success' ? 'bg-green-900/50 text-green-200 border border-green-700' : 'bg-red-900/50 text-red-200 border border-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-sm text-content-secondary mb-4 bg-content-tertiary/50 p-3 rounded-md border border-content-primary">
                    Enter the customer's information below. This will add them to the central customer list.
                </p>
                <FormRow>
                    <Label htmlFor="name">Customer Name</Label>
                    <Input id="name" name="name" type="text" value={formData.name} onChange={handleDataChange} required />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleDataChange} required />
                </FormRow>
                <FormRow>
                    <Label htmlFor="idNumber">ID / Passport No.</Label>
                    <Input id="idNumber" name="idNumber" type="text" value={formData.idNumber} onChange={handleDataChange} />
                </FormRow>
                 <FormRow>
                    <Label htmlFor="address">Address</Label>
                    <TextArea id="address" name="address" value={formData.address} onChange={handleDataChange} />
                </FormRow>

                <div className="flex justify-end pt-6">
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="btn-primary text-base">
                        <span>{isLoading ? 'Saving...' : 'Save Customer'}</span>
                    </button>
                </div>
            </div>
        </form>
    );
};
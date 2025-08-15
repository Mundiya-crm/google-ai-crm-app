import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { SystemSettings } from '../constants/dataTypes';

const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 items-center">{children}</div>;
const Label: React.FC<{ htmlFor: string, children: React.ReactNode }> = ({ htmlFor, children }) => <label htmlFor={htmlFor} className="font-semibold text-secondary md:text-right">{children}</label>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent" />;
const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ children, ...props }) => <select {...props} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent">{children}</select>;

export const SystemSettingsView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const { systemSettings, setSystemSettings } = useData();
    const [formData, setFormData] = useState<SystemSettings>(systemSettings);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSave = () => {
        setSystemSettings(formData);
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">System Settings</h2>
                <button onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs">&larr; Back to Admin Panel</button>
            </div>
            
            <div className="flex-grow overflow-y-auto pr-2">
                <div className="max-w-2xl mx-auto space-y-4">
                    <FormRow>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
                    </FormRow>
                     <FormRow>
                        <Label htmlFor="kraPin">Company KRA PIN</Label>
                        <Input id="kraPin" name="kraPin" value={formData.kraPin} onChange={handleChange} />
                    </FormRow>
                     <FormRow>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                    </FormRow>
                     <FormRow>
                        <Label htmlFor="defaultCurrency">Default Currency</Label>
                        <Select id="defaultCurrency" name="defaultCurrency" value={formData.defaultCurrency} onChange={handleChange}>
                            <option value="KES">Kenyan Shilling (KES)</option>
                            <option value="USD">US Dollar (USD)</option>
                        </Select>
                    </FormRow>
                </div>
            </div>

            <div className="flex justify-end items-center gap-4 pt-4 mt-auto border-t border-primary/50">
                {message && <p className="text-sm text-green-400">{message}</p>}
                <button onClick={handleSave} className="btn-primary">Save Settings</button>
            </div>
        </div>
    );
};

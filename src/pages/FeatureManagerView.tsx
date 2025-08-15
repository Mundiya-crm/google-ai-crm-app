import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FeatureFlags } from '../constants/dataTypes';

const Toggle: React.FC<{ checked: boolean, onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="sr-only peer" />
        <div className="w-11 h-6 bg-tertiary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
    </label>
);

export const FeatureManagerView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const { featureFlags, setFeatureFlags } = useData();
    const [localFlags, setLocalFlags] = useState<FeatureFlags>(featureFlags);
    const [message, setMessage] = useState('');

    const handleFlagChange = (flag: keyof FeatureFlags, value: boolean) => {
        setLocalFlags(prev => ({ ...prev, [flag]: value }));
    };

    const handleSave = () => {
        setFeatureFlags(localFlags);
        setMessage('Feature flags saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">Feature Manager</h2>
                <button onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs">&larr; Back to Admin Panel</button>
            </div>
            <p className="text-sm text-secondary mb-4">
                Enable or disable optional, high-level features for all users.
            </p>
            
            <div className="flex-grow overflow-y-auto pr-2 max-w-lg mx-auto">
                <div className="space-y-3">
                    <div className="p-4 bg-primary rounded-md border border-secondary flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-primary">AI Sales Assistant</h4>
                            <p className="text-xs text-secondary">Enables the AI-powered sales chat and reply suggestion features.</p>
                        </div>
                        <Toggle checked={localFlags.aiSalesAssistant} onChange={c => handleFlagChange('aiSalesAssistant', c)} />
                    </div>
                     <div className="p-4 bg-primary rounded-md border border-secondary flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-primary">Predictive Alerts</h4>
                            <p className="text-xs text-secondary">Shows the AI-driven alerts widget on the main dashboard.</p>
                        </div>
                        <Toggle checked={localFlags.predictiveAlerts} onChange={c => handleFlagChange('predictiveAlerts', c)} />
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-center gap-4 pt-4 mt-auto border-t border-primary/50">
                {message && <p className="text-sm text-green-400">{message}</p>}
                <button onClick={handleSave} className="btn-primary">Save Feature Flags</button>
            </div>
        </div>
    );
};

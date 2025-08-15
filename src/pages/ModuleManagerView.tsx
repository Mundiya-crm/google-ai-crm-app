import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ModuleConfig } from '../constants/dataTypes';

export const ModuleManagerView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const { moduleConfig, setModuleConfig } = useData();
    const [localConfig, setLocalConfig] = useState<ModuleConfig[]>(moduleConfig);
    const [message, setMessage] = useState('');

    const handleLabelChange = (key: string, label: string) => {
        setLocalConfig(prev => prev.map(m => m.key === key ? { ...m, label } : m));
    };

    const handleVisibilityChange = (key: string, visible: boolean) => {
        setLocalConfig(prev => prev.map(m => m.key === key ? { ...m, visible } : m));
    };
    
    const handleSave = () => {
        setModuleConfig(localConfig);
        setMessage('Module configuration saved!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">Module Manager</h2>
                <button onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs">&larr; Back to Admin Panel</button>
            </div>
            <p className="text-sm text-secondary mb-4">
                Rename or hide main navigation modules from the sidebar. Changes will apply to all users upon saving.
            </p>
            
            <div className="flex-grow overflow-y-auto pr-2">
                <div className="space-y-2">
                    {localConfig.map(module => (
                        <div key={module.key} className="p-3 bg-primary rounded-md border border-secondary flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={module.visible}
                                        onChange={e => handleVisibilityChange(module.key, e.target.checked)}
                                        className="h-4 w-4 rounded bg-tertiary border-primary text-accent focus:ring-accent"
                                    />
                                    <span className="font-semibold text-primary">Show/Hide</span>
                                </label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={module.label}
                                    onChange={e => handleLabelChange(module.key, e.target.value)}
                                    className="text-sm p-1 border border-secondary rounded-btn bg-tertiary/50"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end items-center gap-4 pt-4 mt-auto border-t border-primary/50">
                {message && <p className="text-sm text-green-400">{message}</p>}
                <button onClick={handleSave} className="btn-primary">Save Module Configuration</button>
            </div>
        </div>
    );
};

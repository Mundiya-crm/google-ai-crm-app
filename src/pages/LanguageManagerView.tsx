import React from 'react';

export const LanguageManagerView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">Multi-language Manager</h2>
                <button onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs">&larr; Back to Admin Panel</button>
            </div>
            <p className="text-sm text-secondary mb-4">
                This interface will allow for managing translations for different languages in the future.
            </p>
            <div className="flex-grow overflow-auto border border-secondary rounded-md bg-primary p-2">
                 <p className="text-secondary text-center p-8">Translation management UI coming soon.</p>
            </div>
        </div>
    );
};

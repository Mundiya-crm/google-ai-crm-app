import React from 'react';

const SyncCard: React.FC<{ title: string; description: string; lastSync: string; }> = ({ title, description, lastSync }) => (
    <div className="bg-primary border border-secondary p-4 rounded-lg flex items-center justify-between">
        <div>
            <h3 className="text-base font-semibold text-primary">{title}</h3>
            <p className="text-xs text-secondary mt-1">{description}</p>
            <p className="text-xs text-secondary mt-2">Last Sync: <span className="font-mono">{lastSync}</span></p>
        </div>
        <div className="flex items-center gap-2">
            <button className="btn-secondary text-sm">Sync Now</button>
            <button className="btn-secondary text-sm">Settings</button>
        </div>
    </div>
);

export const SyncCenterView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">Data Sync Center</h2>
                <button onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs">&larr; Back to Admin Panel</button>
            </div>
             <p className="text-sm text-secondary mb-4">
                Manage how data is synchronized between the CRM and your other business systems.
            </p>

            <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                <SyncCard 
                    title="Website Sync"
                    description="Keep your public website's vehicle inventory up-to-date automatically."
                    lastSync="2025-08-14 10:30 AM"
                />
                <SyncCard 
                    title="Accounting Sync"
                    description="Export sales and expense data to QuickBooks or Xero."
                    lastSync="2025-08-13 05:00 PM"
                />
            </div>
        </div>
    );
};

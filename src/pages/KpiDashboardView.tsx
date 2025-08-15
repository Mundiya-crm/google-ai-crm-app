import React from 'react';

const ChartPlaceholder: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-primary border border-secondary p-4 rounded-lg shadow-md h-64 flex flex-col">
        <h3 className="text-base font-semibold text-primary mb-2">{title}</h3>
        <div className="flex-grow flex items-center justify-center text-secondary text-sm">
            {children || <p>Chart data will be displayed here.</p>}
        </div>
    </div>
);

export const KpiDashboardView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">Business Intelligence Dashboard</h2>
                <button onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs">&larr; Back to Admin Panel</button>
            </div>
             <p className="text-sm text-secondary mb-4">
                This dashboard provides a high-level overview of key performance indicators (KPIs) for your business.
            </p>

            <div className="flex-grow overflow-y-auto pr-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <ChartPlaceholder title="Sales Performance (Last 6 Months)" />
                    <ChartPlaceholder title="Profit Trends (Last 6 Months)" />
                    <ChartPlaceholder title="Inventory Aging by Make" />
                    <ChartPlaceholder title="Sales by Employee" />
                </div>
            </div>
        </div>
    );
};

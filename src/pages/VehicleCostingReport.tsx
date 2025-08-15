import React from 'react';

interface VehicleCostingReportProps {
    setView: (view: string) => void;
    filter: 'all' | 'local' | 'import';
}

export const VehicleCostingReport: React.FC<VehicleCostingReportProps> = ({ setView, filter }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">Vehicle Costing Report ({filter})</h2>
            <p>This is the vehicle costing report. Content coming soon.</p>
            <button onClick={() => setView('dashboard')}>Back to Dashboard</button>
        </div>
    );
};

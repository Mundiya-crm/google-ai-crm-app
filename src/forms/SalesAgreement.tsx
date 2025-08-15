import React from 'react';

interface SalesAgreementProps {
    setView: (view: string, query?: any) => void;
    vehicleId: number;
}

export const SalesAgreement: React.FC<SalesAgreementProps> = ({ setView, vehicleId }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">Sales Agreement for Vehicle #{vehicleId}</h2>
            <p>This is the sales agreement form. Content coming soon.</p>
            <button onClick={() => setView('deal_ledger', { id: vehicleId })}>Back to Deal Ledger</button>
        </div>
    );
};
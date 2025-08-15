import React from 'react';

interface DealLedgerProps {
    setView: (view: string) => void;
    vehicleId: number;
}

export const DealLedger: React.FC<DealLedgerProps> = ({ setView, vehicleId }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">Deal Ledger for Vehicle #{vehicleId}</h2>
            <p>This is the deal ledger. Content coming soon.</p>
            <button onClick={() => setView('sell')}>Back to Sales</button>
        </div>
    );
};

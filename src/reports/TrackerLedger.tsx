import React from 'react';

interface TrackerLedgerProps {
    setView: (view: string) => void;
    accountCode: string;
    companyName: string;
}

export const TrackerLedger: React.FC<TrackerLedgerProps> = ({ setView, accountCode, companyName }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">Tracker Ledger for {companyName}</h2>
            <p>Account Code: {accountCode}</p>
            <button onClick={() => setView('tracker')}>Back to Tracking Companies</button>
        </div>
    );
};

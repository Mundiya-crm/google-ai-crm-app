import React from 'react';

interface BrokerLedgerProps {
    setView: (view: string) => void;
    accountCode: string;
    companyName: string;
}

export const BrokerLedger: React.FC<BrokerLedgerProps> = ({ setView, accountCode, companyName }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">Broker Ledger for {companyName}</h2>
            <p>Account Code: {accountCode}</p>
            <button onClick={() => setView('brokers')}>Back to Broker List</button>
        </div>
    );
};

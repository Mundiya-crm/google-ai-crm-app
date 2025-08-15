import React from 'react';

interface InsuranceLedgerProps {
    setView: (view: string) => void;
    accountCode: string;
    companyName: string;
}

export const InsuranceLedger: React.FC<InsuranceLedgerProps> = ({ setView, accountCode, companyName }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">Insurance Ledger for {companyName}</h2>
            <p>Account Code: {accountCode}</p>
            <button onClick={() => setView('insurance')}>Back to Insurance Companies</button>
        </div>
    );
};

import React from 'react';

interface ChartOfAccountsProps {
    setView: (view: string) => void;
}

export const ChartOfAccounts: React.FC<ChartOfAccountsProps> = ({ setView }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">Chart of Accounts</h2>
            <p>This is the chart of accounts view. Content coming soon.</p>
            <button onClick={() => setView('accounting')}>Back to Accounting Hub</button>
        </div>
    );
};

import React from 'react';

interface GeneralJournalProps {
    setView: (view: string) => void;
}

export const GeneralJournal: React.FC<GeneralJournalProps> = ({ setView }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">General Journal</h2>
            <p>This is the general journal view. Content coming soon.</p>
            <button onClick={() => setView('accounting')}>Back to Accounting Hub</button>
        </div>
    );
};

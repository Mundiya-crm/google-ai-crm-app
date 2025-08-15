import React from 'react';

interface SystemResetViewProps {
    setView: (view: string) => void;
}

export const SystemResetView: React.FC<SystemResetViewProps> = ({ setView }) => {
    return (
        <div>
            <h2 className="text-xl font-bold text-red-500">System Data Reset</h2>
            <p>This is the system reset view. Content coming soon.</p>
            <button onClick={() => setView('setup')}>Back to Setup</button>
        </div>
    );
};

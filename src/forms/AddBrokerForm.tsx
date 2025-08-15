import React from 'react';

interface AddBrokerFormProps {
    setView: (view: string) => void;
}

export const AddBrokerForm: React.FC<AddBrokerFormProps> = ({ setView }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">Add New Broker</h2>
            <p>This is the add new broker form. Content coming soon.</p>
            <button onClick={() => setView('brokers')}>Back to Broker List</button>
        </div>
    );
};


import React, { useState, useMemo } from 'react';
import { Broker } from '../constants/brokersData';
import { useData } from '../context/DataContext';

interface BrokerListViewProps {
    setView: (view: string, queryParams?: Record<string, any>) => void;
}

export const BrokerListView: React.FC<BrokerListViewProps> = ({ setView }) => {
    const { brokers } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBrokers = useMemo(() => {
        if (!searchTerm) return brokers;
        return brokers.filter(broker =>
            Object.values(broker).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, brokers]);

    return (
        <div className="bg-content-secondary p-6 rounded-md border border-content-primary shadow-inner h-full flex flex-col">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-content-primary pb-3">
                <h2 className="text-2xl font-bold text-content-primary">Broker Center</h2>
                <button 
                    onClick={() => setView('add_broker')}
                    className="btn-primary text-sm"
                >
                    + Add New Broker
                </button>
            </div>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, phone, ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 text-sm px-3 py-2 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            <div className="overflow-x-auto flex-grow">
                <table className="min-w-full bg-content-tertiary/30 rounded-md shadow-inner">
                    <thead className="bg-content-header text-content-secondary">
                        <tr>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Broker Name</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Phone</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">ID Number</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">KRA PIN</th>
                            <th className="text-center py-2 px-3 text-xs font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-content-primary">
                        {filteredBrokers.map((broker, index) => (
                            <tr key={broker.id} className="text-xs border-b border-content-primary hover:bg-content-tertiary/50">
                                <td className="py-2 px-3 font-semibold">{broker.name}</td>
                                <td className="py-2 px-3 font-mono">{broker.phone || 'N/A'}</td>
                                <td className="py-2 px-3 font-mono">{broker.idNumber || 'N/A'}</td>
                                <td className="py-2 px-3 font-mono">{broker.kraPin || 'N/A'}</td>
                                <td className="py-2 px-3">
                                    <div className="flex items-center justify-center gap-3">
                                        <button onClick={() => setView('broker_ledger', { accountCode: broker.apAccountCode, companyName: broker.name })} className="text-purple-400 hover:underline font-semibold text-xs">Ledger</button>
                                        <button onClick={() => alert('Editing coming soon!')} className="text-content-secondary hover:underline font-semibold text-xs">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredBrokers.length === 0 && (
                    <div className="text-center py-10 text-content-secondary">
                        No brokers found. Add a broker to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

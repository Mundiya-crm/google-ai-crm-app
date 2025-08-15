import React, { useState, useMemo } from 'react';
import { Customer } from '../constants/customersData';
import { useData } from '../context/DataContext';

interface CustomerListViewProps {
    setView: (view: string, queryParams?: Record<string, any>) => void;
}

export const CustomerListView: React.FC<CustomerListViewProps> = ({ setView }) => {
    const { customers } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = useMemo(() => {
        if (!searchTerm) return customers;
        return customers.filter(customer =>
            Object.values(customer).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, customers]);

    return (
        <div className="bg-content-secondary p-6 rounded-md border border-content-primary shadow-inner h-full flex flex-col">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-content-primary pb-3">
                <h2 className="text-2xl font-bold text-content-primary">Customer Center</h2>
                <button 
                    onClick={() => setView('add_customer')}
                    className="btn-primary text-sm"
                >
                    + Add New Customer
                </button>
            </div>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, phone, ID number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 text-sm px-3 py-2 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            <div className="overflow-x-auto flex-grow">
                <table className="min-w-full bg-content-tertiary/30 rounded-md shadow-inner">
                    <thead className="bg-content-header text-content-secondary">
                        <tr>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Customer Name</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Phone</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">ID / Passport No.</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Address</th>
                            <th className="text-center py-2 px-3 text-xs font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-content-primary">
                        {filteredCustomers.map((customer, index) => (
                            <tr key={customer.id} className="text-xs border-b border-content-primary hover:bg-content-tertiary/50">
                                <td className="py-2 px-3 font-semibold">{customer.name}</td>
                                <td className="py-2 px-3 font-mono">{customer.phone}</td>
                                <td className="py-2 px-3 font-mono">{customer.idNumber}</td>
                                <td className="py-2 px-3">{customer.address}</td>
                                <td className="py-2 px-3">
                                    <div className="flex items-center justify-center gap-3">
                                        <button onClick={() => alert('Viewing purchase history soon!')} className="text-accent hover:underline font-semibold">History</button>
                                        <button onClick={() => alert('Editing coming soon!')} className="text-content-secondary hover:underline font-semibold">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredCustomers.length === 0 && (
                    <div className="text-center py-10 text-content-secondary">
                        No customers found. Finalize a sale to add a new customer.
                    </div>
                )}
            </div>
        </div>
    );
};
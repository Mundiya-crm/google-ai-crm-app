
import React, { useState, useMemo } from 'react';
import { Supplier } from '../constants/suppliersData';
import { useData } from '../context/DataContext';

interface SupplierListViewProps {
    setView: (view: string, queryParams?: Record<string, any>) => void;
}

export const SupplierListView: React.FC<SupplierListViewProps> = ({ setView }) => {
    const { suppliers } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSuppliers = useMemo(() => {
        if (!searchTerm) return suppliers;
        const lowercasedTerm = searchTerm.toLowerCase();
        return suppliers.filter(s =>
            s.name.toLowerCase().includes(lowercasedTerm) ||
            s.prefix.toLowerCase().includes(lowercasedTerm) ||
            (s.aliases && s.aliases.some(a => a.toLowerCase().includes(lowercasedTerm)))
        );
    }, [searchTerm, suppliers]);

    return (
        <div className="bg-content-secondary p-6 rounded-md border border-content-primary shadow-inner h-full flex flex-col">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-content-primary pb-3">
                <h2 className="text-2xl font-bold text-content-primary">Supplier Management</h2>
                <button 
                    onClick={() => setView('add_supplier')}
                    className="btn-primary text-sm"
                >
                    + Add New Supplier
                </button>
            </div>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, prefix, alias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 text-sm px-3 py-2 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            <div className="overflow-x-auto flex-grow">
                <table className="min-w-full bg-content-tertiary/30 rounded-md shadow-inner">
                    <thead className="bg-content-header text-content-secondary">
                        <tr>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Name</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Type</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Prefix</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Salespersons</th>
                            <th className="text-center py-2 px-3 text-xs font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-content-primary">
                        {filteredSuppliers.map((supplier) => (
                            <tr key={supplier.id} className="text-xs border-b border-content-primary hover:bg-content-tertiary/50">
                                <td className="py-2 px-3 font-semibold">{supplier.name}</td>
                                <td className="py-2 px-3 capitalize">{supplier.type}</td>
                                <td className="py-2 px-3 font-mono">{supplier.prefix}</td>
                                <td className="py-2 px-3">
                                    {supplier.salespersons.map(sp => sp.name).join(', ')}
                                </td>
                                <td className="py-2 px-3">
                                    <div className="flex items-center justify-center gap-3">
                                        <button onClick={() => setView('edit_supplier', { id: supplier.id })} className="text-accent hover:underline font-semibold">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredSuppliers.length === 0 && (
                    <div className="text-center py-10 text-content-secondary">
                        No suppliers found. Add a supplier to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

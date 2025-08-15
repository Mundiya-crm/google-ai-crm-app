import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';

interface StockDashboardProps {
    setView: (view: string, query?: any) => void;
    filter?: 'all' | 'local' | 'import';
}

const SupplierCard: React.FC<{
    name: string;
    salesperson: string;
    vehicleCount: number;
    onClick: () => void;
}> = ({ name, salesperson, vehicleCount, onClick }) => (
    <button
        onClick={onClick}
        className="p-4 bg-tertiary rounded-lg border border-primary/50 text-left transition-all duration-200 hover:border-accent hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1"
    >
        <div className="flex justify-between items-start">
            <h3 className="font-bold text-primary text-base mb-1">{name}</h3>
            <div className={`text-2xl font-black ${vehicleCount > 0 ? 'text-red-500' : 'text-secondary opacity-70'}`}>{vehicleCount}</div>
        </div>
        <p className="text-xs text-secondary font-mono mb-2">
            <span className="font-semibold text-red-400">{salesperson}</span>
        </p>
        <div className="text-xs text-accent font-semibold">View Inventory &rarr;</div>
    </button>
);

export const StockDashboard: React.FC<StockDashboardProps> = ({ setView, filter }) => {
    const { suppliers, vehicles } = useData();

    const filteredSuppliers = useMemo(() => {
        if (!filter || filter === 'all') {
            return suppliers;
        }
        return suppliers.filter(s => s.type === filter);
    }, [suppliers, filter]);

    const vehicleCountBySupplier = useMemo(() => {
        const counts = new Map<string, number>();
        filteredSuppliers.forEach(s => counts.set(s.id, 0));
        vehicles.forEach(v => {
            if (v.supplierId && v.status === 'Available') { // Only count available stock
                const currentCount = counts.get(v.supplierId);
                if (typeof currentCount === 'number') {
                     counts.set(v.supplierId, currentCount + 1);
                }
            }
        });
        return counts;
    }, [filteredSuppliers, vehicles]);

    const title = filter ? `${filter.charAt(0).toUpperCase() + filter.slice(1)} Stock Suppliers` : 'Stock Dashboard';
    const allStockButtonText = `View All ${filter ? filter : ''} Stock Combined`;

    return (
        <div className="bg-secondary p-4 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-primary">{title}</h2>
                <div className="flex items-center gap-2">
                    <button onClick={() => setView('vehicles', { filter: filter || 'all' })} className="btn-secondary text-sm">{allStockButtonText}</button>
                </div>
            </div>
            <p className="text-sm text-secondary mb-4">
                Select a supplier to view their available inventory, or view all stock combined.
            </p>
            <div className="flex-grow overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredSuppliers.map(supplier => (
                        <SupplierCard 
                            key={supplier.id}
                            name={supplier.name}
                            salesperson={supplier.salespersons[0]?.name || 'N/A'}
                            vehicleCount={vehicleCountBySupplier.get(supplier.id) || 0}
                            onClick={() => setView('vehicles', { supplierId: supplier.id, filter: filter || 'all' })}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
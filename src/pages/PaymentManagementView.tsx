import React, { useState, useMemo } from 'react';
import { Vehicle } from '../constants/vehicleData';
import { useData } from '../context/DataContext';

interface PaymentManagementViewProps {
    setView: (view: string, queryParams?: Record<string, any>) => void;
}

export const PaymentManagementView: React.FC<PaymentManagementViewProps> = ({ setView }) => {
    const { vehicles } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const soldVehicles = useMemo(() => {
        const vehiclesWithSales = vehicles.filter(v => v.status === 'Sold' && v.saleDetails);
        if (!searchTerm) return vehiclesWithSales;

        const lowercasedTerm = searchTerm.toLowerCase();
        return vehiclesWithSales.filter(v => 
            v.saleDetails?.customerName.toLowerCase().includes(lowercasedTerm) ||
            v.make.toLowerCase().includes(lowercasedTerm) ||
            v.model.toLowerCase().includes(lowercasedTerm) ||
            v.chassisNumber.toLowerCase().includes(lowercasedTerm) ||
            v.stockNumber.toLowerCase().includes(lowercasedTerm)
        );
    }, [searchTerm, vehicles]);

    const calculatePaymentSummary = (vehicle: Vehicle) => {
        if (!vehicle.saleDetails) {
            return { salePrice: 0, totalPaid: 0, balance: 0 };
        }
        const { salePrice, payments } = vehicle.saleDetails;
        const totalPaid = payments.reduce((sum, p) => sum + p.amount.kesAmount, 0);
        const balance = salePrice.kesAmount - totalPaid;
        return {
            salePrice: salePrice.kesAmount,
            totalPaid,
            balance
        };
    };

    return (
        <div className="bg-secondary p-4 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-primary">Payments Ledger</h2>
                <button onClick={() => setView('sell')} className="btn-primary text-xs">Create New Sale</button>
            </div>
            
             <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by customer, make, model, chassis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 text-sm px-3 py-2 border border-secondary rounded-btn bg-tertiary/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            <div className="overflow-auto flex-grow">
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-header z-10">
                        <tr>
                            {['Sale Date', 'Customer', 'Vehicle', 'Sale Price', 'Total Paid', 'Balance Due', 'Actions'].map(header => (
                                <th key={header} className="text-left font-semibold text-secondary p-2 border-b border-primary text-xs whitespace-nowrap">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary">
                        {soldVehicles.map(vehicle => {
                            const { salePrice, totalPaid, balance } = calculatePaymentSummary(vehicle);
                            return (
                                <tr key={vehicle.id} className="hover:bg-tertiary/30">
                                    <td className="p-2 font-mono text-xs">{vehicle.saleDetails?.saleDate}</td>
                                    <td className="p-2 font-semibold">{vehicle.saleDetails?.customerName}</td>
                                    <td className="p-2">{`${vehicle.make} ${vehicle.model} (${vehicle.stockNumber})`}</td>
                                    <td className="p-2 text-right font-mono">{salePrice.toLocaleString(undefined, {style: 'currency', currency: 'KES'})}</td>
                                    <td className="p-2 text-right font-mono text-green-400">{totalPaid.toLocaleString(undefined, {style: 'currency', currency: 'KES'})}</td>
                                    <td className="p-2 text-right font-mono text-red-400">{balance.toLocaleString(undefined, {style: 'currency', currency: 'KES'})}</td>
                                    <td className="p-2">
                                        <button 
                                            onClick={() => setView('deal_ledger', { id: vehicle.id })}
                                            className="bg-accent/80 text-white text-xs font-bold px-3 py-1 rounded-btn hover:bg-accent"
                                        >
                                            Manage Payments
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                         {soldVehicles.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-10 text-secondary">No sold vehicles found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
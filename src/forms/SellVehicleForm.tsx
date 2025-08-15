
import React, { useState, useMemo, useEffect } from 'react';
import { Vehicle, InsuranceSaleDetails, TrackerSaleDetails, CurrencyValue, defaultKESCurrencyValue, Payment, Installment, SaleDetails } from '../constants/vehicleData';
import { Customer } from '../constants/customersData';
import { InsuranceCompany } from '../constants/insuranceCompaniesData';
import { TrackingCompany } from '../constants/trackerAgentsData';
import { Broker } from '../constants/brokersData';
import { CurrencyInput } from '../utils/CurrencyInput';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { JournalEntry } from '../constants/journalData';
import { calculateTotalCost } from '../utils/vehicleHelper';
import { useLogger } from '../hooks/useLogger';

const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">{children}</div>;
const Label: React.FC<{ htmlFor: string, children: React.ReactNode }> = ({ htmlFor, children }) => <label htmlFor={htmlFor} className="font-semibold text-content-secondary md:text-right pt-1.5">{children}</label>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-content-tertiary/20 disabled:cursor-not-allowed" />;
const SmallInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-content-tertiary/20 disabled:cursor-not-allowed" />;
const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ children, ...props }) => <select {...props} className="md:col-span-2 w-full text-sm px-2 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent">{children}</select>;
const ReadOnlyField = ({ label, value }: { label: string, value: string | number }) => (
    <div className='text-sm'><span className='font-semibold text-content-secondary'>{label}: </span><span className='font-mono text-content-primary'>{value}</span></div>
);
const SubSection: React.FC<{ title: string; children: React.ReactNode; disabled?: boolean }> = ({ title, children, disabled }) => (
    <div className={`p-4 bg-content-tertiary/20 rounded-lg border border-content-primary/20 transition-opacity duration-300 ${disabled ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <h3 className="text-base font-bold text-content-primary text-left mb-3 pb-2 border-b border-content-primary/30">{title}</h3>
        <div className='space-y-4'>{children}</div>
    </div>
);

const initialCustomerState: Omit<Customer, 'id'> = { name: '', phone: '', address: '', idNumber: '', kraPin: '' };
const initialSaleState = { 
    salePrice: defaultKESCurrencyValue, 
    downPayment: defaultKESCurrencyValue, 
    paymentMethod: 'Cash' as 'Cash' | '(HP) Higher Purchase',
    brokerFee: defaultKESCurrencyValue,
    brokerId: '',
    saleDate: new Date().toISOString().slice(0, 10),
};
const initialInsuranceState = { 
    isIncluded: false, 
    companyId: '', 
    insuranceType: 'Private' as 'Private' | 'PSV', 
    carValue: 0, 
    passengers: 0, 
    premium: defaultKESCurrencyValue, 
    salePrice: defaultKESCurrencyValue 
};
const initialTrackerState = { isIncluded: false, companyId: '', deviceNumber: '', premium: defaultKESCurrencyValue, salePrice: defaultKESCurrencyValue };

interface SellVehicleFormProps {
    setView: (view: string, query?: any) => void;
    chassis?: string;
}

export const SellVehicleForm: React.FC<SellVehicleFormProps> = ({ setView, chassis }) => {
    const { user } = useAuth();
    const { vehicles, setVehicles, customers, setCustomers, insuranceCompanies, trackingCompanies, brokers, setJournalEntries } = useData();
    const { logActivity } = useLogger();
    const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [customer, setCustomer] = useState(initialCustomerState);
    const [sale, setSale] = useState(initialSaleState);
    const [insurance, setInsurance] = useState(initialInsuranceState);
    const [tracker, setTracker] = useState(initialTrackerState);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

     useEffect(() => {
        if (chassis) {
            const vehicle = vehicles.find(v => v.chassisNumber === chassis);
            if (vehicle) {
                setSelectedVehicleId(vehicle.id.toString());
            }
        }
    }, [chassis, vehicles]);
    
    useEffect(() => {
        if (selectedCustomerId) {
            const cust = customers.find(c => c.id === parseInt(selectedCustomerId, 10));
            if (cust) setCustomer(cust);
        } else {
            setCustomer(initialCustomerState);
        }
    }, [selectedCustomerId, customers]);

    const availableVehicles = useMemo(() => vehicles.filter(v => v.status === 'Available'), [vehicles]);
    const selectedVehicle = useMemo(() => vehicles.find(v => v.id === parseInt(selectedVehicleId, 10)), [selectedVehicleId, vehicles]);

    const { totalInvoice, vehicleCost, totalProfit, insuranceProfit, trackerProfit } = useMemo(() => {
        const vehicleCost = selectedVehicle ? calculateTotalCost(selectedVehicle) : 0;
        let totalInvoice = sale.salePrice.kesAmount;
        if (insurance.isIncluded) totalInvoice += insurance.salePrice.kesAmount;
        if (tracker.isIncluded) totalInvoice += tracker.salePrice.kesAmount;
        
        const insuranceProfit = insurance.isIncluded ? insurance.salePrice.kesAmount - insurance.premium.kesAmount : 0;
        const trackerProfit = tracker.isIncluded ? tracker.salePrice.kesAmount - tracker.premium.kesAmount : 0;
        
        let totalProfit = (sale.salePrice.kesAmount - vehicleCost) + insuranceProfit + trackerProfit;
        if(sale.brokerId) totalProfit -= sale.brokerFee.kesAmount;

        return { totalInvoice, vehicleCost, totalProfit, insuranceProfit, trackerProfit };
    }, [sale, insurance, tracker, selectedVehicle]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        if (!selectedVehicle || sale.salePrice.kesAmount <= 0 || (!selectedCustomerId && !customer.name)) {
            setMessage({ type: 'error', text: 'Please select a vehicle, enter a sale price, and select or create a customer.' });
            setIsLoading(false);
            return;
        }

        try {
            let finalCustomerId: number;
            let finalCustomerName: string;
            
            if (selectedCustomerId) {
                finalCustomerId = parseInt(selectedCustomerId, 10);
                finalCustomerName = customers.find(c => c.id === finalCustomerId)?.name || 'Unknown';
            } else {
                const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
                const newCustomer: Customer = { id: newId, ...customer };
                setCustomers(prev => [...prev, newCustomer]);
                finalCustomerId = newId;
                finalCustomerName = newCustomer.name;
            }

            const downPayment: Payment = { id: Date.now().toString(), date: sale.saleDate, amount: sale.downPayment, method: 'Cash', notes: 'Initial down payment' };

            const finalSaleDetails: SaleDetails = {
                customerId: finalCustomerId,
                customerName: finalCustomerName,
                saleDate: sale.saleDate,
                salePrice: sale.salePrice,
                paymentMethod: sale.paymentMethod,
                payments: sale.downPayment.kesAmount > 0 ? [downPayment] : [],
                balance: totalInvoice - sale.downPayment.kesAmount,
                salespersonId: user?.id || 0,
                salespersonName: user?.name || 'System',
                brokerId: sale.brokerId ? parseInt(sale.brokerId, 10) : undefined,
                brokerFee: sale.brokerId ? sale.brokerFee : undefined,
            };
            
            setVehicles(prev => prev.map(v => v.id === selectedVehicle.id ? { ...v, status: 'Sold', saleDetails: finalSaleDetails } : v));
            logActivity('SALE_FINALIZED', `sold ${selectedVehicle.stockNumber} (${selectedVehicle.make} ${selectedVehicle.model}) to ${finalCustomerName}`, 'sale', selectedVehicle.id);
            
            setMessage({ type: 'success', text: 'Sale recorded! Redirecting to ledger...' });
            setTimeout(() => setView('deal_ledger', { id: selectedVehicle.id }), 1500);

        } catch (error: any) {
            setMessage({ type: 'error', text: `Failed to record sale: ${error.message}` });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="bg-content-secondary p-4 rounded-lg border border-content-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-content-primary">Create New Sale / Deal</h2>
                <button type="button" onClick={() => setView('dashboard')} className="btn-secondary text-xs px-3 py-1">Back</button>
            </div>
            
            <div className='flex-grow overflow-y-auto pt-2 pb-6 pr-2 grid grid-cols-1 lg:grid-cols-3 gap-4'>
                <div className='lg:col-span-2 space-y-4'>
                    <SubSection title="1. Select Vehicle">
                        <Select value={selectedVehicleId} onChange={e => setSelectedVehicleId(e.target.value)} required>
                            <option value="" disabled>Select a vehicle from inventory...</option>
                            {availableVehicles.map(v => <option key={v.id} value={v.id}>{v.stockNumber} - {v.make} {v.model} ({v.chassisNumber})</option>)}
                        </Select>
                        {selectedVehicle && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2 bg-content-tertiary/50 rounded-md">
                                <ReadOnlyField label="Make" value={selectedVehicle.make} />
                                <ReadOnlyField label="Model" value={selectedVehicle.model} />
                                <ReadOnlyField label="Year" value={selectedVehicle.year} />
                                <ReadOnlyField label="Mileage" value={selectedVehicle.mileage} />
                                <ReadOnlyField label="Chassis" value={selectedVehicle.chassisNumber} />
                                <ReadOnlyField label="Color" value={selectedVehicle.color} />
                                <ReadOnlyField label="Location" value={selectedVehicle.location} />
                            </div>
                        )}
                    </SubSection>
                     <SubSection title="2. Customer Information" disabled={!selectedVehicleId}>
                        <FormRow>
                            <Label htmlFor="customer-select">Existing Customer</Label>
                            <Select id="customer-select" value={selectedCustomerId} onChange={e => setSelectedCustomerId(e.target.value)}>
                                <option value="">-- Add New Customer Below --</option>
                                {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>)}
                            </Select>
                        </FormRow>
                         <div className={`space-y-4 transition-opacity ${selectedCustomerId ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                            <FormRow><Label htmlFor="name">Full Name</Label><Input id="name" name="name" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} disabled={!!selectedCustomerId} required/></FormRow>
                            <FormRow><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} disabled={!!selectedCustomerId} required/></FormRow>
                            <FormRow><Label htmlFor="idNumber">ID / Passport No.</Label><Input id="idNumber" name="idNumber" value={customer.idNumber} onChange={e => setCustomer({...customer, idNumber: e.target.value})} disabled={!!selectedCustomerId}/></FormRow>
                            <FormRow><Label htmlFor="kraPin">KRA PIN</Label><Input id="kraPin" name="kraPin" value={customer.kraPin} onChange={e => setCustomer({...customer, kraPin: e.target.value})} disabled={!!selectedCustomerId}/></FormRow>
                        </div>
                    </SubSection>

                    <SubSection title="3. Sale & Payment Details" disabled={!selectedVehicleId}>
                        <FormRow><Label htmlFor="salePrice">Vehicle Sale Price</Label><CurrencyInput id="salePrice" value={sale.salePrice} onChange={val => setSale({...sale, salePrice: val})}/></FormRow>
                        <FormRow><Label htmlFor="paymentMethod">Payment Method</Label>
                            <Select id="paymentMethod" value={sale.paymentMethod} onChange={e => setSale({...sale, paymentMethod: e.target.value as any})}>
                                <option>Cash</option><option>(HP) Higher Purchase</option>
                            </Select>
                        </FormRow>
                        <FormRow><Label htmlFor="downPayment">Down Payment</Label><CurrencyInput id="downPayment" value={sale.downPayment} onChange={val => setSale({...sale, downPayment: val})}/></FormRow>
                        <FormRow><Label htmlFor="brokerId">Broker (Optional)</Label>
                            <div className="md:col-span-2 grid grid-cols-2 gap-2">
                                <Select id="brokerId" value={sale.brokerId} onChange={e => setSale({...sale, brokerId: e.target.value})}>
                                    <option value="">No Broker</option>
                                    {brokers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </Select>
                                {sale.brokerId && <CurrencyInput id="brokerFee" value={sale.brokerFee} onChange={val => setSale({...sale, brokerFee: val})}/>}
                            </div>
                        </FormRow>
                    </SubSection>
                </div>

                 <div className="lg:col-span-1 space-y-4">
                    <div className="p-4 bg-content-tertiary/20 rounded-lg border border-content-primary/20">
                        <h3 className="text-base font-bold text-content-primary mb-3">Financial Summary</h3>
                        <div className="space-y-2 text-sm">
                             <div className="flex justify-between"><span className="text-content-secondary">Total Invoice:</span><span className="font-mono font-semibold">{totalInvoice.toLocaleString()}</span></div>
                             <div className="flex justify-between"><span className="text-content-secondary">Vehicle Cost:</span><span className="font-mono font-semibold text-red-400">({vehicleCost.toLocaleString()})</span></div>
                             <hr className="border-content-primary/50 my-1"/>
                             <div className="flex justify-between font-bold text-lg"><span className="text-content-primary">Gross Profit:</span><span className={`font-mono ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>{totalProfit.toLocaleString()}</span></div>
                        </div>
                    </div>
                 </div>
            </div>
            
            <div className="flex justify-end items-center gap-3 pt-3 border-t border-content-primary mt-auto">
                {message && <div className={`text-sm font-semibold ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message.text}</div>}
                <button type="submit" disabled={isLoading} className="btn-primary w-full md:w-auto text-sm py-2">
                    {isLoading ? 'Finalizing...' : 'Finalize Sale'}
                </button>
            </div>
        </form>
    );

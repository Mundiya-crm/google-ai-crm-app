import React, { useEffect, useState } from 'react';
import type { Currency, CurrencyValue } from '../constants/vehicleData.ts';

interface CurrencyInputProps {
  id: string;
  value: CurrencyValue;
  onChange: (value: CurrencyValue) => void;
  disabled?: boolean;
}

const currencies: {symbol: string, code: Currency}[] = [
    {symbol: 'Ksh', code: 'KES'},
    {symbol: '¥', code: 'JPY'},
    {symbol: '$', code: 'USD'},
    {symbol: '€', code: 'EUR'},
    {symbol: 'Rs', code: 'PKR'},
];

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ id, value, onChange, disabled }) => {
    const [internalAmount, setInternalAmount] = useState<string>(value.amount > 0 ? value.amount.toLocaleString('en-US') : '');

    useEffect(() => {
        setInternalAmount(value.amount > 0 ? value.amount.toLocaleString('en-US') : '');
    }, [value.amount]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const numericValue = parseInt(rawValue.replace(/[^0-9]/g, ''), 10) || 0;
        setInternalAmount(numericValue > 0 ? numericValue.toLocaleString('en-US') : '');
        
        const kesAmount = value.currency === 'KES' ? numericValue : numericValue * (value.rate || 1);
        onChange({ ...value, amount: numericValue, kesAmount });
    };

    const handleCurrencyChange = (newCurrency: Currency) => {
        const newRate = newCurrency === 'KES' ? 1 : value.rate;
        const kesAmount = newCurrency === 'KES' ? value.amount : value.amount * (newRate || 1);
        onChange({ ...value, currency: newCurrency, rate: newRate, kesAmount });
    };
    
    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRate = parseFloat(e.target.value) || 0;
        const kesAmount = value.amount * newRate;
        onChange({ ...value, rate: newRate, kesAmount });
    };

    return (
        <div className="md:col-span-2 w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="relative sm:col-span-2">
                <input
                    id={id}
                    type="text"
                    inputMode="numeric"
                    value={internalAmount}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                    className="w-full text-base pl-12 pr-4 py-1.5 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    disabled={disabled}
                    required
                    aria-label="Amount"
                />
                <select 
                    value={value.currency} 
                    onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
                    className="absolute left-0 top-0 h-full bg-content-tertiary border-r border-content-secondary text-accent font-bold text-sm px-2 rounded-l-btn focus:outline-none"
                    disabled={disabled}
                    aria-label="Currency"
                >
                    {currencies.map(c => <option key={c.code} value={c.code}>{c.symbol}</option>)}
                </select>
            </div>

            {value.currency !== 'KES' && (
                <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-content-secondary">Rate:</span>
                    <input
                        type="number"
                        step="any"
                        value={value.rate}
                        onChange={handleRateChange}
                        className="w-full text-sm pl-10 pr-2 py-1 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-1 focus:ring-accent"
                        disabled={disabled}
                        aria-label="Exchange Rate"
                    />
                </div>
            )}
            <div className={`text-right sm:col-span-1 flex items-center justify-end ${value.currency === 'KES' ? 'sm:col-span-2' : ''}`}>
                 <p className="text-xs text-content-secondary">
                    Total in KES: <span className="font-mono text-base text-accent font-semibold">{value.kesAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </p>
            </div>
        </div>
    );
};
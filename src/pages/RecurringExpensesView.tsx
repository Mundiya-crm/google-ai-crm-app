
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { RecurringExpense } from '../constants/recurringExpensesData';
import { CurrencyValue, defaultKESCurrencyValue } from '../constants/vehicleData';
import { CurrencyInput } from '../utils/CurrencyInput';
import { ICONS } from '../constants/icons';

const EditModal: React.FC<{
    expense: RecurringExpense;
    onSave: (updatedExpense: RecurringExpense) => void;
    onClose: () => void;
}> = ({ expense, onSave, onClose }) => {
    const { chartOfAccounts } = useData();
    const [formData, setFormData] = useState(expense);

    const handleCurrencyChange = (value: CurrencyValue) => {
        setFormData(prev => ({ ...prev, amount: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    
    const expenseAccounts = useMemo(() => {
        return chartOfAccounts.filter(acc => acc.category === 'Expenses').sort((a,b) => a.code.localeCompare(b.code));
    }, [chartOfAccounts]);

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-primary border border-primary rounded-lg shadow-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-primary mb-4">Edit Scheduled Expense</h3>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="text-sm text-secondary">Expense Name</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50"/>
                    </div>
                     <div>
                        <label className="text-sm text-secondary">Expense Account</label>
                        <select value={formData.expenseAccountId} onChange={e => setFormData({...formData, expenseAccountId: e.target.value})} className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50">
                            {expenseAccounts.map(acc => <option key={acc.code} value={acc.code}>{acc.name} ({acc.code})</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-secondary">Amount</label>
                        <CurrencyInput id="expense-amount" value={formData.amount} onChange={handleCurrencyChange} />
                    </div>
                    <div>
                        <label className="text-sm text-secondary">Day of Month Due (1-31)</label>
                        <input type="number" min="1" max="31" value={formData.dayOfMonthDue} onChange={e => setFormData({...formData, dayOfMonthDue: parseInt(e.target.value, 10) || 1})} className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50"/>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 bg-tertiary text-primary rounded-btn hover:bg-tertiary/70">Cancel</button>
                        <button type="submit" className="btn-primary py-2 px-6">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const RecurringExpensesView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const { recurringExpenses, setRecurringExpenses, chartOfAccounts } = useData();
    const [isEditing, setIsEditing] = useState<RecurringExpense | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    
    const getAccountName = (code: string) => chartOfAccounts.find(a => a.code === code)?.name || 'Unknown';

    const handleSave = (updatedExpense: RecurringExpense) => {
        setRecurringExpenses(prev => prev.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp));
        setIsEditing(null);
    };

    const handleAddNew = () => {
        const newExpense: RecurringExpense = {
            id: `expense_${Date.now()}`,
            name: 'New Expense',
            amount: defaultKESCurrencyValue,
            dayOfMonthDue: 1,
            expenseAccountId: '5100', // Default to Rent Expense
        };
        setRecurringExpenses(prev => [...prev, newExpense]);
        setIsEditing(newExpense);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this scheduled expense?')) {
            setRecurringExpenses(prev => prev.filter(exp => exp.id !== id));
        }
    };

    return (
        <div className="bg-secondary p-4 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-primary">Manage Scheduled Payments</h2>
                <button onClick={handleAddNew} className="btn-primary text-sm bg-green-600 hover:bg-green-700">
                    + Add New Expense
                </button>
            </div>
            <p className="text-sm text-secondary mb-4">Set up recurring monthly expenses like rent and salaries. The system will automatically create notifications for you 5 days before the due date.</p>
            
            <div className="overflow-auto flex-grow">
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-header z-10">
                        <tr>
                            {['Expense Name', 'Amount', 'Expense Account', 'Day Due', 'Actions'].map(header => (
                                <th key={header} className="text-left font-semibold text-secondary p-2 border-b border-primary text-xs whitespace-nowrap">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/50">
                        {recurringExpenses.map(expense => (
                            <tr key={expense.id} className="hover:bg-tertiary/30">
                                <td className="p-2 font-semibold">{expense.name}</td>
                                <td className="p-2 font-mono text-accent">{expense.amount.kesAmount.toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</td>
                                <td className="p-2 text-xs">{getAccountName(expense.expenseAccountId)} ({expense.expenseAccountId})</td>
                                <td className="p-2 text-xs">Day {expense.dayOfMonthDue} of each month</td>
                                <td className="p-2">
                                    <div className="flex gap-4">
                                        <button onClick={() => setIsEditing(expense)} className="text-blue-400 font-semibold text-xs hover:underline">Edit</button>
                                        <button onClick={() => handleDelete(expense.id)} className="text-red-400 font-semibold text-xs hover:underline">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isEditing && (
                <EditModal 
                    expense={isEditing}
                    onSave={handleSave}
                    onClose={() => setIsEditing(null)}
                />
            )}
        </div>
    );
};

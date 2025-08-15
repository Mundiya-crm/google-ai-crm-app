

import { CurrencyValue, defaultKESCurrencyValue } from "./vehicleData";

export interface RecurringExpense {
    id: string; // e.g., 'rent-showroom'
    name: string; // e.g., 'Showroom Rent'
    amount: CurrencyValue;
    dayOfMonthDue: number; // e.g., 1 for the 1st of the month
    expenseAccountId: string; // Links to the Chart of Accounts (e.g., '5100' for Rent Expense)
    payableAccountId?: string; // Optional: Links to a specific payable account if applicable
}

export const initialRecurringExpenses: RecurringExpense[] = [
    {
        id: 'rent_showroom',
        name: 'Main Showroom Rent',
        amount: { ...defaultKESCurrencyValue, amount: 150000, kesAmount: 150000 },
        dayOfMonthDue: 1,
        expenseAccountId: '5100',
    },
    {
        id: 'salary_director_1',
        name: 'Director Salary - Meshaal',
        amount: { ...defaultKESCurrencyValue, amount: 100000, kesAmount: 100000 },
        dayOfMonthDue: 28,
        expenseAccountId: '5050',
    },
    {
        id: 'salary_director_2',
        name: 'Director Salary - Aqua',
        amount: { ...defaultKESCurrencyValue, amount: 100000, kesAmount: 100000 },
        dayOfMonthDue: 28,
        expenseAccountId: '5050',
    },
    {
        id: 'utility_bills',
        name: 'Monthly Utility Bills (KPLC, Water)',
        amount: { ...defaultKESCurrencyValue, amount: 25000, kesAmount: 25000 },
        dayOfMonthDue: 15,
        expenseAccountId: '5110',
    },
];

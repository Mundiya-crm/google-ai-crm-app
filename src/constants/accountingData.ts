
export type AccountCategory = 'Assets' | 'Liabilities' | 'Equity' | 'Revenue' | 'Expenses';

export interface Account {
  id: number;
  name: string;
  code: string;
  category: AccountCategory;
  parentId?: number | null;
}

const accountsData: Account[] = [
  { id: 10, name: 'Accounts Payable', code: '2010', category: 'Liabilities', parentId: null },
  { id: 4, name: 'Accounts Receivable', code: '1300', category: 'Assets', parentId: null },
  { id: 2, name: 'Bank Account', code: '1020', category: 'Assets', parentId: null },
  { id: 17, name: 'Broker Payables', code: '2015', category: 'Liabilities', parentId: 10 },
  { id: 1, name: 'Cash on Hand', code: '1010', category: 'Assets', parentId: null },
  { id: 14, name: 'Clearing Agent Payables', code: '2012', category: 'Liabilities', parentId: 10 },
  { id: 20, name: "Company Capital", code: '3010', category: 'Equity', parentId: null },
  { id: 40, name: 'Cost of Goods Sold (Vehicles)', code: '5010', category: 'Expenses', parentId: null },
  { id: 32, name: 'Financing Income', code: '4030', category: 'Revenue', parentId: 29 },
  { id: 33, name: 'Insurance Revenue', code: '4040', category: 'Revenue', parentId: 29 },
  { id: 16, name: 'Insurance Payables', code: '2014', category: 'Liabilities', parentId: 10 },
  { id: 13, name: 'Loan Payable', code: '2100', category: 'Liabilities', parentId: null },
  { id: 44, name: 'Marketing and Advertising', code: '5200', category: 'Expenses', parentId: null },
  { id: 5, name: 'Office Equipment', code: '1500', category: 'Assets', parentId: null },
  { id: 6, name: 'Other Company Assets', code: '1600', category: 'Assets', parentId: null },
  { id: 42, name: 'Rent Expense', code: '5100', category: 'Expenses', parentId: null },
  { id: 35, name: 'Rental & Other Income', code: '4060', category: 'Revenue', parentId: 29 },
  { id: 21, name: 'Retained Earnings', code: '3020', category: 'Equity', parentId: null },
  { id: 41, name: 'Salaries and Wages', code: '5050', category: 'Expenses', parentId: null },
  { id: 12, name: 'Sales Tax Payable', code: '2020', category: 'Liabilities', parentId: null },
  { id: 31, name: 'Service & Repair Revenue', code: '4020', category: 'Revenue', parentId: 29 },
  { id: 11, name: 'Supplier Payables', code: '2011', category: 'Liabilities', parentId: 10 },
  { id: 15, name: 'Tracker Payables', code: '2013', category: 'Liabilities', parentId: 10 },
  { id: 43, name: 'Utilities Expense', code: '5110', category: 'Expenses', parentId: null },
  { id: 3, name: 'Vehicle Inventory', code: '1200', category: 'Assets', parentId: null },
  { id: 48, name: 'Vehicle Insurance Expense', code: '5600', category: 'Expenses', parentId: null },
  { id: 46, name: 'Vehicle Repair Expense', code: '5400', category: 'Expenses', parentId: null },
  { id: 29, name: 'Sales Revenue', code: '4000', category: 'Revenue', parentId: null },
  { id: 30, name: 'Vehicle Sales Revenue', code: '4010', category: 'Revenue', parentId: 29 },
  { id: 49, name: 'Vehicle Tracker Expense', code: '5700', category: 'Expenses', parentId: null },
];

export const initialChartOfAccounts: Account[] = accountsData.sort((a, b) => a.code.localeCompare(b.code));


export interface JournalRow {
  accountId: string; 
  description: string;
  debit: number; // Always in KES
  credit: number; // Always in KES
  chassisNumber?: string;
  registrationNumber?: string;
}

export interface JournalEntry {
  id: number;
  date: string;
  transactionDescription: string;
  rows: JournalRow[];
}

export const initialJournalEntries: JournalEntry[] = [];

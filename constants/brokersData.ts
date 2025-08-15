
export interface Broker {
  id: number;
  name: string;
  idNumber?: string;
  kraPin?: string;
  phone?: string;
  apAccountCode: string; // Links to the Chart of Accounts
}

export const initialBrokers: Broker[] = [];

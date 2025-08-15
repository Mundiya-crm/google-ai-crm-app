
import { Salesperson } from "./suppliersData";

export interface ClearingAgent {
  id: string;
  name: string;
  apAccountCode: string; // Links to the Chart of Accounts
  salespersons: Salesperson[];
  contactPerson?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}

export let initialClearingAgents: ClearingAgent[] = [
    {
        id: 'agent_1',
        name: 'FastLane Clearing',
        apAccountCode: '2012-01',
        contactPerson: 'Ahmed Hussein',
        phone: '0722112233',
        email: 'info@fastlaneclearing.co.ke',
        salespersons: [{id: 'flc_ahmed', name: 'Ahmed Hussein', subPrefix: 'Ahmed'}]
    }
];
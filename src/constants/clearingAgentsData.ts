import { Salesperson } from "./suppliersData";
import { CurrencyValue, defaultKESCurrencyValue } from "./vehicleData";

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
  kraPin?: string;
  agencyFee?: CurrencyValue;
}

export let initialClearingAgents: ClearingAgent[] = [
    {
        id: 'senator_one',
        name: 'Senator One Enterprises Ltd.',
        apAccountCode: '2012-01',
        contactPerson: 'Michael Omondi',
        phone: '0722485011',
        salespersons: [{id: 'senator_one_michael', name: 'Michael Omondi', subPrefix: 'Mich'}],
        agencyFee: { ...defaultKESCurrencyValue, amount: 5000, kesAmount: 5000 },
    },
    {
        id: 'natabel_co_ltd',
        name: 'Natabel Co. Ltd',
        apAccountCode: '2012-02',
        contactPerson: 'Suleman',
        phone: '+254727545573',
        address: 'P.O. Box 2662-80100 Mombasa',
        kraPin: 'P051450691E',
        salespersons: [{id: 'natabel_suleman', name: 'Suleman', subPrefix: 'Sule'}],
        agencyFee: { ...defaultKESCurrencyValue, amount: 5000, kesAmount: 5000 },
    }
];
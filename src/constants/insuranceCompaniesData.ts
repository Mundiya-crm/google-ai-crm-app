
export interface Salesperson {
  id: string;
  name: string;
  subPrefix: string;
}

export interface InsuranceCompany {
  id: string;
  name: string;
  salespersons: Salesperson[];
  privateRate?: number; 
  psvRate?: number; 
  psvPassengerFee?: number;
  apAccountCode: string;
  contactPerson?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}

export const initialInsuranceCompanies: InsuranceCompany[] = [
    {
        id: 'jubilee',
        name: 'Jubilee Insurance',
        apAccountCode: '2014-01',
        privateRate: 3.5,
        psvRate: 4.5,
        psvPassengerFee: 750,
        salespersons: [{id: 'jub_ali', name: 'Ali Raza', subPrefix: 'Ali'}],
        contactPerson: 'Ali Raza',
        phone: '0712345678',
        email: 'ali.raza@jubilee.co.ke'
    },
    {
        id: 'britam',
        name: 'Britam',
        apAccountCode: '2014-02',
        privateRate: 3.8,
        psvRate: 4.2,
        psvPassengerFee: 800,
        salespersons: [{id: 'bri_mary', name: 'Mary Wanjiru', subPrefix: 'Mary'}],
        contactPerson: 'Mary Wanjiru',
        phone: '0787654321',
        email: 'mary.w@britam.com'
    }
];

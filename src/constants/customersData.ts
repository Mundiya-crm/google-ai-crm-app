
export interface Customer {
  id: number;
  name: string;
  phone: string;
  address?: string;
  idNumber?: string;
  kraPin?: string;
}

export const initialCustomers: Customer[] = [];

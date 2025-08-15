
import { Salesperson } from "./suppliersData";

export interface TrackingCompany {
  id: string;
  name: string;
  apAccountCode: string;
  salespersons: Salesperson[];
  contactPerson?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}

export const initialTrackingCompanies: TrackingCompany[] = [];

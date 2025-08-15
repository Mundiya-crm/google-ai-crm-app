
export type VehicleStatus = 'Available' | 'Sold' | 'Reserved' | 'On Way';
export type VehicleLocation = 'Japan' | 'On Way' | 'Port' | 'Showroom' | 'Yard';
export type ShipmentType = 'CONTAINER' | 'RORO' | '';
export type Currency = 'KES' | 'JPY' | 'USD' | 'EUR' | 'PKR';
export type PaymentMethod = 'Cash' | 'Bank Transfer' | 'Cheque' | 'M-Pesa';

export interface CurrencyValue {
  amount: number;
  currency: Currency;
  rate: number;
  kesAmount: number;
}

export const defaultCurrencyValue: CurrencyValue = {
  amount: 0,
  currency: 'JPY',
  rate: 1.2,
  kesAmount: 0
};

export const defaultKESCurrencyValue: CurrencyValue = {
  amount: 0,
  currency: 'KES',
  rate: 1,
  kesAmount: 0,
};

export interface InsuranceInstallment {
  installmentNumber: number;
  dueDate: string;
  amountDue: number; // in KES
}

export interface InsuranceSaleDetails {
  companyId: string;
  salespersonId: string;
  salespersonName: string;
  policyNumber?: string;
  premium: CurrencyValue; // Cost from insurance company
  salePrice: CurrencyValue; // Price charged to customer
  profit: number; // Stored in KES
  insuranceType: 'Private' | 'PSV';
  carValue: number;
  passengers?: number;
  paymentPlan?: InsuranceInstallment[];
}

export interface TrackerSaleDetails {
  companyId: string;
  salespersonId: string;
  salespersonName: string;
  deviceNumber?: string;
  premium: CurrencyValue;
  salePrice: CurrencyValue;
  profit: number; // Stored in KES
}

export interface Payment {
  id: string;
  date: string;
  amount: CurrencyValue;
  method: PaymentMethod;
  notes?: string;
}

export interface Installment {
  installmentNumber: number;
  dueDate: string;
  amountDue: number; // in KES
  status: 'Pending' | 'Paid' | 'Partially Paid' | 'Overdue';
}

export interface SaleDetails {
  customerId: number;
  customerName: string;
  saleDate: string;
  salePrice: CurrencyValue;
  paymentMethod: 'Cash' | '(HP) Higher Purchase';
  brokerId?: number;
  brokerFee?: CurrencyValue;
  payments: Payment[]; // All payments including down payment
  installmentPlan?: Installment[];
  balance: number; // Stored in KES
  insurance?: InsuranceSaleDetails;
  tracker?: TrackerSaleDetails;
  salespersonId: number;
  salespersonName: string;
}

export interface ClearingDocument {
    name: string;
    url: string; // data URL
    type: string;
}

export interface Vehicle {
  id: number;
  purchaseType: 'import' | 'local';
  supplierId: string;
  salespersonId: string;
  salespersonSubPrefix: string;
  lotNumber: string;
  purchaseDate: string;
  auction: string; // Supplier Name
  auctionName?: string; // e.g. USS Tokyo
  make: string;
  model: string;
  grade?: string;
  chassisNumber: string;
  year: string;
  color: string;
  mileage: string;
  totalCnf?: CurrencyValue; 
  purchasePrice?: CurrencyValue;
  clearingAgentId?: string; // Link to the clearing agent
  clearingCost?: CurrencyValue;
  repairCost?: CurrencyValue;
  biddingPrice?: number; // YEN
  profitOnBidding?: number; // YEN
  auctionFee?: number; // YEN
  transportFee?: number; // YEN
  inspectionFee?: number; // YEN
  extraCharges?: number; // YEN
  roroShipping?: number; // YEN
  roroFreight?: number; // YEN
  containerVanning?: number; // YEN
  containerFreight?: number; // YEN
  dhl?: number; // YEN
  exchangeRate?: number;
  shipmentType: ShipmentType;
  portOfLoading: string;
  vessel: string;
  eta: string;
  imageUrls: string[];
  status: VehicleStatus;
  location: VehicleLocation;
  stockNumber: string;
  engine?: string;
  engineCC?: string;
  transmission?: 'Automatic' | 'Manual';
  fuelType?: 'Petrol' | 'Diesel' | 'Hybrid';
  saleDetails?: SaleDetails;
  registrationNumber?: string;
  previousOwnerName?: string;
  previousOwnerId?: string;
  previousOwnerKRAPin?: string;
  previousOwnerPhone?: string;
  clearingDocuments?: ClearingDocument[];
}

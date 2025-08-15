import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Import interfaces and initial data
import { Vehicle } from '../constants/vehicleData';
import { initialVehicles } from '../constants/initialVehicleData';
import { initialSuppliers, Supplier } from '../constants/suppliersData';
import { initialCustomers, Customer } from '../constants/customersData';
import { initialChartOfAccounts, Account } from '../constants/accountingData';
import { initialJournalEntries, JournalEntry } from '../constants/journalData';
import { initialClearingAgents, ClearingAgent } from '../constants/clearingAgentsData';
import { initialTrackingCompanies, TrackingCompany } from '../constants/trackerAgentsData';
import { initialInsuranceCompanies, InsuranceCompany } from '../constants/insuranceCompaniesData';
import { initialBrokers, Broker } from '../constants/brokersData';
import { User, usersData as initialUsers } from '../constants/usersData';
import { Notification, initialNotifications } from '../constants/notificationData';
import { RecurringExpense, initialRecurringExpenses } from '../constants/recurringExpensesData';
import { Lead, TimelineEvent, Alert, AuditLog, SystemSettings, FeatureFlags, ModuleConfig } from '../constants/dataTypes';
import { ROLE_PERMISSIONS, Role, Permission } from '../constants/permissions';

// Initial mock data for new features
const initialLeads: Lead[] = [
    { id: 1, customerName: 'John Appleseed', vehicleOfInterest: 'Toyota Vitz 2017', lastContacted: '2025-08-10T14:00:00Z', status: 'Follow-up' },
    { id: 2, customerName: 'Jane Doe', vehicleOfInterest: 'Nissan Note 2018', lastContacted: '2025-08-12T10:30:00Z', status: 'Contacted' },
];
const initialTimeline: TimelineEvent[] = [
    { id: 1, leadId: 1, timestamp: '2025-08-10T14:00:00Z', type: 'USER_MESSAGE', content: 'Inquired about the silver Toyota Vitz.', author: 'Admin User' },
    { id: 2, leadId: 1, timestamp: '2025-08-10T14:05:00Z', type: 'AI_SUGGESTION', content: 'Suggested reply: "The 2017 Toyota Vitz is a great choice! It has excellent fuel economy. Would you like to schedule a viewing?"', author: 'AI Assistant' },
];
const initialAlerts: Alert[] = [];
const initialAuditLogs: AuditLog[] = [];
const initialSystemSettings: SystemSettings = {
    companyName: 'Mundiya International',
    kraPin: 'P051XXXXXXX',
    address: 'Mombasa, Kenya',
    defaultCurrency: 'KES',
    financialYearStart: '01-01',
};
const initialFeatureFlags: FeatureFlags = {
    aiSalesAssistant: true,
    predictiveAlerts: true,
};
const initialModuleConfig: ModuleConfig[] = [
    { key: 'stock', label: 'Stock', visible: true },
    { key: 'sales', label: 'Sales', visible: true },
    { key: 'accounting', label: 'Accounting', visible: true },
    { key: 'reports', label: 'Reports', visible: true },
    { key: 'customers', label: 'Customers', visible: true },
    { key: 'setup', label: 'Setup', visible: true },
];


export type RolesState = Record<Role, Permission[]>;

// Define context shape
interface DataContextType {
    vehicles: Vehicle[];
    setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
    suppliers: Supplier[];
    setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
    customers: Customer[];
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
    chartOfAccounts: Account[];
    setChartOfAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
    journalEntries: JournalEntry[];
    setJournalEntries: React.Dispatch<React.SetStateAction<JournalEntry[]>>;
    clearingAgents: ClearingAgent[];
    setClearingAgents: React.Dispatch<React.SetStateAction<ClearingAgent[]>>;
    trackingCompanies: TrackingCompany[];
    setTrackingCompanies: React.Dispatch<React.SetStateAction<TrackingCompany[]>>;
    insuranceCompanies: InsuranceCompany[];
    setInsuranceCompanies: React.Dispatch<React.SetStateAction<InsuranceCompany[]>>;
    brokers: Broker[];
    setBrokers: React.Dispatch<React.SetStateAction<Broker[]>>;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
    recurringExpenses: RecurringExpense[];
    setRecurringExpenses: React.Dispatch<React.SetStateAction<RecurringExpense[]>>;
    roles: RolesState;
    setRoles: React.Dispatch<React.SetStateAction<RolesState>>;
    leads: Lead[];
    setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
    timeline: TimelineEvent[];
    setTimeline: React.Dispatch<React.SetStateAction<TimelineEvent[]>>;
    alerts: Alert[];
    setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
    auditLogs: AuditLog[];
    setAuditLogs: React.Dispatch<React.SetStateAction<AuditLog[]>>;
    systemSettings: SystemSettings;
    setSystemSettings: React.Dispatch<React.SetStateAction<SystemSettings>>;
    featureFlags: FeatureFlags;
    setFeatureFlags: React.Dispatch<React.SetStateAction<FeatureFlags>>;
    moduleConfig: ModuleConfig[];
    setModuleConfig: React.Dispatch<React.SetStateAction<ModuleConfig[]>>;
    isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const [vehicles, setVehicles] = useLocalStorage<Vehicle[]>('crm_vehicles_v1', initialVehicles);
    const [suppliers, setSuppliers] = useLocalStorage<Supplier[]>('crm_suppliers_v1', initialSuppliers);
    const [customers, setCustomers] = useLocalStorage<Customer[]>('crm_customers_v1', initialCustomers);
    const [chartOfAccounts, setChartOfAccounts] = useLocalStorage<Account[]>('crm_chartOfAccounts_v1', initialChartOfAccounts);
    const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>('crm_journalEntries_v1', initialJournalEntries);
    const [clearingAgents, setClearingAgents] = useLocalStorage<ClearingAgent[]>('crm_clearingAgents_v1', initialClearingAgents);
    const [trackingCompanies, setTrackingCompanies] = useLocalStorage<TrackingCompany[]>('crm_trackingCompanies_v1', initialTrackingCompanies);
    const [insuranceCompanies, setInsuranceCompanies] = useLocalStorage<InsuranceCompany[]>('crm_insuranceCompanies_v1', initialInsuranceCompanies);
    const [brokers, setBrokers] = useLocalStorage<Broker[]>('crm_brokers_v1', initialBrokers);
    const [users, setUsers] = useLocalStorage<User[]>('crm_users_v1', initialUsers);
    const [notifications, setNotifications] = useLocalStorage<Notification[]>('crm_notifications_v1', initialNotifications);
    const [recurringExpenses, setRecurringExpenses] = useLocalStorage<RecurringExpense[]>('crm_recurringExpenses_v1', initialRecurringExpenses);
    const [roles, setRoles] = useLocalStorage<RolesState>('crm_roles_v1', ROLE_PERMISSIONS);
    const [leads, setLeads] = useLocalStorage<Lead[]>('crm_leads_v1', initialLeads);
    const [timeline, setTimeline] = useLocalStorage<TimelineEvent[]>('crm_timeline_v1', initialTimeline);
    const [alerts, setAlerts] = useLocalStorage<Alert[]>('crm_alerts_v1', initialAlerts);
    const [auditLogs, setAuditLogs] = useLocalStorage<AuditLog[]>('crm_audit_logs_v1', initialAuditLogs);
    const [systemSettings, setSystemSettings] = useLocalStorage<SystemSettings>('crm_systemSettings_v1', initialSystemSettings);
    const [featureFlags, setFeatureFlags] = useLocalStorage<FeatureFlags>('crm_featureFlags_v1', initialFeatureFlags);
    const [moduleConfig, setModuleConfig] = useLocalStorage<ModuleConfig[]>('crm_moduleConfig_v1', initialModuleConfig);

    useEffect(() => {
        // Simulate data loading to show the loading screen
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Effect for generating notifications
    useEffect(() => {
        if (isLoading) return;
        const today = new Date();
        const newNotifications: Notification[] = [];

        vehicles.forEach(v => {
            if (v.status === 'On Way' && v.eta) {
                const etaDate = new Date(v.eta);
                const diffTime = etaDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays >= 0 && diffDays <= 5) {
                    const notificationId = `eta-${v.id}`;
                    if (!notifications.some(n => n.id === notificationId)) {
                        newNotifications.push({
                            id: notificationId,
                            message: `Vehicle ${v.make} ${v.model} (${v.stockNumber}) is scheduled to arrive on ${v.eta}.`,
                            category: 'ETA',
                            dueDate: v.eta,
                            createdAt: new Date().toISOString(),
                            isRead: false,
                            entityId: v.id,
                        });
                    }
                }
            }
        });

        if (newNotifications.length > 0) {
            setNotifications(prev => [...prev, ...newNotifications].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        }

    }, [isLoading, vehicles, notifications, setNotifications]);

    const value = {
        vehicles, setVehicles,
        suppliers, setSuppliers,
        customers, setCustomers,
        chartOfAccounts, setChartOfAccounts,
        journalEntries, setJournalEntries,
        clearingAgents, setClearingAgents,
        trackingCompanies, setTrackingCompanies,
        insuranceCompanies, setInsuranceCompanies,
        brokers, setBrokers,
        users, setUsers,
        notifications, setNotifications,
        recurringExpenses, setRecurringExpenses,
        roles, setRoles,
        leads, setLeads,
        timeline, setTimeline,
        alerts, setAlerts,
        auditLogs, setAuditLogs,
        systemSettings, setSystemSettings,
        featureFlags, setFeatureFlags,
        moduleConfig, setModuleConfig,
        isLoading,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

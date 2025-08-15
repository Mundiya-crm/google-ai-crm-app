export type Role = 'admin' | 'sales' | 'clearing_agent';

export const PERMISSIONS = {
    // Dashboard
    VIEW_DASHBOARD: 'VIEW_DASHBOARD',
    
    // Vehicles
    VIEW_VEHICLES: 'VIEW_VEHICLES',
    ADD_VEHICLES: 'ADD_VEHICLES',
    EDIT_VEHICLES: 'EDIT_VEHICLES',
    DELETE_VEHICLES: 'DELETE_VEHICLES',
    IMPORT_VEHICLES: 'IMPORT_VEHICLES',
    EXPORT_VEHICLES: 'EXPORT_VEHICLES',
    
    // Sales
    SELL_VEHICLES: 'SELL_VEHICLES',
    VIEW_CUSTOMERS: 'VIEW_CUSTOMERS',
    ADD_CUSTOMERS: 'ADD_CUSTOMERS',
    MANAGE_PAYMENTS: 'MANAGE_PAYMENTS',
    
    // Accounting
    VIEW_ACCOUNTING: 'VIEW_ACCOUNTING',
    MANAGE_JOURNAL: 'MANAGE_JOURNAL',
    MANAGE_CHART_OF_ACCOUNTS: 'MANAGE_CHART_OF_ACCOUNTS',
    
    // Reports
    VIEW_REPORTS: 'VIEW_REPORTS',

    // Setup & Admin
    MANAGE_SETUP: 'MANAGE_SETUP',
    ACCESS_ADMIN_PANEL: 'ACCESS_ADMIN_PANEL',
    MANAGE_USERS: 'MANAGE_USERS',
    MANAGE_SUPPLIERS: 'MANAGE_SUPPLIERS',
    MANAGE_PROVIDERS: 'MANAGE_PROVIDERS', // For clearing, tracker, insurance etc.

    // Clearing
    VIEW_CLEARING_PORTAL: 'VIEW_CLEARING_PORTAL',
    ASSIGN_CLEARING_AGENT: 'ASSIGN_CLEARING_AGENT',
    UPLOAD_CLEARING_DOCS: 'UPLOAD_CLEARING_DOCS',
    VIEW_ASSIGNED_VEHICLES: 'VIEW_ASSIGNED_VEHICLES',

} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ALL_PERMISSIONS: { id: Permission, label: string, category: string }[] = [
    { id: PERMISSIONS.VIEW_DASHBOARD, label: 'View Main Dashboard', category: 'General' },
    { id: PERMISSIONS.VIEW_VEHICLES, label: 'View Vehicle List', category: 'Vehicles' },
    { id: PERMISSIONS.ADD_VEHICLES, label: 'Add New Vehicles', category: 'Vehicles' },
    { id: PERMISSIONS.EDIT_VEHICLES, label: 'Edit Vehicle Details', category: 'Vehicles' },
    { id: PERMISSIONS.DELETE_VEHICLES, label: 'Delete Vehicles', category: 'Vehicles' },
    { id: PERMISSIONS.IMPORT_VEHICLES, label: 'Import Vehicles from File', category: 'Vehicles' },
    { id: PERMISSIONS.EXPORT_VEHICLES, label: 'Export Vehicles to Excel', category: 'Vehicles' },
    { id: PERMISSIONS.SELL_VEHICLES, label: 'Create New Sales/Deals', category: 'Sales' },
    { id: PERMISSIONS.VIEW_CUSTOMERS, label: 'View Customer List', category: 'Sales' },
    { id: PERMISSIONS.ADD_CUSTOMERS, label: 'Add New Customers', category: 'Sales' },
    { id: PERMISSIONS.MANAGE_PAYMENTS, label: 'Manage Deal Payments', category: 'Sales' },
    { id: PERMISSIONS.VIEW_ACCOUNTING, label: 'View Accounting Module', category: 'Accounting' },
    { id: PERMISSIONS.MANAGE_JOURNAL, label: 'Manage General Journal', category: 'Accounting' },
    { id: PERMISSIONS.MANAGE_CHART_OF_ACCOUNTS, label: 'Manage Chart of Accounts', category: 'Accounting' },
    { id: PERMISSIONS.VIEW_REPORTS, label: 'View Reports', category: 'Reports' },
    { id: PERMISSIONS.MANAGE_SETUP, label: 'Access Setup Module', category: 'Setup' },
    { id: PERMISSIONS.ACCESS_ADMIN_PANEL, label: 'Access Super Admin Panel', category: 'Admin' },
    { id: PERMISSIONS.MANAGE_USERS, label: 'Manage Users & Permissions', category: 'Admin' },
    { id: PERMISSIONS.MANAGE_SUPPLIERS, label: 'Manage Suppliers', category: 'Setup' },
    { id: PERMISSIONS.MANAGE_PROVIDERS, label: 'Manage Service Providers', category: 'Setup' },
    { id: PERMISSIONS.VIEW_CLEARING_PORTAL, label: 'View Clearing Portal', category: 'Clearing' },
    { id: PERMISSIONS.ASSIGN_CLEARING_AGENT, label: 'Assign Clearing Agent', category: 'Clearing' },
    { id: PERMISSIONS.UPLOAD_CLEARING_DOCS, label: 'Upload Clearing Documents', category: 'Clearing' },
    { id: PERMISSIONS.VIEW_ASSIGNED_VEHICLES, label: 'View Assigned Vehicles (Agents)', category: 'Clearing' },
];


export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    admin: ALL_PERMISSIONS.map(p => p.id),
    sales: [
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_VEHICLES,
        PERMISSIONS.ADD_VEHICLES,
        PERMISSIONS.EDIT_VEHICLES,
        PERMISSIONS.SELL_VEHICLES,
        PERMISSIONS.VIEW_CUSTOMERS,
        PERMISSIONS.ADD_CUSTOMERS,
        PERMISSIONS.MANAGE_PAYMENTS,
        PERMISSIONS.EXPORT_VEHICLES,
    ],
    clearing_agent: [
        PERMISSIONS.VIEW_ASSIGNED_VEHICLES,
    ],
};

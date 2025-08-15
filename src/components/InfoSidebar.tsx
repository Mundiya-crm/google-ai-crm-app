
import React from 'react';
import { ICONS, IconKey } from '../constants/icons';
import type { ModuleKey } from '../layouts/MainSidebar';
import { useAuth } from '../context/AuthContext';
import { Permission, PERMISSIONS } from '../constants/permissions';

interface SidebarButtonConfig {
    view?: string; 
    query?: Record<string, any>;
    label: string;
    iconKey: IconKey;
    permission: Permission;
    action?: () => void; 
    comingSoon?: boolean;
}

const sidebarConfigs: Record<ModuleKey, SidebarButtonConfig[]> = {
    dashboard: [
      { view: 'add_vehicle', query: { type: 'import' }, iconKey: 'importVehicle', label: 'Add Import Vehicle', permission: PERMISSIONS.ADD_VEHICLES },
      { view: 'add_vehicle', query: { type: 'local' }, iconKey: 'localPurchase', label: 'Add Local Purchase', permission: PERMISSIONS.ADD_VEHICLES },
      { view: 'sell', iconKey: 'newDeal', label: 'Create New Sale', permission: PERMISSIONS.SELL_VEHICLES },
      { view: 'clearing_dashboard', iconKey: 'clearing', label: 'Clearing Dashboard', permission: PERMISSIONS.VIEW_CLEARING_PORTAL },
    ],
    stock: [
      { view: 'vehicles', query: { filter: 'all' }, iconKey: 'stock', label: 'All Stock', permission: PERMISSIONS.VIEW_VEHICLES },
      { view: 'vehicles', query: { filter: 'local' }, iconKey: 'localPurchase', label: 'Local Stock', permission: PERMISSIONS.VIEW_VEHICLES },
      { view: 'vehicles', query: { filter: 'import' }, iconKey: 'importVehicle', label: 'Import Stock', permission: PERMISSIONS.VIEW_VEHICLES },
      { view: 'all_costing', iconKey: 'reports', label: 'All Cars Costing', permission: PERMISSIONS.VIEW_REPORTS },
      { view: 'local_costing', iconKey: 'reports', label: 'Local Purchase Costing', permission: PERMISSIONS.VIEW_REPORTS },
      { view: 'import_costing', iconKey: 'reports', label: 'Import Vehicle Costing', permission: PERMISSIONS.VIEW_REPORTS },
    ],
    sales: [
      { view: 'sell', iconKey: 'newDeal', label: 'New Deal Form', permission: PERMISSIONS.SELL_VEHICLES },
      { view: 'customers', iconKey: 'customerList', label: 'Customer List', permission: PERMISSIONS.VIEW_CUSTOMERS },
      { view: 'payment_management', iconKey: 'dealLedger', label: 'Payment Ledger', permission: PERMISSIONS.MANAGE_PAYMENTS },
    ],
    accounting: [
      { view: 'payment_management', iconKey: 'dealLedger', label: 'Payment Ledger', permission: PERMISSIONS.MANAGE_PAYMENTS },
      { view: 'general_journal', iconKey: 'newJournalEntry', label: 'New Journal Entry', permission: PERMISSIONS.MANAGE_JOURNAL },
      { view: 'chart_of_accounts', iconKey: 'chartOfAccounts', label: 'Chart of Accounts', permission: PERMISSIONS.MANAGE_CHART_OF_ACCOUNTS },
      { view: 'recurring_expenses', iconKey: 'scheduledExpense', label: 'Scheduled Payments', permission: PERMISSIONS.MANAGE_JOURNAL },
      { view: 'reports', iconKey: 'reports', label: 'Financial Reports', permission: PERMISSIONS.VIEW_REPORTS, comingSoon: true },
    ],
    customers: [
      { view: 'add_customer', iconKey: 'customers', label: 'Add New Customer', permission: PERMISSIONS.ADD_CUSTOMERS },
      { view: 'customers', iconKey: 'customerList', label: 'View Customer List', permission: PERMISSIONS.VIEW_CUSTOMERS },
    ],
    reports: [
        { view: 'all_costing', iconKey: 'reports', label: 'Vehicle Costing', permission: PERMISSIONS.VIEW_REPORTS },
        { view: 'reports_profit', iconKey: 'activeBalance', label: 'Profit/Loss', permission: PERMISSIONS.VIEW_REPORTS, comingSoon: true },
    ],
    setup: [
        { view: 'vendors', iconKey: 'vendors', label: 'Suppliers', permission: PERMISSIONS.MANAGE_SUPPLIERS },
        { view: 'clearing', iconKey: 'clearing', label: 'Clearing Agents', permission: PERMISSIONS.MANAGE_PROVIDERS },
        { view: 'tracker', iconKey: 'tracker', label: 'Tracking Co.', permission: PERMISSIONS.MANAGE_PROVIDERS },
        { view: 'insurance', iconKey: 'insurance', label: 'Insurance Co.', permission: PERMISSIONS.MANAGE_PROVIDERS },
        { view: 'brokers', iconKey: 'brokers', label: 'Brokers', permission: PERMISSIONS.MANAGE_PROVIDERS },
    ],
    adminPanel: [
        { view: 'user_management', iconKey: 'usersSetup', label: 'User & Role Management', permission: PERMISSIONS.MANAGE_USERS },
        { view: 'system_data_reset', iconKey: 'trash', label: 'System Data Reset', permission: PERMISSIONS.ACCESS_ADMIN_PANEL },
    ],
};

const SidebarItem: React.FC<{
    icon: React.ReactNode; 
    label: string; 
    isActive?: boolean;
    onClick?: () => void;
    comingSoon?: boolean;
}> = ({ icon, label, isActive, onClick, comingSoon }) => (
    <button 
        onClick={onClick}
        disabled={comingSoon}
        className={`flex items-center w-full p-2 space-x-3 transition-colors duration-200 text-primary rounded-btn relative 
            ${isActive ? 'bg-accent/30' : `hover:bg-tertiary/70`}
            ${comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center p-1">{icon}</div>
      <span className="font-medium text-sm text-left">{label}</span>
      {comingSoon && <span className="absolute right-2 top-0.5 text-[10px] font-bold text-yellow-300">Soon</span>}
    </button>
);

interface InfoSidebarProps {
  activeModule: ModuleKey;
  currentView: string;
  queryParams: Record<string, any>;
  setView: (view: string, query?: Record<string, any>) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const moduleLabels: Record<ModuleKey, string> = {
    dashboard: 'Dashboard',
    stock: 'Stock & Inventory',
    sales: 'Sales & Deals',
    accounting: 'Accounting',
    reports: 'Reports',
    customers: 'Customers',
    setup: 'System Setup',
    adminPanel: 'Admin Panel',
};

export const InfoSidebar: React.FC<InfoSidebarProps> = ({ activeModule, currentView, queryParams, setView, isCollapsed, setIsCollapsed }) => {
  const { hasPermission } = useAuth();
  
  const currentButtons = (sidebarConfigs[activeModule] || sidebarConfigs.stock).filter(button => hasPermission(button.permission));

  const handleItemClick = (button: SidebarButtonConfig) => {
    if (button.view) {
        setView(button.view, button.query || {});
    } else if (button.action) {
        button.action();
    }
  };
  
  return (
    <aside className={`hidden lg:flex flex-col bg-secondary border-l border-primary transition-all duration-300 ease-in-out relative ${isCollapsed ? 'w-8' : 'w-64'}`}>
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        className="absolute top-1/2 -left-3 z-10 w-6 h-10 bg-tertiary border border-primary rounded-md flex items-center justify-center text-primary hover:bg-accent transition-colors"
        style={{ transform: 'translateY(-50%)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d={isCollapsed ? "m8.25 4.5 7.5 7.5-7.5 7.5" : "m15.75 19.5-7.5-7.5 7.5-7.5"} />
        </svg>
      </button>
      
      <div className={`flex flex-col gap-4 p-2 w-full h-full overflow-hidden transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100 delay-150'}`}>
          <div>
            <h3 className="text-lg font-bold text-primary px-2 pt-2">{moduleLabels[activeModule]}</h3>
            <div className='w-full border-t border-primary my-2'></div>
          </div>
          <div className="space-y-1">
            {currentButtons.map((button) => {
              const queryFilter = button.query?.filter || null;
              const currentFilter = queryParams.filter || null;
              
              let isActive = false;
              if (activeModule === 'stock') {
                isActive = currentView === button.view && queryFilter === currentFilter;
              } else {
                isActive = currentView === button.view;
              }
              
              return (
                <SidebarItem 
                  key={button.label} 
                  icon={ICONS[button.iconKey]} 
                  label={button.label}
                  onClick={() => handleItemClick(button)}
                  isActive={isActive}
                  comingSoon={button.comingSoon}
                />
              );
            })}
          </div>
      </div>
    </aside>
  );
};

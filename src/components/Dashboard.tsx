import React from 'react';
import { ICONS, IconKey } from '../constants/icons';
import { ModuleKey } from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Permission, PERMISSIONS } from '../constants/permissions';
import { GlassButton } from './GlassButton';
// import { PredictiveAlertsWidget } from './PredictiveAlertsWidget'; // Assuming PredictiveAlertsWidget exists

interface ButtonConfig {
  view: string;
  module: ModuleKey;
  iconKey: IconKey;
  label: string;
  permission: Permission;
  featureFlag?: 'aiSalesAssistant';
}

export const mainButtons: ButtonConfig[] = [
  { view: 'vehicles', module: 'stock', iconKey: 'vehicles', label: 'Vehicles', permission: PERMISSIONS.VIEW_VEHICLES },
  { view: 'sell', module: 'sales', iconKey: 'sell', label: 'Sell (Deal)', permission: PERMISSIONS.SELL_VEHICLES },
  { view: 'sales_assistant', module: 'sales', iconKey: 'salesAssistant', label: 'Sales Assistant', permission: PERMISSIONS.SELL_VEHICLES, featureFlag: 'aiSalesAssistant' },
  { view: 'payment_management', module: 'accounting', iconKey: 'payments', label: 'Payments', permission: PERMISSIONS.MANAGE_PAYMENTS },
  { view: 'clearing', module: 'setup', iconKey: 'clearing', label: 'Clearing', permission: PERMISSIONS.MANAGE_PROVIDERS },
  { view: 'customers', module: 'customers', iconKey: 'customers', label: 'Customers', permission: PERMISSIONS.VIEW_CUSTOMERS },
  { view: 'user_management', module: 'setup', iconKey: 'usersSetup', label: 'Users', permission: PERMISSIONS.MANAGE_USERS },
  { view: 'accounting', module: 'accounting', iconKey: 'accounting', label: 'Accounting', permission: PERMISSIONS.VIEW_ACCOUNTING },
  { view: 'fastQuote', module: 'sales', iconKey: 'fastQuote', label: 'Fast Quote', permission: PERMISSIONS.SELL_VEHICLES },
  { view: 'help', module: 'setup', iconKey: 'help', label: 'Help & More', permission: PERMISSIONS.VIEW_DASHBOARD },
  { view: 'rapierShop', module: 'stock', iconKey: 'rapierShop', label: 'Karshop', permission: PERMISSIONS.VIEW_VEHICLES },
  { view: 'setup', module: 'setup', iconKey: 'setup', label: 'Setup', permission: PERMISSIONS.MANAGE_SETUP },
  { view: 'lienholders', module: 'accounting', iconKey: 'lienholders', label: 'Lienholders', permission: PERMISSIONS.VIEW_ACCOUNTING },
  { view: 'publisher', module: 'stock', iconKey: 'publisher', label: 'Publisher', permission: PERMISSIONS.VIEW_VEHICLES },
  { view: 'buyerSeller', module: 'customers', iconKey: 'buyerSeller', label: 'Buyer/Seller', permission: PERMISSIONS.VIEW_CUSTOMERS },
  { view: 'admin_panel_dashboard', module: 'adminPanel', iconKey: 'adminPanel', label: 'Admin Panel', permission: PERMISSIONS.ACCESS_ADMIN_PANEL },
];

interface DashboardProps {
  setView: (view: string) => void;
  setActiveModule: (module: ModuleKey) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setView, setActiveModule }) => {
  const { hasPermission } = useAuth();
  const { featureFlags } = useData();

  const handleButtonClick = (button: ButtonConfig) => {
    setActiveModule(button.module);
    setView(button.view);
  }
  
  const accessibleButtons = mainButtons.filter(button => {
    if (!hasPermission(button.permission)) return false;
    if (button.featureFlag && !featureFlags[button.featureFlag]) return false;
    return true;
  });

  return (
    <div className="bg-content-secondary p-4 rounded-lg border border-content-primary shadow-lg h-full flex flex-col">
        <h2 className="text-xl font-bold text-content-primary mb-4">Main Dashboard</h2>
        
        <div className="flex-grow overflow-y-auto pr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {accessibleButtons.map((button) => (
                    <GlassButton 
                        key={button.view} 
                        icon={ICONS[button.iconKey]} 
                        label={button.label} 
                        onClick={() => handleButtonClick(button)}
                    />
                ))}
            </div>
        </div>

        {/* This is a placeholder for the predictive alerts widget */}
        {featureFlags.predictiveAlerts && (
            <div className="mt-4 pt-4 border-t border-content-primary/50 shrink-0">
                {/* <PredictiveAlertsWidget /> */}
                <div className="bg-primary p-3 rounded-md text-sm text-secondary">Predictive Alerts Widget will be displayed here.</div>
            </div>
        )}
    </div>
  );
};

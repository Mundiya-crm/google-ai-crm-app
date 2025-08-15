
import React from 'react';
import { ICONS, IconKey } from '../src/constants/icons';
import { useAuth } from '../src/context/AuthContext';
import { Permission, PERMISSIONS } from '../src/constants/permissions';

export type ModuleKey = 'stock' | 'sales' | 'accounting' | 'reports' | 'customers' | 'setup';

interface ModuleConfig {
    key: ModuleKey;
    label: string;
    icon: React.ReactNode;
    defaultView: string;
    permission: Permission;
}

const modules: ModuleConfig[] = [
    { key: 'stock', label: 'Stock', icon: ICONS.vehicles, defaultView: 'vehicles', permission: PERMISSIONS.VIEW_VEHICLES },
    { key: 'sales', label: 'Sales', icon: ICONS.sell, defaultView: 'sell', permission: PERMISSIONS.SELL_VEHICLES },
    { key: 'accounting', label: 'Accounting', icon: ICONS.accounting, defaultView: 'accounting', permission: PERMISSIONS.VIEW_ACCOUNTING },
    { key: 'reports', label: 'Reports', icon: ICONS.reports, defaultView: 'all_costing', permission: PERMISSIONS.VIEW_REPORTS },
    { key: 'customers', label: 'Customers', icon: ICONS.customers, defaultView: 'customers', permission: PERMISSIONS.VIEW_CUSTOMERS },
    { key: 'setup', label: 'Setup', icon: ICONS.setup, defaultView: 'vendors', permission: PERMISSIONS.MANAGE_SETUP },
];

interface MainSidebarProps {
    activeModule: ModuleKey;
    setActiveModule: (module: ModuleKey) => void;
    setView: (view: string) => void;
}

export const MainSidebar: React.FC<MainSidebarProps> = ({ activeModule, setActiveModule, setView }) => {
    const { hasPermission } = useAuth();
    
    const handleModuleClick = (module: ModuleConfig) => {
        setActiveModule(module.key);
        setView(module.defaultView);
    };

    const accessibleModules = modules.filter(m => hasPermission(m.permission));

    return (
        <nav className="w-20 bg-secondary border-r border-primary p-2 flex flex-col items-center gap-2">
            <button
                onClick={() => {
                  setActiveModule('stock'); // Or a dedicated 'home' module
                  setView('dashboard');
                }}
                title="Dashboard"
                className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg transition-colors duration-200
                    ${activeModule === 'stock' && 'bg-accent/20 text-accent'}
                `}
            >
                <div className="w-8 h-8">{ICONS.dashboard}</div>
                <span className="text-xs font-bold mt-1">Home</span>
            </button>
            <div className='w-full border-t border-primary my-1'></div>
            {accessibleModules.map(module => (
                <button
                    key={module.key}
                    onClick={() => handleModuleClick(module)}
                    title={module.label}
                    className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg transition-colors duration-200
                        ${activeModule === module.key ? 'bg-accent/20 text-accent' : 'text-secondary hover:bg-tertiary/50'}
                    `}
                >
                    <div className="w-8 h-8">{module.icon}</div>
                    <span className="text-xs font-bold mt-1">{module.label}</span>
                </button>
            ))}
        </nav>
    );
};

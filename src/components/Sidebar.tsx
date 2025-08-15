import React from 'react';
import { ICONS } from '../constants/icons';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Permission, PERMISSIONS } from '../constants/permissions';

export type ModuleKey = 'stock' | 'sales' | 'accounting' | 'reports' | 'customers' | 'setup' | 'dashboard' | 'adminPanel';

interface BaseModuleConfig {
    key: ModuleKey;
    icon: React.ReactNode;
    defaultView: string;
    permission: Permission;
}

const baseModules: BaseModuleConfig[] = [
    { key: 'stock', icon: ICONS.vehicles, defaultView: 'stock_dashboard', permission: PERMISSIONS.VIEW_VEHICLES },
    { key: 'sales', icon: ICONS.sell, defaultView: 'sell', permission: PERMISSIONS.SELL_VEHICLES },
    { key: 'accounting', icon: ICONS.accounting, defaultView: 'accounting', permission: PERMISSIONS.VIEW_ACCOUNTING },
    { key: 'reports', icon: ICONS.reports, defaultView: 'all_costing', permission: PERMISSIONS.VIEW_REPORTS },
    { key: 'customers', icon: ICONS.customers, defaultView: 'customers', permission: PERMISSIONS.VIEW_CUSTOMERS },
    { key: 'setup', icon: ICONS.setup, defaultView: 'vendors', permission: PERMISSIONS.MANAGE_SETUP },
];

const adminModules: BaseModuleConfig[] = [
    { key: 'adminPanel', icon: ICONS.adminPanel, defaultView: 'admin_panel_dashboard', permission: PERMISSIONS.ACCESS_ADMIN_PANEL },
];

interface MainSidebarProps {
    activeModule: ModuleKey;
    setActiveModule: (module: ModuleKey) => void;
    setView: (view: string) => void;
}

export const MainSidebar: React.FC<MainSidebarProps> = ({ activeModule, setActiveModule, setView }) => {
    const { hasPermission } = useAuth();
    const { moduleConfig } = useData();
    
    const handleModuleClick = (module: BaseModuleConfig) => {
        setActiveModule(module.key);
        setView(module.defaultView);
    };

    const visibleModules = baseModules
        .map(baseModule => {
            const config = moduleConfig.find(mc => mc.key === baseModule.key);
            return { ...baseModule, label: config?.label || baseModule.key, visible: config?.visible ?? true };
        })
        .filter(m => hasPermission(m.permission) && m.visible);

    const accessibleAdminModules = adminModules.filter(m => hasPermission(m.permission));

    return (
        <nav className="w-20 bg-secondary border-r border-primary p-2 flex flex-col items-center gap-2">
            <button
                onClick={() => {
                  setActiveModule('dashboard');
                  setView('dashboard');
                }}
                title="Dashboard"
                className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg transition-colors duration-200
                    ${activeModule === 'dashboard' ? 'bg-accent/20 text-accent' : 'text-secondary hover:bg-tertiary/50'}
                `}
            >
                <div className="w-8 h-8">{ICONS.dashboard}</div>
                <span className="text-xs font-bold mt-1">Home</span>
            </button>
            <div className='w-full border-t border-primary my-1'></div>
            {visibleModules.map(module => (
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
            {accessibleAdminModules.length > 0 && <div className="mt-auto w-full border-t border-primary mb-1"></div>}
            {accessibleAdminModules.map(module => (
                 <button
                    key={module.key}
                    onClick={() => handleModuleClick(module)}
                    title="Admin Panel"
                    className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg transition-colors duration-200
                        ${activeModule === module.key ? 'bg-accent/20 text-accent' : 'text-secondary hover:bg-tertiary/50'}
                    `}
                >
                    <div className="w-8 h-8">{module.icon}</div>
                    <span className="text-xs font-bold mt-1">Admin</span>
                </button>
            ))}
        </nav>
    );
};

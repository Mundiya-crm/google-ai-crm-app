import React from 'react';
import { ICONS } from '../constants/icons';

interface AdminPanelDashboardProps {
    setView: (view: string) => void;
}

const AdminCard: React.FC<{ title: string; description: string; icon: React.ReactNode; onClick?: () => void; disabled?: boolean; }> = ({ title, description, icon, onClick, disabled }) => {
    const isClickable = !!onClick && !disabled;
    const content = (
        <>
            <div className="w-10 h-10 flex-shrink-0">{icon}</div>
            <div>
                <h3 className="font-bold text-primary text-base">{title}</h3>
                <p className="text-sm text-secondary mt-1">{description}</p>
            </div>
        </>
    );

    if (isClickable) {
        return (
            <button 
                onClick={onClick}
                className="p-4 bg-primary rounded-lg border border-secondary flex items-start gap-4 text-left w-full h-full transition-all duration-200 hover:border-accent hover:bg-tertiary/20 hover:-translate-y-1"
            >
                {content}
            </button>
        );
    }

    return (
        <div className={`p-4 bg-primary rounded-lg border border-secondary flex items-start gap-4 ${disabled ? 'opacity-50' : ''}`}>
            {content}
        </div>
    );
};

export const AdminPanelDashboard: React.FC<AdminPanelDashboardProps> = ({ setView }) => {
    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="border-b border-primary/50 pb-4 mb-6">
                <h1 className="text-3xl font-bold text-primary">Super Admin Panel</h1>
                <p className="text-secondary mt-1">Central control hub for managing the entire CRM application.</p>
            </div>

            <div className="flex-grow overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AdminCard 
                        title="User Management" 
                        description="Create, edit, and delete users and assign their roles." 
                        icon={ICONS.usersSetup}
                        onClick={() => setView('user_management')}
                    />
                    <AdminCard 
                        title="Role & Permission Editor" 
                        description="Define roles and manage what actions each role can perform." 
                        icon={ICONS.permissions}
                        onClick={() => setView('role_permission_editor')}
                    />
                    <AdminCard 
                        title="Module Manager" 
                        description="Enable, disable, or rename main application modules like Stock, Sales, and Accounting." 
                        icon={ICONS.moduleManager}
                        onClick={() => setView('module_manager')}
                    />
                    <AdminCard 
                        title="Feature Manager" 
                        description="Toggle specific optional features on or off across the application." 
                        icon={ICONS.featureManager}
                        onClick={() => setView('feature_manager')}
                    />
                    <AdminCard 
                        title="System Settings" 
                        description="Configure company details, financial settings, and application theme." 
                        icon={ICONS.systemSettings}
                        onClick={() => setView('system_settings')}
                    />
                    <AdminCard 
                        title="Activity Feed (Live Audit)" 
                        description="View a real-time log of all important actions taken by users in the system." 
                        icon={ICONS.activityFeed}
                        onClick={() => setView('activity_feed')}
                    />
                    <AdminCard 
                        title="Marketing & Integrations" 
                        description="Manage connections to WhatsApp, Facebook, and Google Business Profile." 
                        icon={ICONS.marketing}
                        onClick={() => setView('marketing_integrations')}
                    />
                    <AdminCard 
                        title="Data Sync Center" 
                        description="Control synchronization with your public website and accounting software." 
                        icon={ICONS.syncCenter}
                        onClick={() => setView('sync_center')}
                    />
                     <AdminCard 
                        title="System Health Monitor" 
                        description="Check the real-time status of core application services like the API and database." 
                        icon={ICONS.systemHealth}
                        onClick={() => setView('system_health')}
                    />
                    <AdminCard
                        title="Project Roadmap & Architecture"
                        description="View the development roadmap, system architecture, and release workflow."
                        icon={ICONS.projectRoadmap}
                        onClick={() => setView('project_roadmap')}
                    />
                </div>
            </div>
        </div>
    );
};

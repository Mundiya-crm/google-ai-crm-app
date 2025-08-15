import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ClearingAgentDashboard } from './ClearingAgentDashboard';
import { ICONS } from '../constants/icons';

const PortalHeader: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <header className="flex justify-between items-center h-header px-4 bg-header border-b border-primary no-print">
      <div className="flex items-center gap-4">
         <div className="w-8 h-8">{ICONS.clearing}</div>
        <h1 className="font-bold text-primary">Clearing Agent Portal</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-semibold text-secondary">Welcome, {user?.name}</span>
        <button 
            onClick={logout} 
            className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-btn hover:bg-red-700 transition-colors">
            Logout
        </button>
      </div>
    </header>
  );
};

export const ClearingAgentPortal: React.FC = () => {
    return (
        <div className="h-screen flex flex-col font-sans bg-primary text-primary">
            <PortalHeader />
            <main className="flex-1 p-4 bg-primary overflow-hidden">
                <ClearingAgentDashboard />
            </main>
        </div>
    );
};
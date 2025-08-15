
import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { NotificationPanel } from './NotificationPanel';
import { ICONS } from '../constants/icons';

interface HeaderProps {
    onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { notifications } = useData();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  return (
    <header className="flex justify-between items-center h-header px-4 bg-header border-b border-primary no-print">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="lg:hidden p-1 text-primary" aria-label="Open sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
        <h1 className="font-bold text-primary">Mundiya International CRM</h1>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <button 
            onClick={() => setIsPanelOpen(prev => !prev)}
            className="relative p-2 rounded-full hover:bg-tertiary/50"
            aria-label={`Notifications (${unreadCount} unread)`}
          >
            <div className="w-6 h-6 text-secondary">{ICONS.notification}</div>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-600 text-white text-[10px] font-bold ring-2 ring-header animate-badge-pop-in">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          {isPanelOpen && <NotificationPanel onClose={() => setIsPanelOpen(false)} />}
        </div>
        {user && (
          <button 
            onClick={logout} 
            className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-btn hover:bg-red-700 transition-colors">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};
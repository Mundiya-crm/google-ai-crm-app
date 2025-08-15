
import React, { useState, useMemo } from 'react';
import { useData } from '../src/context/DataContext';
import { Notification, NotificationCategory } from '../src/constants/notificationData';
import { ICONS } from '../src/constants/icons';

interface NotificationPanelProps {
    onClose: () => void;
}

type CategoryTab = 'ALL' | 'ETA' | 'HP_INSTALLMENT_DUE' | 'RECURRING_EXPENSE_DUE';

const categoryConfig = {
    'ETA': { icon: ICONS.etaAlert, label: 'ETA Alerts', color: 'bg-blue-500' },
    'HP_INSTALLMENT_DUE': { icon: ICONS.hpInstallment, label: 'Installments', color: 'bg-orange-500' },
    'PAYMENT_DUE': { icon: ICONS.paymentDue, label: 'Payments', color: 'bg-red-500' },
    'RECURRING_EXPENSE_DUE': { icon: ICONS.scheduledExpense, label: 'Scheduled', color: 'bg-indigo-500' },
    'GENERAL': { icon: ICONS.notification, label: 'General', color: 'bg-gray-500' }
};

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
    const { notifications, setNotifications } = useData();
    const [activeTab, setActiveTab] = useState<CategoryTab>('ALL');

    const filteredNotifications = useMemo(() => {
        if (activeTab === 'ALL') return notifications;
        return notifications.filter(n => n.category === activeTab);
    }, [notifications, activeTab]);

    const handleMarkAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };
    
    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };
    
    const handleNotificationClick = (notification: Notification) => {
        handleMarkAsRead(notification.id);
        // Here you would implement navigation logic, e.g., using setView from a higher context
        // For now, it will just mark as read.
        console.log(`Navigate to entity: ${notification.entityId}`);
        onClose();
    };

    const tabs: { key: CategoryTab, label: string }[] = [
        { key: 'ALL', label: 'All' },
        { key: 'ETA', label: 'ETA' },
        { key: 'HP_INSTALLMENT_DUE', label: 'Installments' },
        { key: 'RECURRING_EXPENSE_DUE', label: 'Scheduled' },
    ];

    return (
        <div 
            className="absolute top-full right-0 mt-2 w-80 max-w-sm bg-secondary border border-primary rounded-lg shadow-2xl z-50 flex flex-col max-h-[80vh]"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex justify-between items-center p-3 border-b border-primary">
                <h3 className="font-bold text-primary">Notifications</h3>
                <button onClick={handleMarkAllAsRead} className="text-xs text-accent hover:underline" disabled={notifications.every(n => n.isRead)}>
                    Mark all as read
                </button>
            </div>

            <div className="p-2 border-b border-primary">
                <div className="flex gap-1 bg-tertiary p-1 rounded-md">
                    {tabs.map(tab => (
                        <button 
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 text-xs font-semibold py-1 rounded-md transition-colors ${
                                activeTab === tab.key ? 'bg-accent text-accent-inverted' : 'text-secondary hover:bg-tertiary/50'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-grow overflow-y-auto">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map(notification => {
                        const config = categoryConfig[notification.category];
                        return (
                            <div 
                                key={notification.id}
                                className={`flex items-start gap-3 p-3 border-b border-primary/50 cursor-pointer hover:bg-tertiary/50 ${!notification.isRead ? 'bg-accent/10' : ''}`}
                                onClick={() => handleNotificationClick(notification)}
                            >
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center p-1.5 ${config.color}`}>
                                    {config.icon}
                                </div>
                                <div className="flex-grow">
                                    <p className="text-xs text-primary leading-snug">{notification.message}</p>
                                    <p className="text-[10px] text-secondary mt-1">Due: {notification.dueDate}</p>
                                </div>
                                {!notification.isRead && <div className="w-2 h-2 bg-accent rounded-full mt-1 flex-shrink-0"></div>}
                            </div>
                        )
                    })
                ) : (
                    <p className="text-center text-sm text-secondary p-8">No notifications here.</p>
                )}
            </div>
        </div>
    );
};

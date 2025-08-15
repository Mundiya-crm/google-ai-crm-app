
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { AuditLog } from '../constants/dataTypes';

export const useLogger = () => {
    const { setAuditLogs } = useData();
    const { user } = useAuth();

    const logActivity = (action: string, details: string, entityType?: AuditLog['entityType'], entityId?: AuditLog['entityId']) => {
        if (!user) return;

        const newLog: AuditLog = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            userName: user.name,
            userId: user.id,
            action,
            details,
            entityType,
            entityId,
        };
        
        // Add to the beginning of the array and keep the last 200 logs to prevent unbounded growth
        setAuditLogs(prev => [newLog, ...prev].slice(0, 200));
    };

    return { logActivity };
};

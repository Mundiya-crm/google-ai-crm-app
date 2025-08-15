
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { AuditLog } from '../constants/dataTypes';
import { ICONS } from '../constants/icons';

const actionIcons: Record<string, React.ReactNode> = {
    'VEHICLE': ICONS.vehicles,
    'USER': ICONS.usersSetup,
    'SALE': ICONS.sell,
    'PERMISSIONS': ICONS.permissions,
    'PROVIDER': ICONS.vendors,
};

const getIconForAction = (action: string) => {
    if (action.includes('VEHICLE')) return actionIcons['VEHICLE'];
    if (action.includes('USER')) return actionIcons['USER'];
    if (action.includes('SALE')) return actionIcons['SALE'];
    if (action.includes('PERMISSIONS')) return actionIcons['PERMISSIONS'];
    if (action.includes('PROVIDER')) return actionIcons['PROVIDER'];
    return ICONS.reports;
};

export const ActivityFeedView: React.FC<{ setView: (view: string, query?: any) => void }> = ({ setView }) => {
    const { auditLogs, users } = useData();
    const [selectedUserId, setSelectedUserId] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredLogs = useMemo(() => {
        return auditLogs.filter(log => {
            if (selectedUserId !== 'all' && log.userId !== parseInt(selectedUserId, 10)) {
                return false;
            }
            const logDate = new Date(log.timestamp);
            if (startDate && logDate < new Date(startDate)) {
                return false;
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999); // Include the whole day
                if (logDate > end) return false;
            }
            return true;
        });
    }, [auditLogs, selectedUserId, startDate, endDate]);

    return (
        <div className="bg-secondary p-4 rounded-lg border border-primary shadow-lg h-full flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">Activity Feed</h2>
                <button onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs">&larr; Back to Admin Panel</button>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-end p-2 bg-primary rounded-md">
                <div>
                    <label className="text-xs text-secondary block mb-1">Filter by User</label>
                    <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className="w-48 text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50">
                        <option value="all">All Users</option>
                        {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-xs text-secondary block mb-1">Start Date</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-40 text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50"/>
                </div>
                <div>
                    <label className="text-xs text-secondary block mb-1">End Date</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-40 text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50"/>
                </div>
            </div>

            {/* Log List */}
            <div className="flex-grow overflow-y-auto pr-2">
                <div className="relative pl-5">
                    {/* Timeline bar */}
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-tertiary/50"></div>
                    
                    {filteredLogs.length > 0 ? (
                        filteredLogs.map(log => (
                            <div key={log.id} className="relative flex items-start gap-4 mb-4">
                                <div className="absolute left-0 top-1 w-10 h-10 -translate-x-1/2 bg-primary flex items-center justify-center rounded-full border-4 border-secondary p-1">
                                    {getIconForAction(log.action)}
                                </div>
                                <div className="ml-8 w-full bg-primary p-3 rounded-md border border-secondary/50">
                                    <p className="text-sm text-primary">
                                        <span className="font-bold">{log.userName}</span> {log.details}
                                    </p>
                                    <p className="text-xs text-secondary mt-1">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 text-secondary">
                            <p className="font-semibold">No activity found.</p>
                            <p className="text-sm">Try adjusting your filters or check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

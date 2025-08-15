import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { Alert } from '../constants/dataTypes';
import { ICONS } from '../constants/icons';
import { computeAlerts } from '../api/mockApi';

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => {
    const priorityClasses = {
        High: 'border-l-4 border-red-500 bg-red-900/20',
        Medium: 'border-l-4 border-yellow-500 bg-yellow-900/20',
        Low: 'border-l-4 border-blue-500 bg-blue-900/20',
    };

    return (
        <div className={`p-3 rounded-md ${priorityClasses[alert.priority]}`}>
            <p className="font-semibold text-primary text-sm">{alert.title}</p>
            <p className="text-xs text-secondary">{alert.description}</p>
        </div>
    );
};

export const PredictiveAlertsWidget: React.FC = () => {
    const { alerts, setAlerts } = useData();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(true);

    const fetchAlerts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const newAlerts: Alert[] = await computeAlerts();
            setAlerts(newAlerts);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch alerts.');
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (alerts.length === 0) {
            fetchAlerts();
        }
    }, []);

    return (
        <div className="bg-secondary rounded-lg border border-primary/50 shadow-lg transition-all duration-300">
            <button 
                className="w-full flex justify-between items-center p-3 text-left"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-controls="predictive-alerts-content"
            >
                <div className="flex items-center gap-2">
                     <div className="w-6 h-6 text-accent flex-shrink-0">{ICONS.predictiveAlerts}</div>
                     <h3 className="text-base font-bold text-primary">Predictive Alerts</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={(e) => { e.stopPropagation(); fetchAlerts(); }} 
                        disabled={isLoading} 
                        className="btn-secondary text-xs px-2 py-1"
                    >
                        {isLoading ? '...' : 'Refresh'}
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-secondary transition-transform duration-300 ${isExpanded ? '' : '-rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            <div 
                id="predictive-alerts-content"
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-60' : 'max-h-0'}`}
            >
                <div className="px-3 pb-3">
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1 border-t border-primary/50 pt-3">
                        {isLoading && alerts.length === 0 ? (
                             <p className="text-sm text-secondary text-center p-4">Generating insights...</p>
                        ) : error ? (
                            <p className="text-sm text-red-400 text-center p-4">{error}</p>
                        ) : alerts.length > 0 ? (
                            alerts.map(alert => <AlertItem key={alert.id} alert={alert} />)
                        ) : (
                            <p className="text-sm text-secondary text-center p-4">No strategic alerts at the moment. Check back later.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
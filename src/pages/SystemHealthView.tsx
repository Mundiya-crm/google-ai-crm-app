import React from 'react';

const StatusIndicator: React.FC<{ status: 'OK' | 'Degraded' | 'Down' }> = ({ status }) => {
    const statusConfig = {
        OK: { text: 'OK', color: 'bg-green-500' },
        Degraded: { text: 'Degraded', color: 'bg-yellow-500' },
        Down: { text: 'Down', color: 'bg-red-500' },
    };
    const config = statusConfig[status];
    return (
        <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
            <span className="font-semibold text-sm">{config.text}</span>
        </div>
    );
};

export const SystemHealthView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">System Health Monitor</h2>
                <button onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs">&larr; Back to Admin Panel</button>
            </div>
            <p className="text-sm text-secondary mb-4">
                Real-time status of the CRM's core services. All services should be 'OK'.
            </p>

            <div className="flex-grow overflow-y-auto pr-2">
                <div className="space-y-3 max-w-md mx-auto">
                    <div className="p-4 bg-primary rounded-md border border-secondary flex items-center justify-between">
                        <h4 className="font-semibold text-primary">CRM Core API</h4>
                        <StatusIndicator status="OK" />
                    </div>
                    <div className="p-4 bg-primary rounded-md border border-secondary flex items-center justify-between">
                        <h4 className="font-semibold text-primary">Database Service</h4>
                        <StatusIndicator status="OK" />
                    </div>
                    <div className="p-4 bg-primary rounded-md border border-secondary flex items-center justify-between">
                        <h4 className="font-semibold text-primary">AI Services (Gemini)</h4>
                        <StatusIndicator status="OK" />
                    </div>
                    <div className="p-4 bg-primary rounded-md border border-secondary flex items-center justify-between">
                        <h4 className="font-semibold text-primary">File Storage</h4>
                        <StatusIndicator status="OK" />
                    </div>
                </div>
            </div>
        </div>
    );
};

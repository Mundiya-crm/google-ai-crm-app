import React, { useState } from 'react';

export const ApiTesterView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const [endpoint, setEndpoint] = useState('/api/vehicles');
    const [response, setResponse] = useState('// API response will be shown here');

    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">API Tester</h2>
                <button onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs">&larr; Back to Admin Panel</button>
            </div>
            
            <div className="flex-grow flex flex-col gap-4 overflow-hidden">
                <div className="flex items-center gap-2">
                    <select className="p-2 border border-secondary rounded-l-btn bg-tertiary/50">
                        <option>GET</option>
                    </select>
                    <input 
                        type="text"
                        value={endpoint}
                        onChange={e => setEndpoint(e.target.value)}
                        className="flex-grow p-2 border-t border-b border-secondary bg-tertiary/50"
                        placeholder="/api/..."
                    />
                    <button className="btn-primary rounded-l-none">Send Request</button>
                </div>
                
                <div className="flex-grow bg-primary p-2 border border-secondary rounded-md overflow-hidden">
                    <pre className="text-xs text-secondary h-full overflow-auto">
                        <code>{response}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

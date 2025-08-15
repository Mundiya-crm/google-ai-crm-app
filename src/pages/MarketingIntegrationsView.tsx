import React from 'react';

const IntegrationCard: React.FC<{ title: string; description: string; connected: boolean; }> = ({ title, description, connected }) => (
    <div className="bg-primary border border-secondary p-4 rounded-lg flex items-center justify-between">
        <div>
            <h3 className="text-base font-semibold text-primary">{title}</h3>
            <p className="text-xs text-secondary mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-4">
            <div className={`text-xs font-bold px-2 py-1 rounded-full ${connected ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'}`}>
                {connected ? 'Connected' : 'Not Connected'}
            </div>
            <button className="btn-secondary text-sm">{connected ? 'Manage' : 'Connect'}</button>
        </div>
    </div>
);


export const MarketingIntegrationsView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">Marketing & Integrations</h2>
                <button onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs">&larr; Back to Admin Panel</button>
            </div>
             <p className="text-sm text-secondary mb-4">
                Connect your CRM to external marketing platforms to streamline your sales and advertising efforts.
            </p>

            <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                <IntegrationCard 
                    title="WhatsApp Business API"
                    description="Send automated messages and manage conversations directly from the CRM."
                    connected={false}
                />
                <IntegrationCard 
                    title="Facebook Page"
                    description="Automatically post new vehicle listings to your Facebook business page."
                    connected={true}
                />
                <IntegrationCard 
                    title="Google Business Profile"
                    description="Keep your vehicle inventory on your Google Business Profile up-to-date."
                    connected={false}
                />
            </div>
        </div>
    );
};


import React, { useState, useMemo } from 'react';
import { TrackingCompany } from '../constants/trackerAgentsData';
import { ICONS } from '../constants/icons';
import { useData } from '../context/DataContext';

interface TrackerAgentListViewProps {
    setView: (view: string, queryParams?: Record<string, any>) => void;
}

export const TrackerAgentListView: React.FC<TrackerAgentListViewProps> = ({ setView }) => {
    const { trackingCompanies: companies } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCompanies = useMemo(() => {
        if (!searchTerm) return companies;
        return companies.filter(company =>
            Object.values(company).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, companies]);

    const handleWhatsApp = (phone?: string) => {
        if (phone) {
            const internationalPhone = phone.replace(/[^0-9]/g, '');
            window.open(`https://wa.me/${internationalPhone}`, '_blank');
        } else {
            alert('No WhatsApp number available for this company.');
        }
    };

    return (
        <div className="bg-content-secondary p-6 rounded-md border border-content-primary shadow-inner h-full flex flex-col">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-content-primary pb-3">
                <h2 className="text-2xl font-bold text-content-primary">Tracking Companies</h2>
                <button 
                    onClick={() => setView('add_tracker_agent')}
                    className="btn-primary"
                >
                    + Add New Company
                </button>
            </div>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, contact, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 text-sm px-3 py-2 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            <div className="overflow-x-auto flex-grow">
                <table className="min-w-full bg-content-tertiary/30 rounded-md shadow-inner">
                    <thead className="bg-content-header text-content-secondary">
                        <tr>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Company Name</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Contact Person</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Phone</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Email</th>
                            <th className="text-center py-2 px-3 text-xs font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-content-primary">
                        {filteredCompanies.map((company) => (
                            <tr key={company.id} className="text-xs border-b border-content-primary hover:bg-content-tertiary/50">
                                <td className="py-2 px-3 font-semibold">{company.name}</td>
                                <td className="py-2 px-3">{company.contactPerson || 'N/A'}</td>
                                <td className="py-2 px-3 font-mono">{company.phone || 'N/A'}</td>
                                <td className="py-2 px-3">{company.email || 'N/A'}</td>
                                <td className="py-2 px-3">
                                    <div className="flex items-center justify-center gap-3">
                                        <a href={`mailto:${company.email}`} title="Send Email" className="text-accent hover:brightness-125">{ICONS.email}</a>
                                        <button onClick={() => handleWhatsApp(company.whatsapp || company.phone)} title="Send WhatsApp Message" className="text-accent hover:brightness-125">{ICONS.whatsapp}</button>
                                        <button onClick={() => setView('tracker_ledger', { accountCode: company.apAccountCode, companyName: company.name })} className="text-purple-400 hover:underline font-semibold text-xs">Ledger</button>
                                        <button onClick={() => alert('Editing coming soon!')} className="text-content-secondary hover:underline font-semibold text-xs">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredCompanies.length === 0 && (
                    <div className="text-center py-10 text-content-secondary">
                        No companies found. Add a company to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

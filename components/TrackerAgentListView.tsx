
import React, { useState, useMemo } from 'react';
import { TrackingCompany } from '../src/constants/trackerAgentsData';
import { ICONS } from '../src/constants/icons';
import { useData } from '../src/context/DataContext';

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
        <div className="bg-slate-800 p-6 rounded-md border border-slate-700/80 shadow-inner h-full flex flex-col">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-slate-600 pb-3">
                <h2 className="text-2xl font-bold text-slate-100">Tracking Companies</h2>
                <button 
                    onClick={() => setView('add_tracker_agent')}
                    className="px-4 py-1.5 bg-green-600 text-white text-sm font-bold rounded-md hover:bg-green-700 transition-colors shadow-sm"
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
                    className="w-full md:w-1/2 text-sm px-3 py-2 border border-slate-600 rounded-sm bg-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="overflow-x-auto flex-grow">
                <table className="min-w-full bg-slate-900/50 rounded-md shadow-inner">
                    <thead className="bg-slate-700 text-slate-200">
                        <tr>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Company Name</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Contact Person</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Phone</th>
                            <th className="text-left py-2 px-3 text-xs font-semibold">Email</th>
                            <th className="text-center py-2 px-3 text-xs font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-300">
                        {filteredCompanies.map((company, index) => (
                            <tr key={company.id} className={`${index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-900/20'} hover:bg-slate-700/50 text-xs`}>
                                <td className="py-2 px-3 border-b border-slate-700 font-semibold">{company.name}</td>
                                <td className="py-2 px-3 border-b border-slate-700">{company.contactPerson || 'N/A'}</td>
                                <td className="py-2 px-3 border-b border-slate-700 font-mono">{company.phone || 'N/A'}</td>
                                <td className="py-2 px-3 border-b border-slate-700">{company.email || 'N/A'}</td>
                                <td className="py-2 px-3 border-b border-slate-700">
                                    <div className="flex items-center justify-center gap-3">
                                        <a href={`mailto:${company.email}`} title="Send Email" className="text-blue-400 hover:text-blue-300">{ICONS.email}</a>
                                        <button onClick={() => handleWhatsApp(company.whatsapp || company.phone)} title="Send WhatsApp Message" className="text-green-400 hover:text-green-300">{ICONS.whatsapp}</button>
                                        <button onClick={() => setView('tracker_ledger', { accountCode: company.apAccountCode, companyName: company.name })} className="text-purple-400 hover:underline font-semibold text-xs">Ledger</button>
                                        <button onClick={() => alert('Editing coming soon!')} className="text-slate-400 hover:underline font-semibold">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredCompanies.length === 0 && (
                    <div className="text-center py-10 text-slate-500">
                        No companies found. Add a company to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

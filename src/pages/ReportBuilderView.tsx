import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export const ReportBuilderView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const { vehicles } = useData();
    const [dataSource, setDataSource] = useState('vehicles');

    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">Custom Report Builder</h2>
                <button onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs">&larr; Back to Admin Panel</button>
            </div>
            
            <div className="flex-grow flex flex-col lg:flex-row gap-4 overflow-hidden">
                {/* Controls */}
                <div className="lg:w-1/4 bg-primary p-4 rounded-md border border-secondary flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-semibold text-secondary">1. Select Data Source</label>
                        <select value={dataSource} onChange={e => setDataSource(e.target.value)} className="w-full mt-1 text-sm p-2 border border-secondary rounded-btn bg-tertiary/50">
                            <option value="vehicles">Vehicles</option>
                            <option value="sales" disabled>Sales (coming soon)</option>
                            <option value="customers" disabled>Customers (coming soon)</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-secondary">2. Select Columns</label>
                        <div className="mt-1 p-2 border border-secondary rounded-btn bg-tertiary/50 h-32 overflow-y-auto">
                            {/* Placeholder for column selection */}
                            <p className="text-xs text-secondary">Column selection will appear here.</p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-secondary">3. Add Filters</label>
                         <div className="mt-1 p-2 border border-secondary rounded-btn bg-tertiary/50">
                            <p className="text-xs text-secondary">Filtering options will be available here.</p>
                        </div>
                    </div>
                     <button className="btn-primary mt-auto">Generate Report</button>
                </div>

                {/* Results */}
                <div className="lg:w-3/4 bg-primary p-4 rounded-md border border-secondary flex flex-col">
                     <h3 className="font-semibold text-primary mb-2">Report Preview</h3>
                     <div className="flex-grow overflow-auto border border-secondary rounded-md">
                        <table className="min-w-full text-sm">
                            <thead className="bg-tertiary/50">
                                <tr>
                                    <th className="p-2 text-left">Stock #</th>
                                    <th className="p-2 text-left">Make</th>
                                    <th className="p-2 text-left">Model</th>
                                    <th className="p-2 text-left">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Placeholder for report rows */}
                                {vehicles.slice(0, 5).map(v => (
                                    <tr key={v.id} className="border-t border-secondary">
                                        <td className="p-2">{v.stockNumber}</td>
                                        <td className="p-2">{v.make}</td>
                                        <td className="p-2">{v.model}</td>
                                        <td className="p-2">{v.year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                </div>
            </div>
        </div>
    );
};


import React, { useState, useMemo, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Vehicle } from '../constants/vehicleData';
import { formatDate, formatCurrency } from '../utils/formatters';
import { calculateTotalCost } from '../utils/vehicleHelper';
import { ICONS } from '../constants/icons';
import { ImageGalleryModal } from '../components/ImageGalleryModal';
import { BulkEditModal } from '../components/BulkEditModal';
import { ColumnSelectionModal } from '../components/ColumnSelectionModal';
import { vehicleMakes, vehicleLocations } from '../constants/vehicleOptions';
import { VehicleStatus } from '../constants/vehicleData';

const ITEMS_PER_PAGE = 15;

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const baseClasses = "text-xs font-bold px-2 py-0.5 rounded-full";
    const statusClasses = {
        'Available': "bg-green-200 text-green-800",
        'Sold': "bg-red-200 text-red-800",
        'Reserved': "bg-yellow-200 text-yellow-800",
        'On Way': "bg-blue-200 text-blue-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-200 text-gray-800'}`}>{status}</span>;
};

const LocationBadge: React.FC<{ location: string }> = ({ location }) => {
    const baseClasses = "text-xs font-semibold px-2 py-0.5 rounded-full";
    const locationClasses = {
        'Showroom': "bg-purple-200 text-purple-800",
        'Yard': "bg-orange-200 text-orange-800",
        'Port': "bg-cyan-200 text-cyan-800",
        'On Way': "bg-blue-200 text-blue-800",
        'Japan': "bg-pink-200 text-pink-800",
    };
    return <span className={`${baseClasses} ${locationClasses[location as keyof typeof locationClasses] || 'bg-gray-200 text-gray-800'}`}>{location}</span>;
};

const SortableHeader: React.FC<{ label: string; sortKey: string; sortConfig: { key: string; direction: string; }; setSortConfig: Function; }> = ({ label, sortKey, sortConfig, setSortConfig }) => {
    const isSorted = sortConfig.key === sortKey;
    const directionIcon = sortConfig.direction === 'ascending' ? '▲' : '▼';

    const handleSort = () => {
        let direction = 'ascending';
        if (isSorted && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key: sortKey, direction });
    };

    return (
        <th className="text-center p-5 text-xs font-semibold cursor-pointer select-none hover:bg-tertiary" onClick={handleSort}>
            {label} {isSorted && <span className="text-accent">{directionIcon}</span>}
        </th>
    );
};

interface VehicleListViewProps {
    setView: (view: string, params?: any) => void;
    filter: 'all' | 'local' | 'import';
    supplierId?: string;
}

const initialFilters = {
    status: 'all',
    location: 'all',
    make: 'all'
};

export const VehicleListView: React.FC<VehicleListViewProps> = ({ setView, filter, supplierId }) => {
    const { vehicles, setVehicles, suppliers } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: 'purchaseDate', direction: 'descending' });
    const [selectedVehicles, setSelectedVehicles] = useState<number[]>([]);
    const [galleryInfo, setGalleryInfo] = useState<{ images: string[], chassis: string, supplier: string } | null>(null);
    const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [advFilters, setAdvFilters] = useState(initialFilters);

    useEffect(() => {
        setCurrentPage(1); // Reset page when filter changes
        setSelectedVehicles([]);
    }, [filter, searchTerm, supplierId, advFilters]);

    const supplierMap = useMemo(() => new Map(suppliers.map(s => [s.id, s.name])), [suppliers]);

    const salespersonMap = useMemo(() => {
        const map = new Map<string, string>();
        suppliers.forEach(supplier => {
            supplier.salespersons.forEach(sp => {
                map.set(sp.id, sp.name);
            });
        });
        return map;
    }, [suppliers]);

    const filteredVehicles = useMemo(() => {
        let filtered = vehicles;

        if (supplierId) {
            filtered = filtered.filter(v => v.supplierId === supplierId);
        }
        
        if (filter !== 'all') {
            filtered = filtered.filter(v => v.purchaseType === filter);
        }

        if (advFilters.status !== 'all') {
            filtered = filtered.filter(v => v.status === advFilters.status);
        }
        if (advFilters.location !== 'all') {
            filtered = filtered.filter(v => v.location === advFilters.location);
        }
        if (advFilters.make !== 'all') {
            filtered = filtered.filter(v => v.make === advFilters.make);
        }

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(v =>
                v.chassisNumber.toLowerCase().includes(lowercasedTerm) ||
                v.stockNumber.toLowerCase().includes(lowercasedTerm) ||
                v.make.toLowerCase().includes(lowercasedTerm) ||
                v.model.toLowerCase().includes(lowercasedTerm)
            );
        }

        return filtered;
    }, [vehicles, filter, searchTerm, supplierId, advFilters]);

    const sortedVehicles = useMemo(() => {
        const sortableItems = [...filteredVehicles];
        sortableItems.sort((a, b) => {
            const aVal = (a as any)[sortConfig.key];
            const bVal = (b as any)[sortConfig.key];

            if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
        return sortableItems;
    }, [filteredVehicles, sortConfig]);

    const paginatedVehicles = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedVehicles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [sortedVehicles, currentPage]);
    
    const totalPages = Math.ceil(sortedVehicles.length / ITEMS_PER_PAGE);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedVehicles(e.target.checked ? paginatedVehicles.map(v => v.id) : []);
    };
    
    const handleSelectOne = (id: number, checked: boolean) => {
        setSelectedVehicles(prev => checked ? [...prev, id] : prev.filter(vId => vId !== id));
    };

    const handleDeleteSingle = (vehicleToDelete: Vehicle) => {
        if (window.confirm(`Are you sure you want to delete ${vehicleToDelete.make} ${vehicleToDelete.model} (${vehicleToDelete.chassisNumber})? This action cannot be undone.`)) {
            setVehicles(prev => prev.filter(v => v.id !== vehicleToDelete.id));
        }
    };

    const handleDeleteSelected = () => {
        if (window.confirm(`Are you sure you want to delete ${selectedVehicles.length} vehicle(s)? This action cannot be undone.`)) {
            setVehicles(prev => prev.filter(v => !selectedVehicles.includes(v.id)));
            setSelectedVehicles([]);
        }
    };
    
    const handleBulkEditSave = (field: string, value: any) => {
        setVehicles(prev => prev.map(v => 
            selectedVehicles.includes(v.id) ? { ...v, [field]: value } : v
        ));
        setIsBulkEditOpen(false);
        setSelectedVehicles([]);
    };

    const resetFilters = () => setAdvFilters(initialFilters);
    const areFiltersActive = advFilters.status !== 'all' || advFilters.location !== 'all' || advFilters.make !== 'all';

    const isAllSelectedOnPage = paginatedVehicles.length > 0 && selectedVehicles.length > 0 && paginatedVehicles.every(v => selectedVehicles.includes(v.id));

    const pageTitle = useMemo(() => {
        const supplierName = supplierId ? supplierMap.get(supplierId) : null;
        const filterName = filter.charAt(0).toUpperCase() + filter.slice(1);
        
        if (supplierName) {
            return `${supplierName} - ${filterName} Stock`;
        }
        return `${filterName} Stock`;
    }, [filter, supplierId, supplierMap]);


    return (
        <div className="bg-secondary p-4 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            {galleryInfo && <ImageGalleryModal images={galleryInfo.images} chassisNumber={galleryInfo.chassis} supplierName={galleryInfo.supplier} onClose={() => setGalleryInfo(null)} />}
            {isBulkEditOpen && <BulkEditModal vehicleCount={selectedVehicles.length} onSave={handleBulkEditSave} onClose={() => setIsBulkEditOpen(false)} />}
            {isExportModalOpen && <ColumnSelectionModal allVehicles={vehicles} onClose={() => setIsExportModalOpen(false)} />}

            {/* Header and Actions */}
            <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                 <div className="flex items-center gap-4">
                    {supplierId && (
                        <button onClick={() => setView('stock_dashboard', { filter: filter })} className="btn-secondary text-sm">&larr; Back to Suppliers</button>
                    )}
                    <h2 className="text-2xl font-bold text-primary capitalize">
                       {pageTitle} ({filteredVehicles.length})
                    </h2>
                 </div>
                 <div className="flex items-center gap-2 relative z-30">
                    <div className="relative dropdown-container">
                        <button className="btn-primary text-sm px-3 py-1.5 flex items-center gap-1">Add New ▼</button>
                        <div className="dropdown-menu absolute hidden bg-secondary border border-primary rounded-md shadow-lg mt-1 right-0 w-48 z-20">
                            <button onClick={() => setView('add_vehicle', { type: 'import' })} className="block w-full text-left px-3 py-2 text-sm hover:bg-tertiary">Single Import Vehicle</button>
                            <button onClick={() => setView('add_vehicle', { type: 'local' })} className="block w-full text-left px-3 py-2 text-sm hover:bg-tertiary">Single Local Purchase</button>
                            <div className="border-t border-primary my-1"></div>
                            <button onClick={() => setView('import_data')} className="block w-full text-left px-3 py-2 text-sm hover:bg-tertiary">Bulk Import Wizard</button>
                        </div>
                    </div>
                     <button onClick={() => setIsExportModalOpen(true)} className="btn-secondary text-sm px-3 py-1.5">Export to Excel</button>
                </div>
            </div>

            {/* Search, Filters and Bulk Actions */}
             <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
                 <input
                    type="text"
                    placeholder="Search by make, model, chassis, stock#..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md text-sm px-3 py-1.5 border border-secondary rounded-btn bg-tertiary/50 text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                />
                {selectedVehicles.length > 0 && (
                    <div className="flex items-center gap-2 animate-fade-in">
                        <span className="text-sm font-semibold">{selectedVehicles.length} selected</span>
                        <button onClick={() => setIsBulkEditOpen(true)} className="btn-secondary text-xs px-2 py-1">Bulk Edit</button>
                        <button onClick={handleDeleteSelected} className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-btn hover:bg-red-700">Delete</button>
                    </div>
                )}
            </div>
            
            <div className="flex flex-wrap gap-2 items-end mb-4 p-2 bg-tertiary/20 rounded-md text-xs">
                <div className="flex-grow">
                    <label className="font-semibold text-secondary block mb-1">Status</label>
                    <select value={advFilters.status} onChange={e => setAdvFilters(f => ({...f, status: e.target.value}))} className="w-full py-1 px-2 rounded-btn bg-primary border-secondary border">
                        <option value="all">All Statuses</option>
                        {(['Available', 'Sold', 'Reserved', 'On Way'] as VehicleStatus[]).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="flex-grow">
                    <label className="font-semibold text-secondary block mb-1">Location</label>
                    <select value={advFilters.location} onChange={e => setAdvFilters(f => ({...f, location: e.target.value}))} className="w-full py-1 px-2 rounded-btn bg-primary border-secondary border">
                        <option value="all">All Locations</option>
                        {vehicleLocations.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>
                <div className="flex-grow">
                    <label className="font-semibold text-secondary block mb-1">Make</label>
                    <select value={advFilters.make} onChange={e => setAdvFilters(f => ({...f, make: e.target.value}))} className="w-full py-1 px-2 rounded-btn bg-primary border-secondary border">
                        <option value="all">All Makes</option>
                        {vehicleMakes.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                {areFiltersActive && <button onClick={resetFilters} className="btn-secondary px-3 py-1 text-xs self-end">Reset</button>}
            </div>


            {/* Table */}
            <div className="overflow-x-auto flex-grow">
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-primary z-10">
                        <tr>
                            <th className="p-5 w-4"><input type="checkbox" checked={isAllSelectedOnPage} onChange={handleSelectAll} className="h-4 w-4 rounded bg-tertiary border-primary text-accent focus:ring-accent"/></th>
                            <SortableHeader label="Stock" sortKey="stockNumber" sortConfig={sortConfig} setSortConfig={setSortConfig} />
                            <SortableHeader label="Make" sortKey="make" sortConfig={sortConfig} setSortConfig={setSortConfig} />
                            <th className="text-center p-5 text-xs font-semibold">Model</th>
                            <th className="text-center p-5 text-xs font-semibold">Chassis #</th>
                            <SortableHeader label="Year" sortKey="year" sortConfig={sortConfig} setSortConfig={setSortConfig} />
                            <SortableHeader label="Engine CC" sortKey="engineCC" sortConfig={sortConfig} setSortConfig={setSortConfig} />
                            <SortableHeader label="Color" sortKey="color" sortConfig={sortConfig} setSortConfig={setSortConfig} />
                            <SortableHeader label="Mileage" sortKey="mileage" sortConfig={sortConfig} setSortConfig={setSortConfig} />
                            <th className="text-center p-5 text-xs font-semibold">Location</th>
                            <th className="text-center p-5 text-xs font-semibold">Status</th>
                            <th className="text-center p-5 text-xs font-semibold">Total Cost</th>
                            <th className="text-center p-5 text-xs font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary">
                        {paginatedVehicles.map(v => {
                            const salespersonName = salespersonMap.get(v.salespersonId);
                            return (
                                <tr key={v.id} className={`hover:bg-tertiary/50 ${selectedVehicles.includes(v.id) ? 'bg-accent/10' : ''}`}>
                                    <td className="py-4 px-2 text-center"><input type="checkbox" checked={selectedVehicles.includes(v.id)} onChange={e => handleSelectOne(v.id, e.target.checked)} className="h-4 w-4 rounded bg-tertiary border-primary text-accent focus:ring-accent"/></td>
                                    <td className="py-4 px-2 font-mono text-center">
                                        <div>{v.stockNumber}</div>
                                        {salespersonName && (
                                            <div className="text-red-500 font-semibold text-xs">({salespersonName})</div>
                                        )}
                                    </td>
                                    <td className="py-4 px-2 font-semibold text-center">{v.make}</td>
                                    <td className="py-4 px-2 text-center">{v.model}</td>
                                    <td className="py-4 px-2 font-mono text-center">{v.chassisNumber}</td>
                                    <td className="py-4 px-2 text-center">{v.year}</td>
                                    <td className="py-4 px-2 text-center">{v.engineCC || 'N/A'}</td>
                                    <td className="py-4 px-2 text-center">{v.color}</td>
                                    <td className="py-4 px-2 text-center">{v.mileage}</td>
                                    <td className="py-4 px-2 text-center"><div className="flex justify-center"><LocationBadge location={v.location} /></div></td>
                                    <td className="py-4 px-2 text-center"><div className="flex justify-center"><StatusBadge status={v.status} /></div></td>
                                    <td className="py-4 px-2 font-mono text-center">{formatCurrency(calculateTotalCost(v))}</td>
                                    <td className="py-4 px-2 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <button onClick={() => setView('edit_vehicle', { id: v.id })} className="text-accent hover:underline text-xs font-semibold">Edit</button>
                                            <button onClick={() => handleDeleteSingle(v)} className="text-red-400 hover:underline text-xs font-semibold">Delete</button>
                                            <button onClick={() => setGalleryInfo({ images: v.imageUrls, chassis: v.chassisNumber, supplier: supplierMap.get(v.supplierId) || 'N/A' })} disabled={!v.imageUrls || v.imageUrls.length === 0} className="text-accent hover:underline text-xs font-semibold disabled:text-secondary disabled:cursor-not-allowed">
                                                Images ({v.imageUrls?.length || 0})
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                 {paginatedVehicles.length === 0 && (
                    <div className="text-center py-16 text-secondary">
                        <p className="font-semibold">No vehicles found.</p>
                        <p className="text-sm">Try adjusting your search or filter.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                 <div className="flex justify-between items-center pt-3 mt-auto border-t border-primary">
                    <span className="text-xs text-secondary">Page {currentPage} of {totalPages}</span>
                    <div className="flex gap-1">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-2 py-1 text-xs font-bold rounded-btn bg-tertiary hover:bg-tertiary/70 disabled:opacity-50">Prev</button>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-2 py-1 text-xs font-bold rounded-btn bg-tertiary hover:bg-tertiary/70 disabled:opacity-50">Next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

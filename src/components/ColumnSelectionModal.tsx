
import React, { useState, useMemo } from 'react';
import * as ExcelJS from 'exceljs';
import type { Vehicle } from '../constants/vehicleData';
import { ALL_VEHICLE_COLUMNS, getVehicleValue, LOCATION_AND_TYPE_FILTERS } from '../utils/vehicleHelper';

interface ColumnSelectionModalProps {
    onClose: () => void;
    allVehicles: Vehicle[];
}

export const ColumnSelectionModal: React.FC<ColumnSelectionModalProps> = ({ onClose, allVehicles }) => {
    const [selectedColumns, setSelectedColumns] = useState<string[]>(ALL_VEHICLE_COLUMNS.map(c => c.id));
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [locationFilter, setLocationFilter] = useState('all');

    const handleColumnToggle = (columnId: string) => {
        setSelectedColumns(prev => 
            prev.includes(columnId) ? prev.filter(id => id !== columnId) : [...prev, columnId]
        );
    };

    const handleSelectAll = () => setSelectedColumns(ALL_VEHICLE_COLUMNS.map(c => c.id));
    const handleDeselectAll = () => setSelectedColumns([]);

    const filteredVehiclesForExport = useMemo(() => {
        return allVehicles.filter(vehicle => {
            const purchaseDate = vehicle.purchaseDate ? new Date(vehicle.purchaseDate) : null;
            if (startDate && (!purchaseDate || purchaseDate < new Date(startDate))) return false;
            if (endDate && (!purchaseDate || purchaseDate > new Date(endDate))) return false;
            
            if (locationFilter !== 'all') {
                const [filterType, filterValue] = locationFilter.split('::');
                if (filterType && filterValue && vehicle[filterType as keyof Vehicle] !== filterValue) {
                    return false;
                }
            }
            return true;
        });
    }, [allVehicles, startDate, endDate, locationFilter]);
    
    const handleExport = async () => {
        if (selectedColumns.length === 0) {
            alert('Please select at least one column to export.');
            return;
        }

        const vehiclesToExport = filteredVehiclesForExport;

        if (!window.confirm(`Are you sure you want to export ${vehiclesToExport.length} vehicles to Excel?`)) {
            return;
        }
        
        const { default: saveAs } = await import('file-saver');
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Inventory');
        
        const headers = ALL_VEHICLE_COLUMNS.filter(c => selectedColumns.includes(c.id));
        
        // --- STYLING ---
        const headerStyle: Partial<ExcelJS.Style> = {
            font: { bold: true, color: { argb: 'FFFFFFFF' } },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF808080' } }, // Gray fill
            border: {
                top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }
            }
        };

        const rowStyle: Partial<ExcelJS.Style> = {
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E2F3' } }, // Light blue fill
            border: {
                top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }
            }
        };

        // --- ADD HEADERS ---
        const headerRow = worksheet.addRow(headers.map(h => h.label));
        headerRow.eachCell((cell: ExcelJS.Cell) => {
            cell.style = headerStyle;
        });

        // --- ADD DATA ROWS ---
        vehiclesToExport.forEach((vehicle, index) => {
            const rowData = headers.map(header => {
                if (header.id === 'fileNumber') return index + 1;
                return getVehicleValue(vehicle, header.id);
            });
            const dataRow = worksheet.addRow(rowData);
            dataRow.eachCell((cell: ExcelJS.Cell) => {
                cell.style = rowStyle;
            });
        });
        
        // Auto-fit columns
        worksheet.columns.forEach((col: Partial<ExcelJS.Column>, i: number) => {
            const column = worksheet.getColumn(i + 1);
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, (cell: ExcelJS.Cell) => {
                const columnLength = cell.value ? cell.value.toString().length : 10;
                if (columnLength > maxLength) {
                    maxLength = columnLength;
                }
            });
            column.width = maxLength < 10 ? 10 : maxLength + 2;
        });

        // Add auto-filter to the header row
        worksheet.autoFilter = {
            from: 'A1',
            to: { row: 1, column: headers.length },
        };

        // --- GENERATE & DOWNLOAD FILE ---
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `mundiya_inventory_export_${new Date().toISOString().slice(0,10)}.xlsx`);

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm" onClick={() => onClose()}>
            <div className="bg-primary border border-primary rounded-lg shadow-2xl p-6 relative w-full max-w-2xl max-h-[90vh] flex flex-col gap-4" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-primary border-b border-primary/50 pb-3">
                    Export Vehicle Data to Excel
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-tertiary/20 rounded-md border border-primary/20">
                    <div>
                        <label className="text-xs text-secondary">Start Date</label>
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full text-sm px-2 py-1 border border-secondary rounded-btn bg-tertiary/50"/>
                    </div>
                    <div>
                        <label className="text-xs text-secondary">End Date</label>
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full text-sm px-2 py-1 border border-secondary rounded-btn bg-tertiary/50"/>
                    </div>
                    <div>
                        <label className="text-xs text-secondary">Location / Type</label>
                         <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="w-full text-sm px-2 py-1 border border-secondary rounded-btn bg-tertiary/50">
                           {LOCATION_AND_TYPE_FILTERS.map(f => <option key={f.value} value={f.value} disabled={f.disabled}>{f.label}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <h3 className="text-base font-semibold text-primary mb-2">Select Columns</h3>
                    <p className="text-xs text-secondary mb-3">
                        Choose the data fields you want to include in your Excel export.
                    </p>
                    <div className="flex gap-2 mb-3">
                        <button onClick={handleSelectAll} className="text-xs font-semibold text-accent hover:underline">Select All</button>
                        <button onClick={handleDeselectAll} className="text-xs font-semibold text-accent hover:underline">Deselect All</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 bg-tertiary/20 rounded-md">
                        {ALL_VEHICLE_COLUMNS.map(column => (
                            <label key={column.id} className="flex items-center gap-2 text-sm text-primary p-1 rounded-md hover:bg-tertiary/50 cursor-pointer">
                                <input type="checkbox" checked={selectedColumns.includes(column.id)} onChange={() => handleColumnToggle(column.id)} className="h-4 w-4 rounded bg-tertiary border-primary text-accent focus:ring-accent" />
                                {column.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end items-center gap-3 pt-4 border-t border-primary/50">
                    <button onClick={() => onClose()} className="py-2 px-4 bg-tertiary text-primary rounded-btn hover:bg-tertiary/70">Cancel</button>
                    <button onClick={handleExport} className="btn-primary py-2 px-6">
                        Export {filteredVehiclesForExport.length} Vehicles
                    </button>
                </div>
            </div>
        </div>
    );
};

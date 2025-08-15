import React, { useState } from 'react';
import { ICONS } from '../constants/icons';
import { OcrReviewPanel, ExtractedData } from '../components/OcrReviewPanel';
import { useData } from '../context/DataContext';
import { Vehicle } from '../constants/vehicleData';
import { extractFromImage } from '../api/mockApi';

interface VehicleImportWizardProps {
    setView: (view: string) => void;
}

export const VehicleImportWizard: React.FC<VehicleImportWizardProps> = ({ setView }) => {
    const { vehicles, setVehicles, suppliers } = useData();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        setError(null);
        setExtractedData(null);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result as string;
            try {
                const data: ExtractedData = await extractFromImage(base64Image);
                setExtractedData(data);
            } catch (err: any) {
                setError(`Failed to process image: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        reader.onerror = () => {
            setIsLoading(false);
            setError('Failed to read the selected file.');
        };
    };

    const handleConfirmOcr = (confirmedData: Partial<Vehicle>) => {
        try {
            const newId = vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 1;
            const supplier = suppliers.find(s => s.id === confirmedData.supplierId);
            const stockPrefix = supplier ? supplier.prefix : 'STK';
            const supplierStockCount = vehicles.filter(v => v.supplierId === confirmedData.supplierId).length + 1;
            const stockNumber = `${stockPrefix}-${String(supplierStockCount).padStart(3, '0')}`;

            const newVehicle: Vehicle = {
                id: newId,
                stockNumber,
                purchaseType: 'import',
                lotNumber: '',
                purchaseDate: new Date().toISOString().slice(0, 10),
                auction: supplier?.name || '',
                shipmentType: '',
                portOfLoading: '',
                vessel: '',
                eta: '',
                imageUrls: [],
                status: 'Available',
                location: 'Yard',
                transmission: 'Automatic',
                fuelType: 'Petrol',
                ...confirmedData,
            } as Vehicle;

            setVehicles(prev => [...prev, newVehicle]);
            alert(`Vehicle ${stockNumber} created successfully!`);
            setExtractedData(null);
            setView('vehicles');

        } catch (err: any) {
            setError(`Failed to create vehicle: ${err.message}`);
        }
    };

    return (
        <div className="bg-content-secondary p-6 rounded-lg border border-content-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-content-primary">Vehicle Import Wizard</h2>
                <button onClick={() => setView('vehicles')} className="btn-secondary text-xs">Back to List</button>
            </div>

            {error && <div className="bg-red-900/50 text-red-200 p-3 rounded-md mb-4 text-sm">{error}</div>}

            {!extractedData ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/png, image/jpeg, image/webp" className="hidden" />
                    
                    <div className="w-24 h-24 mb-4 text-accent">{ICONS.ocr}</div>

                    <h3 className="text-lg font-semibold text-content-primary">AI-Powered Data Extraction</h3>
                    <p className="text-content-secondary text-sm max-w-md mx-auto my-2">
                        Upload an auction sheet, invoice, or other document. The AI will automatically read it and fill in the vehicle details for you to review.
                    </p>
                    
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        className="btn-primary mt-4"
                    >
                        {isLoading ? 'Processing...' : 'Upload Document'}
                    </button>
                    {isLoading && <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-accent mt-4"></div>}

                    <div className="my-6 text-content-secondary text-sm font-semibold">OR</div>

                    <button className="btn-secondary" onClick={() => setView('add_vehicle')}>
                        Enter Details Manually
                    </button>
                </div>
            ) : (
                <OcrReviewPanel 
                    data={extractedData}
                    onConfirm={handleConfirmOcr}
                    onCancel={() => setExtractedData(null)}
                />
            )}
        </div>
    );
};

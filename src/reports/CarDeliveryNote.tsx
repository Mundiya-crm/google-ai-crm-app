import React from 'react';

interface CarDeliveryNoteProps {
    setView: (view: string, query?: any) => void;
    vehicleId: number;
}

export const CarDeliveryNote: React.FC<CarDeliveryNoteProps> = ({ setView, vehicleId }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">Car Delivery Note for Vehicle #{vehicleId}</h2>
            <p>This is the car delivery note. Content coming soon.</p>
            <button onClick={() => setView('deal_ledger', { id: vehicleId })}>Back to Deal Ledger</button>
        </div>
    );
};
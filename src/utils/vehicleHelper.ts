
import { Vehicle, CurrencyValue } from '../constants/vehicleData';

export const calculateTotalCost = (vehicle: Vehicle): number => {
    let total = 0;

    if (vehicle.purchaseType === 'import') {
        if (vehicle.totalCnf?.kesAmount) total += vehicle.totalCnf.kesAmount;
        if (vehicle.clearingCost?.kesAmount) total += vehicle.clearingCost.kesAmount;
        if (vehicle.repairCost?.kesAmount) total += vehicle.repairCost.kesAmount;

        const detailedCosts = [
            vehicle.biddingPrice, vehicle.profitOnBidding, vehicle.auctionFee,
            vehicle.transportFee, vehicle.inspectionFee, vehicle.extraCharges,
            vehicle.roroShipping, vehicle.roroFreight, vehicle.containerVanning,
            vehicle.containerFreight, vehicle.dhl
        ];
        
        const rate = vehicle.exchangeRate || 1;
        detailedCosts.forEach(cost => {
            if (cost) total += cost * rate;
        });

    } else if (vehicle.purchaseType === 'local') {
        if (vehicle.purchasePrice?.kesAmount) total += vehicle.purchasePrice.kesAmount;
        if (vehicle.repairCost?.kesAmount) total += vehicle.repairCost.kesAmount;
    }
    
    return total;
};

export const LOCATION_AND_TYPE_FILTERS = [
    { label: "All Locations & Types", value: "all", disabled: false },
    { label: "--- By Type ---", value: "type_header", disabled: true },
    { label: "Import", value: "purchaseType::import", disabled: false },
    { label: "Local", value: "purchaseType::local", disabled: false },
    { label: "--- By Location ---", value: "location_header", disabled: true },
    { label: "Japan", value: "location::Japan", disabled: false },
    { label: "On Way", value: "location::On Way", disabled: false },
    { label: "Port", value: "location::Port", disabled: false },
    { label: "Showroom", value: "location::Showroom", disabled: false },
    { label: "Yard", value: "location::Yard", disabled: false },
];

export const getVehicleValue = (vehicle: Vehicle, fieldId: string): any => {
    switch(fieldId) {
        case 'id': return vehicle.id;
        case 'stockNumber': return vehicle.stockNumber;
        case 'purchaseDate': return vehicle.purchaseDate;
        case 'purchaseType': return vehicle.purchaseType;
        case 'supplierId': return vehicle.auction; // Supplier Name
        case 'chassisNumber': return vehicle.chassisNumber;
        case 'make': return vehicle.make;
        case 'model': return vehicle.model;
        case 'year': return vehicle.year;
        case 'color': return vehicle.color;
        case 'mileage': return vehicle.mileage;
        case 'status': return vehicle.status;
        case 'location': return vehicle.location;
        case 'totalCost': return calculateTotalCost(vehicle);
        case 'salePrice': return vehicle.saleDetails?.salePrice.kesAmount || 0;
        case 'profit': 
            const totalCost = calculateTotalCost(vehicle);
            const salePrice = vehicle.saleDetails?.salePrice.kesAmount || 0;
            return salePrice > 0 ? salePrice - totalCost : 0;
        default: return (vehicle as any)[fieldId] ?? '';
    }
};


export const ALL_VEHICLE_COLUMNS = [
    { id: 'fileNumber', label: 'File #' },
    { id: 'stockNumber', label: 'Stock #' },
    { id: 'purchaseDate', label: 'Purchase Date' },
    { id: 'purchaseType', label: 'Type' },
    { id: 'supplierId', label: 'Supplier' },
    { id: 'chassisNumber', label: 'Chassis #' },
    { id: 'make', label: 'Make' },
    { id: 'model', label: 'Model' },
    { id: 'year', label: 'Year' },
    { id: 'color', label: 'Color' },
    { id: 'mileage', label: 'Mileage' },
    { id: 'status', label: 'Status' },
    { id: 'location', label: 'Location' },
    { id: 'totalCost', label: 'Total Cost (KES)' },
    { id: 'salePrice', label: 'Sale Price (KES)' },
    { id: 'profit', label: 'Profit (KES)' },
];

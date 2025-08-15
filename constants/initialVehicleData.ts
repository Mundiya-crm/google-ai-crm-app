import { Vehicle, CurrencyValue } from './vehicleData';
import { initialSuppliers } from './suppliersData';
import { vehicleModelsByMake } from './vehicleOptions';

// Helper to find the make from a model name
const modelToMakeMap: { [key: string]: string } = {};
for (const make in vehicleModelsByMake) {
    for (const model of vehicleModelsByMake[make as keyof typeof vehicleModelsByMake]) {
        modelToMakeMap[model.toLowerCase()] = make;
    }
}
const findMakeFromModel = (modelName: string): string => {
    return modelToMakeMap[modelName.toLowerCase()] || '';
};

// Helper to parse Model and Grade from a single string
const parseModelAndGrade = (name: string): { model: string, grade: string } => {
    const gradeKeywords = ['HYBRID', 'SALOON', 'WXB', 'HIGHWAY STAR', 'ELEGANCE', 'SPORT', 'CUSTOM', 'AERO', 'G EDITION', 'X EDITION', 'LIMITED', 'PREMIUM', '4WD', 'DIESEL', 'PETROL', 'E-POWER', 'MODE P', '1.8', '1.5'];
    const nameUpper = name.toUpperCase();
    
    for (const keyword of gradeKeywords) {
        if (nameUpper.includes(keyword)) {
            const index = nameUpper.indexOf(keyword);
            const model = name.substring(0, index).trim();
            const grade = name.substring(index).trim();
            if (model) { // Ensure we don't return an empty model
                return { model, grade };
            }
        }
    }
    const parts = name.split(' ');
    if(parts.length > 1 && findMakeFromModel(parts[0])) {
         return { model: parts.slice(1).join(' '), grade: '' };
    }
    return { model: name, grade: '' };
};


// Raw data from the user's spreadsheet image
const rawData = [
  { company: 'TOYOTA', name: 'CAMRY', chassis: 'AVV50-1006285', color: 'BLACK', km: '200,000', year: '2012' },
  { company: 'CANON', name: 'LEXUS LX570', chassis: 'URJ201-4196210', color: 'BLACK', km: '68,000', year: '2016' },
  { company: 'APEX', name: 'AXELA', chassis: 'BM5FS-40A821', color: 'BLACK', km: '110,000', year: '2017' },
  { company: 'JAN AFRICA', name: 'JUKE', chassis: 'YF15-509882', color: 'BLACK', km: '120,000', year: '2017' },
  { company: 'JAN AFRICA', name: 'NOAH (WXB)', chassis: 'ZRR80-0303021', color: 'GRAY', km: '110,000', year: '2017' },
  { company: 'BE FORWARD', name: 'CX5', chassis: 'KF2P-113389', color: 'BLUE', km: '127,551', year: '2017' },
  { company: 'BE FORWARD', name: 'CX5', chassis: 'KF2P-101797', color: 'MAROON', km: '105,339', year: '2017' },
  { company: 'NAFAS', name: 'NOTE', chassis: 'E12-522391', color: 'WHITE', km: '65,000', year: '2017' },
  { company: 'NAFAS', name: 'NOTE E POWER', chassis: 'HE12-036955', color: 'WHITE', km: '63,787', year: '2017' },
  { company: 'NAFAS', name: 'SIENTA G', chassis: 'NSP170-7118321', color: 'BROWN', km: '91,849', year: '2017' },
  { company: 'NAFAS', name: 'VITZ HYBRID', chassis: 'NHP130-2021424', color: 'SILVER', km: '228,996', year: '2017' },
  { company: 'JP CARS', name: 'WAGON R HYBRID', chassis: 'MH55S-154402', color: 'WHITE', km: '65,000', year: '2017' },
  { company: 'JP CARS', name: 'MIRA', chassis: 'LA300S-1417371', color: 'BLUE', km: '135,712', year: '2017' },
  { company: 'JP CARS', name: 'MIRA', chassis: 'LA300S-1409849', color: 'WHITE', km: '82,000', year: '2017' },
  { company: 'JP CARS', name: 'N WGN', chassis: 'JH1-1362762', color: 'SILVER', km: '120,926', year: '2017' },
  { company: 'JP CARS', name: 'VITZ HYBRID', chassis: 'NHP130-2009142', color: 'SILVER', km: '85,383', year: '2017' },
  { company: 'JP CARS', name: 'NOTE E', chassis: 'HE12-038348', color: 'ORANGE', km: '100,000', year: '2017' },
  { company: 'JP CARS', name: 'AQUA', chassis: 'NHP10-6610872', color: 'SILVER', km: '156,300', year: '2017' },
  { company: 'JP CARS', name: 'MIRA', chassis: 'LA300S-14+F16616040', color: 'YELLOW', km: '38,000', year: '2017' },
  { company: 'JP CARS', name: 'NOTE E', chassis: 'HE12-059581', color: 'GREY', km: '39,292', year: '2017' },
  { company: 'JP CARS', name: 'MAZDA FLAIR', chassis: 'MI55S-102732', color: 'SILVER', km: '97,000', year: '2017' },
  { company: 'KARMEN', name: 'NOTE', chassis: 'HE12-038523', color: 'BLACK', km: '147,000', year: '2017' },
  { company: 'KARMEN', name: 'SIENTA', chassis: 'NHP170-7086382', color: 'BLUE', km: '107,000', year: '2017' },
  { company: 'KARMEN', name: 'NOAH', chassis: 'ZRR80-0307902', color: 'GREEN', km: '58,000', year: '2017' },
  { company: 'KARMEN', name: 'VITZ HYBRID', chassis: 'NHP130-2007335', color: 'WHITE', km: '171,000', year: '2017' },
  { company: 'KARMEN', name: 'HONDA VEZEL', chassis: 'RU3-1265916', color: 'RED WINE', km: '137,000', year: '2017' },
  { company: 'KARMEN', name: 'NOTE', chassis: 'HE12-054823', color: 'BLUE', km: '140,000', year: '2017' },
  { company: 'KARMEN', name: 'VITZ HYBRID', chassis: 'NH130-2002976', color: 'BRONZE', km: '147,000', year: '2017' },
  { company: 'KARMEN', name: 'VITZ HYBRID', chassis: 'NHP130-2000421', color: 'RED WINE', km: '159,000', year: '2017' },
  { company: 'KARMEN', name: 'BELENO', chassis: 'MA3EWB32S00-487144', color: 'PEARL', km: '133,345', year: '2017' },
  { company: 'KARMEN', name: 'SERENA', chassis: 'GC27-009545', color: 'PEARL', km: '135,000', year: '2017' },
  { company: 'KARMEN', name: 'AURIS', chassis: 'ZWE186-1009446', color: 'PEARL', km: '111,850', year: '2017' },
  { company: 'KARMEN', name: 'AXELA SALOON', chassis: 'BM5FP-403172', color: 'PEARL', km: '152,703', year: '2017' },
  { company: 'KARMEN', name: 'XTRAIL', chassis: 'HT32-108532', color: 'PEARL', km: '99,691', year: '2017' },
  { company: 'KARMEN', name: 'NOTE', chassis: 'HE12-046341', color: 'GREY', km: '104,000', year: '2017' },
  { company: 'KARMEN', name: 'SHUTTLE', chassis: 'GP8-1103976', color: 'PEARL', km: '136,000', year: '2017' },
  { company: 'KARMEN', name: 'JUKE', chassis: 'YF15-511226', color: 'BLUE', km: '121,000', year: '2017' },
  { company: 'KARMEN', name: 'CAST', chassis: 'LA250S-0105568', color: 'PEARL', km: '183,000', year: '2017' },
  { company: 'KARMEN', name: 'CAST', chassis: 'LA250S-0098773', color: 'WINE', km: '65,718', year: '2017' },
  { company: 'KARMEN', name: 'VITZ HYBRID', chassis: 'NHP130-2012880', color: 'BLUE', km: '97,000', year: '2017' },
  { company: 'KARMEN', name: 'VITZ HYBRID', chassis: 'NHP130-2014989', color: 'BLACK', km: '97,000', year: '2017' },
  { company: 'KARMEN', name: 'PASSO MODA', chassis: 'M700A-0057321', color: 'RED WINE', km: '166,114', year: '2017' },
  { company: 'KARMEN', name: 'HONDA VEZEL', chassis: 'RU3-1274756', color: 'BLACK', km: '99,500', year: '2018' },
  { company: 'CANON', name: 'C200', chassis: 'WDD2050422R41735', color: 'SILVER', km: '9,300', year: '2019' },
  { company: 'NIPPON', name: 'MOVE', chassis: 'LA150S-1058783', color: 'WHITE', km: '', year: '2017' },
  { company: 'KARMEN', name: 'DEMIO', chassis: 'DJ5FS-522278', color: 'PEARL', km: '57,494', year: '2018' },
  { company: 'CANON', name: 'PRADO TX', chassis: 'TRJ150-0101046', color: 'BLACK', km: '49,500', year: '2019' },
  { company: 'KARMEN', name: 'NOTE', chassis: 'HE12-224001', color: 'PEARL', km: '', year: '2018' },
  { company: 'KARMEN', name: 'NOTE', chassis: 'HE12-213732', color: 'PINK', km: '22,780', year: '2018' },
  { company: 'AFRIDI', name: 'ALTO', chassis: 'HA36S-522297', color: 'SILVER', km: '11,000', year: '2018' },
];

const stockCounters: { [key: string]: number } = {};

export const initialVehicles: Vehicle[] = rawData.map((row, index) => {
    const supplierNameLower = row.company.toLowerCase();
    const supplier = initialSuppliers.find(s => 
        s.name.toLowerCase() === supplierNameLower || 
        (s.aliases && s.aliases.some(alias => alias.toLowerCase() === supplierNameLower))
    );

    const supplierPrefix = supplier?.prefix || 'STK';
    
    if (!stockCounters[supplierPrefix]) {
        stockCounters[supplierPrefix] = 0;
    }
    stockCounters[supplierPrefix]++;
    const stockNumber = `${supplierPrefix}-${String(stockCounters[supplierPrefix]).padStart(3, '0')}`;
    
    const { model, grade } = parseModelAndGrade(row.name);
    let make = findMakeFromModel(model);
    if (!make && row.name.toLowerCase().includes('mazda')) make = 'Mazda';
    if (!make && row.name.toLowerCase().includes('honda')) make = 'Honda';
    if (!make && row.name.toLowerCase().includes('benz')) make = 'Mercedes-Benz';

    const purchaseType = supplier?.type || 'import';
    const price = 0; // Price column was unlabeled and often empty.
    let totalCnf: CurrencyValue | undefined = undefined;
    let purchasePrice: CurrencyValue | undefined = undefined;

    if (purchaseType === 'import' && price > 0) {
        totalCnf = { amount: price, currency: 'JPY', rate: 1.2, kesAmount: price / 1.2 };
    } else if (purchaseType === 'local' && price > 0) {
        purchasePrice = { amount: price, currency: 'KES', rate: 1, kesAmount: price };
    }

    const defaultSalesperson = supplier?.salespersons[0];

    return {
        id: index + 1,
        purchaseType,
        supplierId: supplier?.id || '',
        salespersonId: defaultSalesperson?.id || '',
        salespersonSubPrefix: defaultSalesperson?.subPrefix || '',
        lotNumber: '',
        purchaseDate: `${row.year}-01-01`,
        auction: supplier?.name || row.company,
        make,
        model,
        grade,
        chassisNumber: row.chassis,
        year: row.year,
        color: row.color,
        mileage: row.km ? `${parseInt(row.km.replace(/,/g, '')).toLocaleString()}km` : '',
        totalCnf: totalCnf,
        purchasePrice: purchasePrice,
        shipmentType: '',
        portOfLoading: '',
        vessel: '',
        eta: '',
        imageUrls: [],
        status: 'Available',
        location: index % 2 === 0 ? 'Showroom' : 'Yard',
        stockNumber: stockNumber,
        transmission: 'Automatic',
        fuelType: 'Petrol',
    };
});
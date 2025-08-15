
import { VehicleLocation } from "./vehicleData";

export const vehicleMakes: string[] = [
    "Daihatsu", "Honda", "Isuzu", "Lexus", "Mazda", "Mercedes-Benz", "Mitsubishi", "Nissan", "Subaru", "Suzuki", "Toyota"
].sort();

export const vehicleModelsByMake: { [key: string]: string[] } = {
    "Toyota": ["4Runner", "86", "Allion", "Alphard", "Aqua", "Auris", "Avalon", "Avanza", "Aygo", "bB", "Belta", "Blade", "C-HR", "Caldina", "Camry", "Celica", "Century", "Coaster", "Corolla", "Corolla Altis", "Corolla Axio", "Corolla Cross", "Corolla Fielder", "Corolla Rumion", "Corolla Sport", "Corolla Touring", "Crown", "Dyna", "Esquire", "Estima", "Etios", "FJ Cruiser", "Fortuner", "Harrier", "HiAce", "HiAce Commuter", "HiAce Van", "Highlander", "Hilux", "Innova", "IQ", "Isis", "Ist", "Kluger", "Land Cruiser", "Land Cruiser Prado", "LiteAce", "Mark II", "Mark X", "Mirai", "MR2", "Noah", "Passo", "Pixis", "Porte", "Premio", "Prius", "Prius Alpha", "Probox", "Raize", "RAV4", "RegiusAce", "Roomy", "Rush", "Sai", "Sequoia", "Sienna", "Sienta", "Soarer", "Spade", "Starlet", "Succeed", "Supra", "Tacoma", "Tank", "TownAce", "ToyoAce", "Tundra", "Vanguard", "Vellfire", "Verossa", "Vios", "Vitz", "Voxy", "Wigo", "Wish", "Yaris", "Yaris Cross"],
    "Honda": ["Accord", "Acty", "Airwave", "Amaze", "Avancier", "Ballade", "BR-V", "Brio", "City", "Civic", "Clarity", "CR-V", "CR-Z", "Crossroad", "Crosstour", "Edix", "Element", "Elysion", "Fit", "Fit Shuttle", "Freed", "Grace", "HR-V", "Insight", "Inspire", "Jade", "Jazz", "Legend", "Mobilio", "N-BOX", "N-One", "N-Van", "N-WGN", "NSX", "Odyssey", "Passport", "Pilot", "Ridgeline", "S2000", "S660", "Shuttle", "Stepwgn", "Stream", "Vezel", "WR-V", "Zest"],
    "Nissan": ["350Z", "370Z", "AD Van", "Almera", "Altima", "Armada", "Atlas", "Bluebird Sylphy", "Caravan", "Cima", "Clipper", "Cube", "Dayz", "Dayz Roox", "Dualis", "Elgrand", "Fairlady Z", "Fuga", "GT-R", "Juke", "Kicks", "Lafesta", "Latio", "Leaf", "Liberty", "Livina", "March", "Maxima", "Micra", "Murano", "Navara", "Note", "NV100 Clipper", "NV200 Vanette", "NV350 Caravan", "Pathfinder", "Patrol", "Presage", "President", "Pulsar", "Qashqai", "Rogue", "Roox", "Safari", "Sentra", "Serena", "Skyline", "Sylphy", "Teana", "Terra", "Terrano", "Tiida", "Tiida Latio", "Titan", "Versa", "Wingroad", "X-Trail"],
    "Mazda": ["2", "3", "5", "6", "Atenza", "Axela", "AZ-Wagon", "Biante", "Bongo", "Bongo Brawny", "BT-50", "Carol", "CX-3", "CX-30", "CX-5", "CX-60", "CX-7", "CX-8", "CX-9", "Demio", "Familia", "Flair", "MPV", "MX-30", "MX-5", "Premacy", "RX-7", "RX-8", "Scrum", "Titan", "Tribute", "Verisa"],
    "Mitsubishi": ["ASX", "Attrage", "Canter", "Challenger", "Colt", "Delica D:2", "Delica D:5", "Delica Van", "Diamante", "Dignity", "Eclipse", "Eclipse Cross", "eK", "eK Space", "Endeavor", "Fuso Canter", "Galant", "Grandis", "i-MiEV", "L200", "Lancer", "Lancer Evolution", "Minica", "Minicab", "Mirage", "Montero", "Outlander", "Pajero", "Pajero Mini", "Pajero Sport", "Proudia", "Raider", "RVR", "Strada", "Town Box", "Triton", "Xpander"],
    "Subaru": ["Alcyone", "Ascent", "Baja", "BRZ", "Crosstrek", "Dex", "Exiga", "Forester", "Impreza", "Impreza G4", "Impreza Sport", "Justy", "Legacy", "Legacy B4", "Legacy Outback", "Levorg", "Lucra", "Outback", "Pleo", "R1", "R2", "Rex", "Sambar", "Solterra", "Stella", "SVX", "Traviq", "Trezia", "Tribeca", "WRX", "WRX STI", "XV"],
    "Suzuki": ["Aerio", "Alto", "Alto Lapin", "APV", "Baleno", "Cappuccino", "Carry", "Celerio", "Ciaz", "Cultus", "DZire", "Ertiga", "Escudo", "Every", "Grand Vitara", "Hustler", "Ignis", "Jimny", "Kei", "Kizashi", "Landy", "Lapin", "MR Wagon", "Palette", "S-Cross", "Solio", "Spacia", "Splash", "Swift", "SX4", "Twin", "Vitara", "Wagon R", "Xbee"],
    "Lexus": ["CT", "ES", "GS", "GX", "HS", "IS", "LC", "LFA", "LM", "LS", "LX", "NX", "RC", "RX", "RX450h", "SC", "UX"],
    "Isuzu": ["Alter-a", "Amigo", "Ascender", "Aska", "Axiom", "Bighorn", "D-Max", "Elf", "Fargo", "Forward", "Gemini", "Giga", "Hombre", "i-Series", "Journey", "mu", "MU-X", "Panther", "Piazza", "Rodeo", "Stylus", "Trooper", "VehiCROSS", "Wizard"],
    "Daihatsu": ["Altis", "Atrai", "Be-go", "Boon", "Cast", "Copen", "Cuore", "Esse", "Gran Max", "Hijet", "Materia", "MAX", "Mebius", "Mira", "Mira e:S", "Move", "Move Canbus", "Naked", "Opti", "Rocky", "Sirion", "Sonica", "Taft", "Tanto", "Terios", "Thor", "Trevis", "Wake", "YRV"],
    "Mercedes-Benz": ["A-Class", "B-Class", "C-Class", "C200", "E-Class", "S-Class", "G-Class", "GLA", "GLB", "GLC", "GLE", "GLS"]
};

export const vehicleColors: string[] = [
    "White", "Black", "Silver", "Gray", "Blue", "Red", "Pearl", "Brown", "Green", "Beige", "Orange", "Yellow", "Purple", "Gold", "Bronze", "Maroon", "Cream", "Charcoal", "Champagne", "Other"
];

export const transmissionTypes: Array<'Automatic' | 'Manual'> = ['Automatic', 'Manual'];
export const fuelTypes: Array<'Petrol' | 'Diesel' | 'Hybrid'> = ['Petrol', 'Diesel', 'Hybrid'];
export const vehicleLocations: VehicleLocation[] = ['Japan', 'On Way', 'Port', 'Showroom', 'Yard'];

export const japaneseAuctionHouses: string[] = [
    "AAAI", "ARAI Bayside", "ARAI Oyama", "ARAI Sendai", "AUCNET", "BAYAUC", "BCN", "CAA Chubu", "CAA Gifu", "CAA Tohoku", "GNN", "HAA Kobe", "HAA Osaka", "Hanaten", "Honda", "IMA Kobe", "JU Aichi", "JU Akita", "JU Chiba", "JU Fukuoka", "JU Fukushima", "JU Gifu", "JU Gunma", "JU Hiroshima", "JU Hokkaido", "JU Hyogo", "JU Ibaraki", "JU Kanagawa", "JU Mie", "JU Miyagi", "JU Nagano", "JU Nara", "JU Niigata", "JU Okayama", "JU Okinawa", "JU Saitama", "JU Shizuoka", "JU Tochigi", "JU Toyama", "JU Yamaguchi", "JU Yamanashi", "KCAA Fukuoka", "KCAA Kyoto", "KCAA Yamaguchi", "KMAA", "LUM", "MIRIVE Saitama", "MIRIVE Osaka", "NAA Nagoya", "NAA Osaka", "NAA Tokyo", "Nissan", "NPS", "ORIX", "SAA", "TAA Chubu", "TAA Hiroshima", "TAA Hokkaido", "TAA Kanto", "TAA Kinki", "TAA Kyushu", "TAA Minami Kyushu", "TAA Shikoku", "TAA Tohoku", "TAA Yokohama", "USS Gunma", "USS Hokuriku", "USS Kobe", "USS Kyushu", "USS Nagoya", "USS Okayama", "USS Osaka", "USS Sapporo", "USS Shizuoka", "USS Tohoku", "USS Tokyo", "USS Yokohama", "ZERO Chiba"
].sort();

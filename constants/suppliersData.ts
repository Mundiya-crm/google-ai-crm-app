
export interface Salesperson {
  id: string;
  name: string;
  subPrefix: string;
}

export interface Supplier {
  id: string;
  name: string;
  prefix: string;
  aliases?: string[];
  type: 'import' | 'local';
  costingType?: 'detailed' | 'cnf';
  salespersons: Salesperson[];
  // Deprecated contact fields, now part of salesperson
  contactPerson?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}

export const initialSuppliers: Supplier[] = [
    {
        id: 'beforward', name: 'Be Forward', prefix: 'BF', aliases: ['BE FORWARD'], type: 'import', costingType: 'cnf',
        salespersons: [{ id: 'bf_yasir', name: 'Yasir', subPrefix: 'Yasir' }]
    },
    {
        id: 'sbtjapan', name: 'SBT Japan', prefix: 'SBT', type: 'import', costingType: 'cnf',
        salespersons: [{ id: 'sbt_mubashir', name: 'Mubashir', subPrefix: 'Mubashir' }]
    },
    {
        id: 'nafasinvestment', name: 'Nafas Investment Co. Ltd', prefix: 'Nafas', aliases: ['NAFAS'], type: 'import',
        salespersons: [{ id: 'nafas_masud', name: 'Masud', subPrefix: 'Masud' }]
    },
    {
        id: 'karmen', name: 'Karmen Japan', prefix: 'Karmen', aliases: ['KARMEN'], type: 'import',
        salespersons: [{ id: 'karmen_noman', name: 'Noman', subPrefix: 'Noman' }]
    },
    {
        id: 'afriditrading', name: 'Afridi Trading', prefix: 'Afridi', aliases: ['AFRIDI'], type: 'import',
        salespersons: [{ id: 'afridi_aimaan', name: 'Aimaan', subPrefix: 'Aimaan' }]
    },
    {
        id: 'aajapan', name: 'AA Japan', prefix: 'AA', aliases: ['AAJP'], type: 'import',
        salespersons: [{ id: 'aa_yasir', name: 'Yasir', subPrefix: 'Yasir' }]
    },
    {
        id: 'janstrading', name: "Jans Trading", prefix: 'JANS', aliases: ['JTRD'], type: 'import',
        salespersons: [{ id: 'jans_bilal', name: 'Bilal', subPrefix: 'Bilal' }]
    },
    {
        id: 'janafricamotorsltd', name: 'Jan Africa Motors LTD', prefix: 'JAN africa', aliases: ['JAN AFRICA'], type: 'local',
        salespersons: [{ id: 'janafrica_najeeb', name: 'Najeeb', subPrefix: 'Najeeb' }]
    },
    { 
        id: 'apexmotorsltd', name: 'Apex Motors LTD', prefix: 'APEX', aliases: ['APEX'], type: 'local',
        salespersons: [{ id: 'apex_irshad', name: 'Irshad', subPrefix: 'Irshad' }]
    },
    {
        id: 'ismaeelal-alyaanmotors', name: 'ISMAEEL AL-ALYAAN MOTORS', prefix: 'Alyaan', aliases: ['AL-ISMAEEL', '(ALYAAN MOTORS)'], type: 'local',
        salespersons: [{ id: 'alyaan_mansoor', name: 'Mansoor', subPrefix: 'Mansoor' }]
    },
    {
        id: 'al-fadhilmotors', name: 'AL-FADHIL Motors', prefix: 'FADHIL', aliases: ['AL-FADHIL'], type: 'local',
        salespersons: [{ id: 'fadhil_fahad', name: 'Fahad', subPrefix: 'Fahad' }]
    },
    {
        id: 'zubeirrasoolbaksh', name: 'ZUBEIR Rasool Baksh', prefix: 'Zubeir', aliases: ['ZUBEIR'], type: 'local',
        salespersons: [{ id: 'zubeir_zubeir', name: 'Zubeir', subPrefix: 'Zubeir' }]
    },
    {
        id: 'umairjubba', name: 'UMAIR Jubba', prefix: 'UMAR', aliases: ['UMAIR'], type: 'local',
        salespersons: [{ id: 'umar_jubba', name: 'Jubba', subPrefix: 'Jubba' }]
    },
    {
        id: 'canonmotorsltd', name: 'Canon Motors LTD', prefix: 'Canon', aliases: ['CANON', 'CNMT'], type: 'local',
        salespersons: [{ id: 'canon_hunain', name: 'Hunain', subPrefix: 'Hunain' }]
    },
    {
        id: 'nipponinvestmentltd', name: 'Nippon Investment LTD', prefix: 'Nippon', aliases: ['NIPPON', 'NPPN'], type: 'local',
        salespersons: [{ id: 'nippon_sarmad', name: 'Sarmad', subPrefix: 'Sarmad' }]
    },
    {
        id: 'aishamotorsltd', name: 'Aisha Motors LTD', prefix: 'Aisha', aliases: ['AISHA', 'ASMT'], type: 'local',
        salespersons: [{ id: 'aisha_azein', name: 'Azein', subPrefix: 'Azein' }]
    },
    {
        id: 'kashifmotors', name: 'Kashif Motors', prefix: 'Kashif', aliases: ['KSMT'], type: 'local',
        salespersons: [{ id: 'kashif_kashaaf', name: 'Kashaaf', subPrefix: 'Kashaaf' }]
    },
    {
        id: 'abidsheikha', name: 'Abid Sheikha', prefix: 'Abid', aliases: ['ABSH'], type: 'local',
        salespersons: [{ id: 'abid_abid', name: 'Abid', subPrefix: 'Abid' }]
    },
    {
        id: 'tradeinn', name: 'Trade Inn', prefix: 'Tradein', aliases: ['TRDN'], type: 'local',
        salespersons: [{ id: 'tradein_hamza', name: 'Hamza', subPrefix: 'Hamza' }]
    },
    { id: 'toyotasupplier', name: 'Toyota Supplier', prefix: 'TOYO', type: 'import', salespersons: [{id: 'ts_default', name: 'Default', subPrefix: 'Default'}] },
    { id: 'jpcars', name: 'JP Cars', prefix: 'JPCR', aliases: ['JP CARS'], type: 'import', salespersons: [{id: 'jpc_default', name: 'Default', subPrefix: 'Default'}] },
    { id: 'kobe', name: 'Kobe', prefix: 'KOBE', type: 'import', salespersons: [{id: 'kobe_default', name: 'Default', subPrefix: 'Default'}] },
    { id: 'yassir', name: 'Yassir', prefix: 'YSSR', type: 'import', salespersons: [{id: 'ysr_default', name: 'Default', subPrefix: 'Default'}] },
    { id: 'nanu', name: 'Nanu', prefix: 'NANU', type: 'import', salespersons: [{id: 'nanu_default', name: 'Default', subPrefix: 'Default'}] },
    { id: 'aabid', name: 'Aabid', prefix: 'AABD', type: 'import', salespersons: [{id: 'aabid_default', name: 'Default', subPrefix: 'Default'}] },
];

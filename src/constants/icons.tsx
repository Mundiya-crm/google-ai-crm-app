
import React from 'react';

export type IconKey = 
  | 'stock' | 'sales' | 'accounting' | 'reports' | 'customers' | 'setup'
  | 'importVehicle' | 'localPurchase' | 'dashboard'
  | 'activeVehicles' | 'soldVehicles'
  | 'newDeal' | 'customerList'
  | 'newJournalEntry' | 'chartOfAccounts' | 'ledger'
  | 'vendors' | 'clearing' | 'tracker' | 'insurance' | 'brokers'
  | 'myOptions' | 'myLinks' | 'about'
  | 'vehicles' | 'sell' | 'payments' | 'fastQuote' | 'help' | 'rapierShop'
  | 'lienholders' | 'publisher' | 'buyerSeller' | 'update' | 'close'
  | 'activeBalance' | 'email' | 'whatsapp' | 'dealLedger'
  | 'add' | 'findAi' | 'ship' | 'container' | 'upload' | 'trash'
  | 'notification' | 'etaAlert' | 'hpInstallment' | 'paymentDue' | 'scheduledExpense' | 'usersSetup'
  | 'adminPanel' | 'featureManager' | 'projectRoadmap' | 'salesAssistant' | 'predictiveAlerts' | 'ocr' | 'permissions' | 'activityFeed'
  | 'moduleManager' | 'systemSettings' | 'kpiDashboard' | 'reportBuilder' | 'marketing' | 'syncCenter' | 'systemHealth' | 'apiTester' | 'languageManager' | 'devops' | 'training';

export const ICONS: Record<IconKey, React.ReactNode> = {
    // Main Modules
    stock: <img src="https://img.icons8.com/3d-fluency/94/car.png" alt="Stock" className="w-full h-full object-contain" />,
    sales: <img src="https://img.icons8.com/3d-fluency/94/handshake.png" alt="Sales" className="w-full h-full object-contain" />,
    accounting: <img src="https://img.icons8.com/3d-fluency/94/calculator.png" alt="Accounting" className="w-full h-full object-contain" />,
    reports: <img src="https://img.icons8.com/3d-fluency/94/business-report.png" alt="Reports" className="w-full h-full object-contain" />,
    customers: <img src="https://img.icons8.com/3d-fluency/94/group.png" alt="Customers" className="w-full h-full object-contain" />,
    setup: <img src="https://img.icons8.com/3d-fluency/94/services.png" alt="Setup" className="w-full h-full object-contain" />,
    adminPanel: <img src="https://img.icons8.com/3d-fluency/94/gear.png" alt="Admin Panel" className="w-full h-full object-contain" />,
    
    // Dashboard & Sidebar
    dashboard: <img src="https://img.icons8.com/3d-fluency/94/home.png" alt="Dashboard" className="w-full h-full object-contain" />,
    importVehicle: <img src="https://img.icons8.com/3d-fluency/94/import.png" alt="Import Vehicle" className="w-full h-full object-contain" />,
    localPurchase: <img src="https://img.icons8.com/3d-fluency/94/cash-in-hand.png" alt="Local Purchase" className="w-full h-full object-contain" />,
    activeVehicles: <img src="https://img.icons8.com/3d-fluency/94/warehouse.png" alt="Active Vehicles" className="w-full h-full object-contain" />,
    soldVehicles: <img src="https://img.icons8.com/3d-fluency/94/price-tag-usd.png" alt="Sold Vehicles" className="w-full h-full object-contain" />,
    newDeal: <img src="https://img.icons8.com/3d-fluency/94/deal.png" alt="New Deal" className="w-full h-full object-contain" />,
    customerList: <img src="https://img.icons8.com/3d-fluency/94/group.png" alt="Customer List" className="w-full h-full object-contain" />,
    
    // Accounting
    newJournalEntry: <img src="https://img.icons8.com/3d-fluency/94/add-document.png" alt="New Journal Entry" className="w-full h-full object-contain" />,
    chartOfAccounts: <img src="https://img.icons8.com/3d-fluency/94/accounting.png" alt="Chart of Accounts" className="w-full h-full object-contain" />,
    ledger: <img src="https://img.icons8.com/3d-fluency/94/book.png" alt="Ledger" className="w-full h-full object-contain" />,
    activeBalance: <img src="https://img.icons8.com/3d-fluency/94/get-cash.png" alt="Active Balance" className="w-full h-full object-contain" />,
    payments: <img src="https://img.icons8.com/3d-fluency/94/wallet.png" alt="Payments" className="w-full h-full object-contain" />,
    dealLedger: <img src="https://img.icons8.com/3d-fluency/94/receipt.png" alt="Deal Ledger" className="w-full h-full object-contain" />,

    // Setup
    vendors: <img src="https://img.icons8.com/3d-fluency/94/shop.png" alt="Vendors" className="w-full h-full object-contain" />,
    clearing: <img src="https://img.icons8.com/3d-fluency/94/cargo-ship.png" alt="Clearing" className="w-full h-full object-contain" />,
    tracker: <img src="https://img.icons8.com/3d-fluency/94/gps-navigator.png" alt="Tracker" className="w-full h-full object-contain" />,
    insurance: <img src="https://img.icons8.com/3d-fluency/94/security-checked.png" alt="Insurance" className="w-full h-full object-contain" />,
    brokers: <img src="https://img.icons8.com/3d-fluency/94/conference-call.png" alt="Brokers" className="w-full h-full object-contain" />,

    // Footer
    myOptions: <img src="https://img.icons8.com/3d-fluency/94/slider.png" alt="My Options" className="w-full h-full object-contain" />,
    myLinks: <img src="https://img.icons8.com/3d-fluency/94/link.png" alt="My Links" className="w-full h-full object-contain" />,
    about: <img src="https://img.icons8.com/3d-fluency/94/info.png" alt="About" className="w-full h-full object-contain" />,
    
    // Dashboard Buttons
    vehicles: <img src="https://img.icons8.com/3d-fluency/94/car.png" alt="Vehicles" className="w-full h-full object-contain" />,
    sell: <img src="https://img.icons8.com/3d-fluency/94/handshake.png" alt="Sell" className="w-full h-full object-contain" />,
    fastQuote: <img src="https://img.icons8.com/3d-fluency/94/price-tag.png" alt="Fast Quote" className="w-full h-full object-contain" />,
    help: <img src="https://img.icons8.com/3d-fluency/94/help.png" alt="Help" className="w-full h-full object-contain" />,
    rapierShop: <img src="https://img.icons8.com/3d-fluency/94/shopping-cart-loaded.png" alt="Karshop" className="w-full h-full object-contain" />,
    lienholders: <img src="https://img.icons8.com/3d-fluency/94/bank.png" alt="Lienholders" className="w-full h-full object-contain" />,
    publisher: <img src="https://img.icons8.com/3d-fluency/94/megaphone.png" alt="Publisher" className="w-full h-full object-contain" />,
    buyerSeller: <img src="https://img.icons8.com/3d-fluency/94/conference-call.png" alt="Buyer/Seller" className="w-full h-full object-contain" />,
    update: <img src="https://img.icons8.com/3d-fluency/94/synchronize.png" alt="Update" className="w-full h-full object-contain" />,
    close: <img src="https://img.icons8.com/3d-fluency/94/close-window.png" alt="Close" className="w-full h-full object-contain" />,
    
    // Common
    email: <img src="https://img.icons8.com/3d-fluency/94/mail.png" alt="Email" className="w-full h-full object-contain" />,
    whatsapp: <img src="https://img.icons8.com/3d-fluency/94/whatsapp.png" alt="WhatsApp" className="w-full h-full object-contain" />,

    // Wizard Icons
    add: <img src="https://img.icons8.com/3d-fluency/94/add.png" alt="Add New" className="w-full h-full object-contain" />,
    findAi: <img src="https://img.icons8.com/3d-fluency/94/magic-wand.png" alt="Find with AI" className="w-full h-full object-contain" />,
    ship: <img src="https://img.icons8.com/3d-fluency/94/cargo-ship.png" alt="RORO Ship" className="w-full h-full object-contain" />,
    container: <img src="https://img.icons8.com/3d-fluency/94/box.png" alt="Container" className="w-full h-full object-contain" />,
    upload: <img src="https://img.icons8.com/3d-fluency/94/upload-to-cloud.png" alt="Upload" className="w-full h-full object-contain" />,
    trash: <img src="https://img.icons8.com/3d-fluency/94/trash.png" alt="Delete" className="w-full h-full object-contain" />,
    
    // Notifications & AI
    notification: <img src="https://img.icons8.com/3d-fluency/94/appointment-reminders.png" alt="Notifications" className="w-full h-full object-contain"/>,
    etaAlert: <img src="https://img.icons8.com/3d-fluency/94/cargo-ship.png" alt="ETA Alert" className="w-full h-full object-contain" />,
    hpInstallment: <img src="https://img.icons8.com/3d-fluency/94/pay-date.png" alt="Installment Due" className="w-full h-full object-contain" />,
    paymentDue: <img src="https://img.icons8.com/3d-fluency/94/cash-register.png" alt="Payment Due" className="w-full h-full object-contain" />,
    scheduledExpense: <img src="https://img.icons8.com/3d-fluency/94/planner.png" alt="Scheduled Expense" className="w-full h-full object-contain" />,
    usersSetup: <img src="https://img.icons8.com/3d-fluency/94/guest-male.png" alt="Users Setup" className="w-full h-full object-contain" />,
    featureManager: <img src="https://img.icons8.com/3d-fluency/94/switch.png" alt="Feature Manager" className="w-full h-full object-contain" />,
    projectRoadmap: <img src="https://img.icons8.com/3d-fluency/94/mind-map.png" alt="Project Roadmap" className="w-full h-full object-contain" />,
    salesAssistant: <img src="https://img.icons8.com/3d-fluency/94/robot-2.png" alt="Sales Assistant" className="w-full h-full object-contain" />,
    predictiveAlerts: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>,
    ocr: <img src="https://img.icons8.com/3d-fluency/94/document.png" alt="OCR" className="w-full h-full object-contain" />,
    permissions: <img src="https://img.icons8.com/3d-fluency/94/shield.png" alt="Permissions" className="w-full h-full object-contain" />,
    activityFeed: <img src="https://img.icons8.com/3d-fluency/94/time-machine.png" alt="Activity Feed" className="w-full h-full object-contain" />,

    // New Icons for Admin Panel
    moduleManager: <img src="https://img.icons8.com/3d-fluency/94/module.png" alt="Module Manager" className="w-full h-full object-contain" />,
    systemSettings: <img src="https://img.icons8.com/3d-fluency/94/control-panel.png" alt="System Settings" className="w-full h-full object-contain" />,
    kpiDashboard: <img src="https://img.icons8.com/3d-fluency/94/kpi.png" alt="KPI Dashboard" className="w-full h-full object-contain" />,
    reportBuilder: <img src="https://img.icons8.com/3d-fluency/94/edit-document.png" alt="Report Builder" className="w-full h-full object-contain" />,
    marketing: <img src="https://img.icons8.com/3d-fluency/94/bullhorn.png" alt="Marketing" className="w-full h-full object-contain" />,
    syncCenter: <img src="https://img.icons8.com/3d-fluency/94/database.png" alt="Sync Center" className="w-full h-full object-contain" />,
    systemHealth: <img src="https://img.icons8.com/3d-fluency/94/heart-with-pulse.png" alt="System Health" className="w-full h-full object-contain" />,
    apiTester: <img src="https://img.icons8.com/3d-fluency/94/api-settings.png" alt="API Tester" className="w-full h-full object-contain" />,
    languageManager: <img src="https://img.icons8.com/3d-fluency/94/language-skill.png" alt="Language Manager" className="w-full h-full object-contain" />,
    devops: <img src="https://img.icons8.com/3d-fluency/94/server.png" alt="DevOps Suite" className="w-full h-full object-contain" />,
    training: <img src="https://img.icons8.com/3d-fluency/94/teacher.png" alt="Training" className="w-full h-full object-contain" />,
};

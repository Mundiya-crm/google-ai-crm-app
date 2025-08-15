# Mundiya International CRM: To-Do List

Yeh file is project ke tamam mukammal (complete) aur baaki (pending) kaamon ki tafseeli list hai.

---

## Kam Jo Mukammal Ho Gaye Hain (Completed Tasks) ✅

Yeh woh features hain jo abhi tak CRM mein a_chhe se banaye ja chuke hain aur kaam kar rahe hain.

### Core System & UI
-   **Authentication:** User login aur logout system mukammal hai.
-   **Theming Engine:** Multiple themes (Aero, Carbon, etc.) aur button styles (Sharp/Rounded) select karne ka system tayyar hai aur kaam kar raha hai.
-   **Main Layout:** Header, Footer, Main Sidebar, aur Info Sidebar ka structure mukammal hai.
-   **Context API:** `DataContext`, `AuthContext`, aur `ThemeContext` poori application ka data, user session, aur theme ko a_chhe se manage kar rahe hain.
-   **Data Persistence:** Application `localStorage` ka istemal kar ke tamam data (vehicles, suppliers, users, etc.) ko browser mein save kar rahi hai.

### Stock & Inventory Management
-   **Vehicle List View:** Tamam gaadiyon ko dekhne, search karne, filter karne, aur sort karne ka interface mukammal hai.
-   **Add New Vehicle:** Import aur Local, dono tarah ki gaadiyon ko add karne ka form mukammal hai.
-   **Edit Vehicle Form:** Maujooda gaadi ki tamam details (core info, costing, status, photos) ko edit karne ka form mukammal hai.
-   **Image Management:** Gaadiyon ki photos upload karna, URL se fetch karna, order change karna, aur delete karna, sab a_chhe se kaam kar raha hai.
-   **Bulk Actions:** Ek saath multiple gaadiyon ko select karke unki details (Location, Status, etc.) badalne ka feature tayyar hai.
-   **Excel Export:** Custom columns aur date range ke saath vehicle data ko Excel file mein export karne ka system mukammal hai.

### Sales & Customer Management
-   **New Sale/Deal Form:** Gaadi select karne se lekar customer ki details daalne, sale price, down payment, aur broker fee tak ka poora process mukammal hai.
-   **Customer Management:** Naye customer add karna aur maujooda customers ki list dekhna, dono features tayyar hain.

### Setup & Providers Management
-   **Supplier Management:** Naye supplier add karna aur maujooda suppliers ko edit karne ke forms mukammal hain.
-   **Clearing / Tracker / Insurance Providers:** In tamam service providers ko add karne aur unki list dekhne ke pages tayyar hain.
-   **Clearing Agent Portal:** Clearing agents ke liye ek alag, aasan sa portal hai jahan woh unko assign ki hui gaadiyan dekh sakte hain.

### Super Admin Panel
-   **User Management:** Naye user banana, unko edit karna, delete karna, aur unko role assign karna, yeh sab mukammal hai.
-   **Module & Feature Manager:** Sidebar ke modules ko hide/rename karna aur AI jaise features ko on/off karna, yeh system tayyar hai.
-   **System Settings:** Company ki basic details (naam, KRA PIN, etc.) ko save karne ka page mukammal hai.
-   **Activity Feed (Audit Log):** Kaun sa user kya kaam kar raha hai, uski live history dekhne ka system tayyar hai.

---

## Kal Ke Liye Mansooba (Tomorrow's Plan & Pending Tasks) 🎯

Yeh woh features hain jin par hum kal kaam shuru karenge. Har feature ka plan neechay tafseel se diya gaya hai.

### **Phase 1: Accounting Module Ko Mukammal Karna**

#### **Task 1.1: Chart of Accounts (COA) View Ko Functional Banana**
-   **Target:** Tomorrow
-   **Khasiyat (Benefit):** Yeh accounting ki buniyaad hai. Iske baghair koi financial entry nahi ho sakti. Hum yahan se company ke tamam financial accounts (Assets, Liabilities, etc.) ko manage karenge.
-   **Amal Karne Ka Tareeka (Implementation Steps):**
    1.  **File:** `src/reports/ChartOfAccounts.tsx` ko open karein.
    2.  **UI Design:**
        -   Ek table banayein jo `chartOfAccounts` data ko `DataContext` se le kar dikhaye.
        -   Table ke columns honge: `Code`, `Account Name`, `Category`.
        -   Accounts ko category (Assets, Liabilities, etc.) ke hisab se group karein. Har group ki ek heading hogi.
        -   Parent accounts ke neechay child accounts ko thora aage karke (indented) dikhayein.
        -   Har row ke aage "Edit" aur "Delete" ke buttons (sirf UI, functionality baad mein).
    3.  **Functionality:**
        -   `useData` hook se `chartOfAccounts` aur `setChartOfAccounts` ko import karein.
        -   Data ko table mein display karein.
        -   Top par ek "+ Add New Account" ka button banayein jo ek modal kholega (Modal component agle step mein banayenge).

#### **Task 1.2: General Journal View Ko Functional Banana**
-   **Target:** Tomorrow
-   **Khasiyat (Benefit):** Yeh CRM ka digital "roznamcha" (daily journal) hoga. Yahan se hum har financial transaction (kharcha, aamdani, etc.) ko double-entry system ke mutabiq record karenge.
-   **Amal Karne Ka Tareeka (Implementation Steps):**
    1.  **File:** `src/reports/GeneralJournal.tsx` ko open karein.
    2.  **UI Design:**
        -   Sabse upar "Create New Journal Entry" ka button banayein.
        -   Neechay ek table mein purani (existing) `journalEntries` dikhayein. Columns: `Date`, `Transaction ID`, `Description`, `Total Debit`, `Total Credit`.
    3.  **New Entry Form (Modal/New View):**
        -   Jab user "Create New" par click karega, ek form khulega.
        -   Form mein fields: `Date`, `Transaction Description`.
        -   Neechay ek table hoga jahan user multiple rows add kar sakega. Har row mein:
            -   `Account`: Dropdown jo `chartOfAccounts` se aayega.
            -   `Description`: Choti si tafseel.
            -   `Debit (KES)`: Input field.
            -   `Credit (KES)`: Input field.
            -   `Delete Row` button.
        -   Form ke neechay `Total Debit` aur `Total Credit` live update honge.
        -   "Save Entry" button tab tak disabled rahega jab tak `Total Debit` aur `Total Credit` barabar na ho jayein.
    4.  **Functionality:**
        -   `useData` se `journalEntries`, `setJournalEntries`, aur `chartOfAccounts` lein.
        -   Form submit hone par, new entry ko `journalEntries` state mein add karein aur `localStorage` mein save karein.

### **Phase 2: Ledgers Aur Reports Ko Zinda Karna**

#### **Task 2.1: Deal Ledger Ko Mukammal Karna**
-   **Target:** Tomorrow
-   **Khasiyat (Benefit):** Har sale ka hisaab kitaab ek jagah. Yahan se hum dekhenge ke customer ne kitne paise diye, kitne baaki hain, aur naye payments add kar sakenge. Is se cash flow manage karna aasan ho jayega.
-   **Amal Karne Ka Tareeka (Implementation Steps):**
    1.  **File:** `src/reports/DealLedger.tsx` ko open karein.
    2.  **Data Fetching:** `vehicleId` prop ka istemal karke `DataContext` se us gaadi ki poori details (`saleDetails` samait) haasil karein.
    3.  **UI Design:**
        -   **Top Section (Summary):** Gaadi ki details (Make, Model, Chassis), Customer ka naam, Total Sale Price, Total Paid, aur Balance Due (Bara aur wazeh).
        -   **Middle Section (Payment History):** Ek table banayein jismein `saleDetails.payments` ki list ho. Columns: `Payment Date`, `Amount`, `Method`, `Notes`.
        -   **Bottom Section (Add New Payment):** Ek chota sa form banayein. Fields: `Payment Date`, `Amount (CurrencyInput)`, `Payment Method`, `Notes`.
    4.  **Functionality:**
        -   "Add Payment" form submit hone par, naya payment object banayein aur usko `vehicles` state mein us gaadi ke `saleDetails.payments` array mein add karein. `setVehicles` call karke state update karein. Balance automatically update ho jayega.
        -   "Print Sales Agreement" aur "Print Delivery Note" ke buttons add karein.

#### **Task 2.2: Printable Sales Agreement Aur Delivery Note Banana**
-   **Target:** Tomorrow
-   **Khasiyat (Benefit):** Professional documents generate karna jo seedha print ho sakein. Is se وقت bachega aur ghaltiyon ka imkaan kam hoga.
-   **Amal Karne Ka Tareeka (Implementation Steps):**
    1.  **Files:** `src/forms/SalesAgreement.tsx` aur `src/reports/CarDeliveryNote.tsx`.
    2.  **Layout:**
        -   Har file mein, ek A4 size jaisa layout banayein. CSS mein `@media print` styles pehle se maujood hain, unka istemal karein.
        -   Company ki details (`systemSettings` se), customer ki details, aur gaadi ki details (vehicle data se) display karein.
        -   Sales Agreement mein sale price, payment terms, aur terms & conditions ke sections banayein.
        -   Delivery Note mein gaadi ki condition (tyres, battery, etc.) check karne ke liye checkboxes aur signature ke liye jagah banayein.
    3.  **Functionality:**
        -   Top par ek "Print" button banayein jo `window.print()` function ko call karega.
        -   Ek "Back to Ledger" button bhi banayein.

### **Phase 3: Chote Forms Aur Final Touches**

#### **Task 3.1: Add Broker Form Ko Mukammal Karna**
-   **Target:** Tomorrow
-   **Khasiyat (Benefit):** Brokers ka record rakhna aasan ho jayega, aur unko sale ke waqt select karna mumkin hoga.
-   **Amal Karne Ka Tareeka (Implementation Steps):**
    1.  **File:** `src/forms/AddBrokerForm.tsx` ko open karein.
    2.  **UI Design:** Ek simple form banayein. Fields: `Broker Name`, `Phone`, `ID Number`, `KRA PIN`.
    3.  **Functionality:**
        -   `useData` se `brokers`, `setBrokers`, `chartOfAccounts`, `setChartOfAccounts` ko import karein.
        -   Form submit hone par:
            -   Ek naya broker object banayein.
            -   Broker ke liye 'Broker Payables' (Code `2015`) ke under ek naya sub-account `chartOfAccounts` mein add karein.
            -   Naye broker ko `brokers` state mein add karein.
            -   User ko success message dikhayein aur broker list par wapas bhej dein.

#### **Task 3.2: Dashboard Widgets Ko Activate Karna**
-   **Target:** Tomorrow
-   **Khasiyat (Benefit):** Dashboard ko sirf buttons ka collection nahi, balke ek a_qelmand (intelligent) tool banana jo business ke baare mein fori maloomat de.
-   **Amal Karne Ka Tareeka (Implementation Steps):**
    1.  **File:** `src/components/Dashboard.tsx` mein `PredictiveAlertsWidget` ke placeholder ko `import` karke a_sal component se replace karein.
    2.  **File:** `src/components/PredictiveAlertsWidget.tsx` ko review karein. Yeh pehle se `mockApi` se data fetch kar raha hai. Iski UI ko behtar banaya ja sakta hai, jaise ke priority ke hisab se alag-alag icons ya colors dikhana.
    3.  Future mein, isko a_sal data (sales, leads) se connect karne ka plan banayenge. Abhi ke liye, isko UI mein sahi se integrate karna hai.
```
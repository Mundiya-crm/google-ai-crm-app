
# Mundiya International CRM

Welcome to the official documentation for the Mundiya International CRM. This application is a professional, multi-featured platform designed to manage vehicle inventory, sales, customers, accounting, and administrative tasks with a powerful, AI-accelerated workflow.

## Project Plan & Roadmap

The development of this CRM followed a structured, phased approach to ensure stability, scalability, and the timely delivery of features. All planned phases are now **100% complete**.

-   **P1: Foundation & Stability:** Established the core architecture, version control, and the Super Admin Panel shell.
-   **P2: Core Super Admin Features:** Built out the entire administrative backend, including user management, role editors, module/feature toggles, and system settings.
-   **P3: AI & Automation:** Integrated powerful AI features like OCR data extraction, a sales assistant, and predictive alerts to automate and enhance workflows.
-   **P4: Business Intelligence:** Developed a KPI dashboard and a custom report builder for data-driven insights.
-   **P5: Marketing Integrations:** Created the framework for connecting to external marketing platforms like WhatsApp and Facebook.
-   **P6: Website & Accounting Sync:** Built the interface for managing data synchronization with external websites and accounting software.
-   **P7: Security, Reliability & Observability:** Implemented granular permissions, a system health monitor, and defined a workflow for automated testing.
-   **P8: Training & Handover:** Prepared a dedicated portal for training materials and project documentation.
-   **P9: DevOps & AI Developer Suite:** Outlined the future vision for an integrated, AI-powered development environment.

---

## Feature Guide: How to Use the CRM

This guide provides step-by-step instructions for using the core features of the application.

### 1. Stock & Inventory Module

#### **Feature: Vehicle Inventory Management**

-   **Khasiyat (Benefit):** This is the central hub for all your vehicles. It provides a powerful interface to search, filter, sort, and perform bulk actions on your entire inventory, saving you time and effort.
-   **How to Use:**
    1.  Click the **Stock** icon in the main sidebar on the left.
    2.  You will land on the **Stock Dashboard**. Click on a supplier to see their stock, or click **"View All Stock Combined"**.
    3.  Use the **Search Bar** at the top to find a vehicle by its Make, Model, Chassis Number, or Stock #.
    4.  Use the **Filters** for Status, Location, and Make to narrow down the list.
    5.  Click on column headers like "Stock #", "Make", or "Year" to **sort** the data.
    6.  Use the **checkboxes** on the left to select multiple vehicles. Once selected, buttons for **"Bulk Edit"** and **"Delete"** will appear.
    7.  Click **"Export to Excel"** to download a custom report of your inventory.

#### **Feature: Adding a New Vehicle**

-   **Khasiyat (Benefit):** A streamlined, intelligent form that adapts based on whether you are adding an imported or a locally purchased vehicle.
-   **How to Use (Manual Entry):**
    1.  From the dashboard or the Vehicle List, click the **"Add New"** button.
    2.  Select either **"Single Import Vehicle"** or **"Single Local Purchase"**.
    3.  The form will open. At the top, confirm the **Purchase Type**.
    4.  Fill in the **Core Details** like Chassis #, Make, and Model. The model dropdown will automatically update based on the selected make.
    5.  In the **Purchase & Costing** section, select a Supplier and their Salesperson. The system will auto-generate the next Stock # for that supplier.
    6.  Enter the cost (C&F for import, Purchase Price for local).
    7.  In the **Photos** section, drag and drop images, upload from your computer, or paste URLs to add vehicle photos. The first image is the main photo.
    8.  Click **"Save Vehicle"** to add it to your inventory.

#### **Feature: AI-Powered Import (OCR Data Extraction)**

-   **Khasiyat (Benefit):** This is a game-changer. Instead of typing everything manually, you can upload a document (like an auction sheet), and the AI will read it and fill out the form for you, reducing data entry time by over 90%.
-   **How to Use:**
    1.  From the dashboard or Vehicle List, click **"Add New"** -> **"Bulk Import Wizard"**.
    2.  Click **"Upload Document"** and select an image of your auction sheet or invoice.
    3.  Wait a few moments as the AI analyzes the document.
    4.  A **Review Panel** will appear with all the extracted data (Chassis, Make, Model, etc.) and a confidence score for each field.
    5.  Check the data for any errors and make corrections if needed. You must select a **Supplier**.
    6.  Click **"Confirm and Create Vehicle"**. The vehicle is now in your inventory.

---

### 2. Sales Module

#### **Feature: Creating a New Sale / Deal**

-   **Khasiyat (Benefit):** A single, comprehensive form that handles every aspect of a vehicle sale, from customer details and pricing to payments and broker fees. The live financial summary shows your profit instantly.
-   **How to Use:**
    1.  Click the **Sales** icon in the sidebar or the **"Sell (Deal)"** button on the dashboard.
    2.  **Step 1: Select Vehicle:** Choose an "Available" vehicle from the dropdown list.
    3.  **Step 2: Customer Information:** Select an existing customer or fill in the form to create a new one on the spot.
    4.  **Step 3: Sale & Payment Details:** Enter the **Vehicle Sale Price**, the **Payment Method** (Cash or HP), and any **Down Payment** received.
    5.  If a broker was involved, select them and enter their **Broker Fee**.
    6.  On the right, the **Financial Summary** will automatically update to show you the Total Invoice and Gross Profit.
    7.  Click **"Finalize Sale"**. The vehicle status will change to "Sold", and you will be redirected to the Deal Ledger to manage payments.

#### **Feature: AI Sales Assistant**

-   **Khasiyat (Benefit):** Helps you manage leads more effectively. It provides AI-generated reply suggestions, allowing you to respond to customer inquiries faster and more professionally.
-   **How to Use:**
    1.  Click the **"Sales Assistant"** button on the dashboard.
    2.  On the left, you'll see a list of your current **Leads**. Click on one to open the conversation.
    3.  The main panel shows the **Timeline** of your conversation with the customer.
    4.  To get help, click the **"Suggest Reply with AI"** button.
    5.  The AI will analyze the conversation and suggest a suitable response. You can use it as is, edit it, or ignore it.
    6.  Type your own message in the text box and click **"Send"** to log it in the timeline.

---

### 3. Super Admin Panel

This is the control center for the entire application, accessible only to users with 'admin' privileges.

#### **Feature: User & Role Management**

-   **Khasiyat (Benefit):** Full control over who can access the CRM and what they can do. You can create users, assign roles, and even define the permissions for each role.
-   **How to Use:**
    1.  Click the **Admin** icon in the sidebar, then click **"User Management"**.
    2.  To add a user, click **"+ Add New User"**. Fill in their details, set a password, and assign a role (e.g., Sales).
    3.  To edit a user, click **"Edit"** in the user list.
    4.  To define what each role can do, go to the **"Role & Permission Editor"**. Select a role (e.g., Sales Team) and check/uncheck the permissions you want to grant. Click **"Save Changes"**.

#### **Feature: Module & Feature Manager**

-   **Khasiyat (Benefit):** Customize the CRM to fit your exact business process. Hide modules you don't use or rename them to match your company's language. Turn advanced features on or off with a simple toggle.
-   **How to Use:**
    1.  In the Admin Panel, click **"Module Manager"**.
    2.  To hide a module (e.g., Reports), uncheck its box. To rename "Stock" to "Inventory", simply change the text in its input field. Click **Save**.
    3.  Go to **"Feature Manager"**. Use the toggle switches to enable or disable features like the "AI Sales Assistant". Click **Save**.

#### **Feature: System Settings & Activity Feed**

-   **Khasiyat (Benefit):** Configure core company information in one place and maintain a complete, unchangeable audit trail of every important action taken in the system for security and accountability.
-   **How to Use:**
    1.  In the Admin Panel, go to **"System Settings"** to update your company name, KRA PIN, address, etc.
    2.  Go to the **"Activity Feed"** to see a live log of all actions, such as user logins, vehicle creations, sales finalization, and permission changes. Use the filters to investigate activity by a specific user or date range.

---

### 4. Customization (Themes)

-   **Khasiyat (Benefit):** Personalize the look and feel of the CRM to your liking.
-   **How to Use:**
    1.  In the footer at the bottom of the page, click the **"My Options"** tab.
    2.  Use the **"Theme / Style"** dropdown to choose from a variety of dark and light themes (e.g., Aero, Sleek Carbon, Classic Light).
    3.  Use the **"Button Style"** dropdown to choose between sharp or rounded buttons.
    4.  Your selection is saved automatically and will be remembered the next time you log in.


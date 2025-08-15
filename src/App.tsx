
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useData } from './context/DataContext';
import { Header } from './components/Header';
import { InfoSidebar } from './components/InfoSidebar';
import { Footer } from './components/Footer';
import { LoginPage } from './pages/LoginPage';
import { MainSidebar, ModuleKey } from './components/Sidebar';
// Statically import all view components
import { Dashboard } from './components/Dashboard';
import { VehicleListView } from './pages/VehicleListView';
import { SellVehicleForm } from './forms/SellVehicleForm';
import { CustomerListView } from './pages/CustomerListView';
import { AddCustomerForm } from './forms/AddNewCustomerForm';
import { PaymentManagementView } from './pages/PaymentManagementView';
import { DealLedger } from './reports/DealLedger';
import { InsuranceLedger } from './reports/InsuranceLedger';
import { BrokerListView } from './pages/BrokerListView';
import { AddBrokerForm } from './forms/AddBrokerForm';
import { BrokerLedger } from './reports/BrokerLedger';
import { AccountingDashboard } from './layouts/AccountingDashboard';
import { ChartOfAccounts } from './reports/ChartOfAccounts';
import { GeneralJournal } from './reports/GeneralJournal';
import { SupplierListView } from './pages/SupplierListView';
import { AddNewSupplierForm } from './forms/AddNewSupplierForm';
import { ClearingAgentListView } from './pages/ClearingAgentListView';
import { AddClearingAgentForm } from './forms/AddClearingAgentForm';
import { TrackerAgentListView } from './pages/TrackerAgentListView';
import { AddTrackerAgentForm } from './forms/AddTrackerAgentForm';
import { InsuranceCompanyListView } from './pages/InsuranceCompanyListView';
import { AddInsuranceCompanyForm } from './forms/AddInsuranceCompanyForm';
import { SalesAgreement } from './forms/SalesAgreement';
import { CarDeliveryNote } from './reports/CarDeliveryNote';
import { TrackerLedger } from './reports/TrackerLedger';
import { VehicleImportWizard } from './forms/VehicleImportWizard';
import { VehicleCostingReport } from './pages/VehicleCostingReport';
import { RecurringExpensesView } from './pages/RecurringExpensesView';
import { UserManagementView } from './pages/UserManagementView';
import { SystemResetView } from './pages/SystemResetView';
import { AdminPanelDashboard } from './pages/AdminPanelDashboard';
import { ProjectRoadmapView } from './pages/ProjectRoadmapView';
import { SalesAssistantView } from './pages/SalesAssistantView';
import { RolePermissionEditor } from './pages/RolePermissionEditor';
import { ActivityFeedView } from './pages/ActivityFeedView';
import { KpiDashboardView } from './pages/KpiDashboardView';
import { ReportBuilderView } from './pages/ReportBuilderView';
import { SystemSettingsView } from './pages/SystemSettingsView';
import { ModuleManagerView } from './pages/ModuleManagerView';
import { FeatureManagerView } from './pages/FeatureManagerView';
import { MarketingIntegrationsView } from './pages/MarketingIntegrationsView';
import { SyncCenterView } from './pages/SyncCenterView';
import { SystemHealthView } from './pages/SystemHealthView';
import { ApiTesterView } from './pages/ApiTesterView';
import { LanguageManagerView } from './pages/LanguageManagerView';
import { AutomatedTestingView } from './pages/AutomatedTestingView';
import { TrainingView } from './pages/TrainingView';
import { DevOpsSuiteView } from './pages/DevOpsSuiteView';
import { LoadingScreen } from './components/LoadingScreen';
import { AddNewVehicleForm } from './forms/AddNewVehicleForm';
import { EditVehicleForm } from './forms/EditVehicleForm';
import { EditSupplierForm } from './forms/EditSupplierForm';
import { EditClearingAgentForm } from './forms/EditClearingAgentForm';
import { StockDashboard } from './pages/StockDashboard';
import { ClearingDashboard } from './pages/ClearingDashboard';
import { ClearingStatusView } from './pages/ClearingStatusView';
import { ClearingAgentPortal } from './pages/ClearingAgentPortal';

type View = 
  | 'dashboard' | 'vehicles' | 'add_vehicle' | 'edit_vehicle' | 'sell'
  | 'customers' | 'add_customer' | 'payment_management' | 'deal_ledger' | 'accounting' 
  | 'chart_of_accounts' | 'general_journal'
  | 'vendors' | 'add_supplier' | 'edit_supplier'
  | 'clearing' | 'add_clearing_agent' | 'edit_clearing_agent' | 'clearing_dashboard' | 'clearing_status'
  | 'tracker' | 'add_tracker_agent' | 'tracker_ledger' | 'insurance' | 'add_insurance_company' | 'insurance_ledger'
  | 'brokers' | 'add_broker' | 'broker_ledger' | 'sales_agreement' | 'car_delivery_note' | 'import_data'
  | 'all_costing' | 'local_costing' | 'import_costing'
  | 'recurring_expenses' | 'user_management' | 'system_data_reset'
  | 'stock_dashboard'
  | 'admin_panel_dashboard' | 'project_roadmap' | 'sales_assistant' | 'role_permission_editor' | 'activity_feed'
  | 'kpi_dashboard' | 'report_builder' | 'system_settings' | 'module_manager' | 'feature_manager' | 'marketing_integrations' | 'sync_center'
  | 'system_health' | 'api_tester' | 'language_manager' | 'automated_testing' | 'training' | 'devops_suite';

export const App: React.FC = () => {
    const { user } = useAuth();
    const { isLoading } = useData();
    const [view, setView] = useState<View>('dashboard');
    const [queryParams, setQueryParams] = useState<Record<string, any>>({});
    const [activeModule, setActiveModule] = useState<ModuleKey>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isInfoSidebarCollapsed, setIsInfoSidebarCollapsed] = useState(false);


    const handleSetView = (newView: any, params: Record<string, any> = {}) => {
        setView(newView);
        setQueryParams(params);
    };

    const renderView = () => {
        if(user?.role === 'clearing_agent') {
            return <ClearingAgentPortal />;
        }
        switch (view) {
            case 'dashboard': return <Dashboard setView={handleSetView} setActiveModule={setActiveModule} />;
            case 'vehicles': return <VehicleListView setView={handleSetView} filter={queryParams.filter || 'all'} {...queryParams} />;
            case 'add_vehicle': return <AddNewVehicleForm setView={handleSetView} {...queryParams} />;
            case 'edit_vehicle': return <EditVehicleForm setView={handleSetView} vehicleId={queryParams.id} />;
            case 'sell': return <SellVehicleForm setView={handleSetView} chassis={queryParams.chassis} />;
            case 'customers': return <CustomerListView setView={handleSetView} />;
            case 'add_customer': return <AddCustomerForm setView={handleSetView} />;
            case 'payment_management': return <PaymentManagementView setView={handleSetView} />;
            case 'deal_ledger': return <DealLedger setView={handleSetView} vehicleId={queryParams.id} />;
            case 'accounting': return <AccountingDashboard setView={handleSetView} />;
            case 'chart_of_accounts': return <ChartOfAccounts setView={handleSetView} />;
            case 'general_journal': return <GeneralJournal setView={handleSetView} />;
            case 'vendors': return <SupplierListView setView={handleSetView} />;
            case 'add_supplier': return <AddNewSupplierForm setView={handleSetView} />;
            case 'edit_supplier': return <EditSupplierForm setView={handleSetView} supplierId={queryParams.id} />;
            case 'clearing': return <ClearingAgentListView setView={handleSetView} />;
            case 'add_clearing_agent': return <AddClearingAgentForm setView={handleSetView} />;
            case 'edit_clearing_agent': return <EditClearingAgentForm setView={handleSetView} agentId={queryParams.id} />;
            case 'clearing_dashboard': return <ClearingDashboard setView={handleSetView} />;
            case 'clearing_status': return <ClearingStatusView setView={handleSetView} {...queryParams} />;
            case 'tracker': return <TrackerAgentListView setView={handleSetView} />;
            case 'add_tracker_agent': return <AddTrackerAgentForm setView={handleSetView} />;
            case 'insurance': return <InsuranceCompanyListView setView={handleSetView} />;
            case 'add_insurance_company': return <AddInsuranceCompanyForm setView={handleSetView} />;
            case 'insurance_ledger': return <InsuranceLedger setView={handleSetView} accountCode={queryParams.accountCode} companyName={queryParams.companyName} />;
            case 'brokers': return <BrokerListView setView={handleSetView} />;
            case 'add_broker': return <AddBrokerForm setView={handleSetView} />;
            case 'broker_ledger': return <BrokerLedger setView={handleSetView} accountCode={queryParams.accountCode} companyName={queryParams.companyName} />;
            case 'tracker_ledger': return <TrackerLedger setView={handleSetView} accountCode={queryParams.accountCode} companyName={queryParams.companyName} />;
            case 'sales_agreement': return <SalesAgreement setView={handleSetView} vehicleId={queryParams.id} />;
            case 'car_delivery_note': return <CarDeliveryNote setView={handleSetView} vehicleId={queryParams.id} />;
            case 'import_data': return <VehicleImportWizard setView={handleSetView} />;
            case 'all_costing': return <VehicleCostingReport setView={handleSetView} filter="all" />;
            case 'local_costing': return <VehicleCostingReport setView={handleSetView} filter="local" />;
            case 'import_costing': return <VehicleCostingReport setView={handleSetView} filter="import" />;
            case 'recurring_expenses': return <RecurringExpensesView setView={handleSetView} />;
            case 'user_management': return <UserManagementView setView={handleSetView} />;
            case 'system_data_reset': return <SystemResetView setView={handleSetView} />;
            case 'stock_dashboard': return <StockDashboard setView={handleSetView} {...queryParams} />;
            case 'admin_panel_dashboard': return <AdminPanelDashboard setView={handleSetView} />;
            case 'project_roadmap': return <ProjectRoadmapView setView={handleSetView} />;
            case 'sales_assistant': return <SalesAssistantView setView={handleSetView} />;
            case 'role_permission_editor': return <RolePermissionEditor setView={handleSetView} />;
            case 'activity_feed': return <ActivityFeedView setView={handleSetView} />;
            case 'kpi_dashboard': return <KpiDashboardView setView={handleSetView} />;
            case 'report_builder': return <ReportBuilderView setView={handleSetView} />;
            case 'system_settings': return <SystemSettingsView setView={handleSetView} />;
            case 'module_manager': return <ModuleManagerView setView={handleSetView} />;
            case 'feature_manager': return <FeatureManagerView setView={handleSetView} />;
            case 'marketing_integrations': return <MarketingIntegrationsView setView={handleSetView} />;
            case 'sync_center': return <SyncCenterView setView={handleSetView} />;
            case 'system_health': return <SystemHealthView setView={handleSetView} />;
            case 'api_tester': return <ApiTesterView setView={handleSetView} />;
            case 'language_manager': return <LanguageManagerView setView={handleSetView} />;
            case 'automated_testing': return <AutomatedTestingView setView={handleSetView} />;
            case 'training': return <TrainingView setView={handleSetView} />;
            case 'devops_suite': return <DevOpsSuiteView setView={handleSetView} />;
            default: return <Dashboard setView={handleSetView} setActiveModule={setActiveModule} />;
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!user) {
        return <LoginPage />;
    }
    
    if (user.role === 'clearing_agent') {
        return <ClearingAgentPortal />;
    }

    return (
        <div className="h-screen flex flex-col font-sans bg-primary text-primary">
            <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="flex flex-1 overflow-hidden">
                <MainSidebar activeModule={activeModule} setActiveModule={setActiveModule} setView={handleSetView} />
                <div className="flex-1 flex flex-row">
                    <main className="flex-1 p-4 bg-primary overflow-auto">
                        {renderView()}
                    </main>
                    <InfoSidebar 
                        activeModule={activeModule} 
                        currentView={view} 
                        queryParams={queryParams}
                        setView={handleSetView} 
                        isCollapsed={isInfoSidebarCollapsed}
                        setIsCollapsed={setIsInfoSidebarCollapsed}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

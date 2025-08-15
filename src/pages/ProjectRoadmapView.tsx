import React from 'react';

// Data from the user's script
const phases = {
    "P1: Foundation & Stability": [ "Requirements & Specification Lock", "Modular Architecture Setup", "Version Control & Backup System", "Super Admin Panel Shell" ],
    "P2: Core Super Admin Features": [ "Module Manager", "Feature Manager", "User Management", "System Settings", "Data Management", "UI Upgrades: Search & Filter", "UI Upgrades: Collapsible Sidebar", "UI Upgrades: Dark Mode & Theme", "Activity Feed (Live Audit)", "Role & Permission Editor", "Integrated API Tester", "Multi-language Management" ],
    "P3: AI & Automation": [ "AI OCR Data Extraction", "AI Sales Assistant", "Predictive Alerts" ],
    "P4: Business Intelligence": [ "Interactive KPI Dashboard", "Custom Report Builder" ],
    "P5: Marketing Integrations": [ "WhatsApp Business API", "Facebook Page Posting", "Google Business Profile Posting" ],
    "P6: Website & Accounting Sync": [ "Website Sync (Live + Import/Export)", "QuickBooks/Xero Sync (Import/Export)" ],
    "P7: Security, Reliability & Observability": [ "Granular Permissions", "Automated Testing & Rollback", "System Health & Performance Monitor" ],
    "P8: Training & Handover": [ "Training (Videos + Guides)", "Final Handover (Source + Docs)" ],
    "P9: DevOps & AI Developer Suite": [ "AI Code Editor (VS Code Lite)", "AI Code Generator & Fixer", "Real-time Code Review Bot", "One-click Staging & Production Deploy", "Auto Unit/Integration Tests & Bug Simulation", "Plugin/Module Marketplace", "No-code Webhook & Automation Builder" ]
};

const archNodes: {[key: string]: [number, number]} = {
    "Admins": [-9, 4], "Sales/Staff": [-9, 2], "Super Admin Panel (SPA Frontend)": [-6, 3], "CRM Core API (Backend)": [-2, 3], "DB: PostgreSQL": [1, 4], "File Storage": [1, 2], "AI Services (Gemini)": [-2, 0.5], "AI OCR": [-4, 0.5], "AI Sales Assistant": [-2, -1], "Predictive Engine": [0, 0.5], "WhatsApp Business API": [4, 4.5], "Facebook Graph API": [4, 3], "Google Business Profile API": [4, 1.5], "Public Website": [7, 3.5], "QuickBooks/Xero": [7, 1.5], "Git Repo": [-9, -2], "CI/CD Pipeline": [-6, -2], "Staging Environment": [-2, -2], "Production Environment": [2, -2], "Observability (Logs/Monitor)": [5, -2]
};

const archEdges: [string, string][] = [
    // User Flow
    ["Admins", "Super Admin Panel (SPA Frontend)"],
    ["Sales/Staff", "Super Admin Panel (SPA Frontend)"],
    ["Super Admin Panel (SPA Frontend)", "CRM Core API (Backend)"],
    // Core Backend Connections
    ["CRM Core API (Backend)", "DB: PostgreSQL"],
    ["CRM Core API (Backend)", "File Storage"],
    ["CRM Core API (Backend)", "AI Services (Gemini)"],
    // AI Services Breakdown
    ["AI Services (Gemini)", "AI OCR"],
    ["AI Services (Gemini)", "AI Sales Assistant"],
    ["AI Services (Gemini)", "Predictive Engine"],
    // External Integrations
    ["CRM Core API (Backend)", "WhatsApp Business API"],
    ["CRM Core API (Backend)", "Facebook Graph API"],
    ["CRM Core API (Backend)", "Google Business Profile API"],
    ["CRM Core API (Backend)", "Public Website"],
    ["CRM Core API (Backend)", "QuickBooks/Xero"],
    // DevOps Flow
    ["Git Repo", "CI/CD Pipeline"],
    ["CI/CD Pipeline", "Staging Environment"],
    ["Staging Environment", "Production Environment"],
    ["Production Environment", "Observability (Logs/Monitor)"],
];


const devopsSteps = [ "Plan (Roadmap/Issues)", "AI Code Editor (Implement)", "Real-time Code Review Bot", "Auto Tests (Unit/Integration)", "Build & Package", "Deploy to Staging", "QA & Approval", "One-click Deploy to Production", "Monitor & Logs", "Rollback if Needed" ];

const Section: React.FC<{title: string, subtitle: string, children: React.ReactNode}> = ({title, subtitle, children}) => (
    <div className="bg-secondary p-4 rounded-lg border border-primary shadow-lg">
        <div className="border-b border-primary/50 pb-3 mb-4">
            <h2 className="text-xl font-bold text-primary">{title}</h2>
            <p className="text-sm text-secondary">{subtitle}</p>
        </div>
        {children}
    </div>
);

const featureToViewMap: Record<string, string> = {
    // P1
    'Requirements & Specification Lock': 'project_roadmap',
    'Modular Architecture Setup': 'project_roadmap',
    'Version Control & Backup System': 'project_roadmap',
    'Super Admin Panel Shell': 'admin_panel_dashboard',
    // P2
    'Module Manager': 'module_manager',
    'Feature Manager': 'feature_manager',
    'User Management': 'user_management',
    'System Settings': 'system_settings',
    'Data Management': 'system_data_reset',
    'UI Upgrades: Search & Filter': 'vehicles',
    'UI Upgrades: Collapsible Sidebar': 'dashboard',
    'UI Upgrades: Dark Mode & Theme': 'dashboard',
    'Activity Feed (Live Audit)': 'activity_feed',
    'Role & Permission Editor': 'role_permission_editor',
    'Integrated API Tester': 'api_tester',
    'Multi-language Management': 'language_manager',
    // P3
    'AI OCR Data Extraction': 'import_data',
    'AI Sales Assistant': 'sales_assistant',
    'Predictive Alerts': 'dashboard',
    // P4
    'Interactive KPI Dashboard': 'kpi_dashboard',
    'Custom Report Builder': 'report_builder',
    // P5
    'WhatsApp Business API': 'marketing_integrations',
    'Facebook Page Posting': 'marketing_integrations',
    'Google Business Profile Posting': 'marketing_integrations',
    // P6
    'Website Sync (Live + Import/Export)': 'sync_center',
    'QuickBooks/Xero Sync (Import/Export)': 'sync_center',
    // P7
    'Granular Permissions': 'role_permission_editor',
    'Automated Testing & Rollback': 'automated_testing',
    'System Health & Performance Monitor': 'system_health',
    // P8
    'Training (Videos + Guides)': 'training',
    'Final Handover (Source + Docs)': 'training',
    // P9
    'AI Code Editor (VS Code Lite)': 'devops_suite',
    'AI Code Generator & Fixer': 'devops_suite',
    'Real-time Code Review Bot': 'devops_suite',
    'One-click Staging & Production Deploy': 'devops_suite',
    'Auto Unit/Integration Tests & Bug Simulation': 'devops_suite',
    'Plugin/Module Marketplace': 'devops_suite',
    'No-code Webhook & Automation Builder': 'devops_suite'
};


export const ProjectRoadmapView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    
    const canvasWidth = 1800;
    const canvasHeight = 1000;
    const padding = 100;

    const nodeKeys = Object.keys(archNodes);
    const coords = Object.values(archNodes);
    const minX = Math.min(...coords.map(c => c[0]));
    const maxX = Math.max(...coords.map(c => c[0]));
    const minY = Math.min(...coords.map(c => c[1]));
    const maxY = Math.max(...coords.map(c => c[1]));
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;

    const mapCoords = (x: number, y: number): [number, number] => {
        const canvasX = padding + ((x - minX) / rangeX) * (canvasWidth - 2 * padding);
        const canvasY = padding + ((maxY - y) / rangeY) * (canvasHeight - 2 * padding);
        return [canvasX, canvasY];
    };

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-primary">Project Plan & Architecture</h1>
                 <button type="button" onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs px-3 py-1">&larr; Back to Admin Panel</button>
            </div>
            
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                <Section title="Updated Phase Roadmap (v2)" subtitle="High-level project phases and key deliverables. Click an item to navigate.">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(phases).map(([phase, steps]) => (
                            <div key={phase} className="bg-primary border border-secondary p-3 rounded-md">
                                <h3 className="font-bold text-primary text-sm mb-2">{phase}</h3>
                                <ul className="space-y-1.5">
                                    {steps.map(step => {
                                        const view = featureToViewMap[step];
                                        const isCompleted = !!view; // If a view exists, it's considered complete
                                        
                                        const content = isCompleted ? (
                                             <button 
                                                onClick={() => setView(view)} 
                                                className="text-xs text-primary hover:text-accent hover:underline text-left transition-colors"
                                            >
                                                {step}
                                            </button>
                                        ) : (
                                            <span className="text-xs text-secondary/70">
                                                {step}
                                            </span>
                                        );

                                        return (
                                            <li key={step} className="flex items-center gap-2">
                                                <span className={`${isCompleted ? 'text-green-400' : 'text-secondary/50'} font-bold text-sm`} aria-label={isCompleted ? "Completed" : "Planned"}>
                                                    {isCompleted ? '✓' : '○'}
                                                </span>
                                                {content}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Section>
                
                <Section title="System Architecture & Data Flow" subtitle="Visual representation of the CRM's components and integrations.">
                    <div className="w-full h-[550px] bg-primary border border-secondary rounded-md overflow-auto">
                        <div className="relative inline-block">
                            <svg width={canvasWidth} height={canvasHeight} className="block bg-primary">
                                <defs>
                                    <marker id="arrowhead" markerWidth="25" markerHeight="20" refX="24.5" refY="10" orient="auto" markerUnits="userSpaceOnUse">
                                        <polygon points="0 0, 25 10, 0 20" className="fill-accent" />
                                    </marker>
                                </defs>
                                {archEdges.map(([start, end]) => {
                                    if (!archNodes[start] || !archNodes[end]) return null;
                                    const [x1, y1] = mapCoords(archNodes[start][0], archNodes[start][1]);
                                    const [x2, y2] = mapCoords(archNodes[end][0], archNodes[end][1]);
                                    
                                    return (
                                        <line
                                            key={`${start}-${end}`}
                                            x1={x1}
                                            y1={y1}
                                            x2={x2}
                                            y2={y2}
                                            className="stroke-accent"
                                            strokeWidth="5"
                                            strokeOpacity="0.8"
                                            markerEnd="url(#arrowhead)"
                                        />
                                    );
                                })}
                            </svg>
                            {nodeKeys.map(key => {
                                const [x, y] = mapCoords(archNodes[key][0], archNodes[key][1]);
                                return (
                                    <div 
                                        key={key} 
                                        className="absolute p-2 bg-tertiary border border-primary/50 rounded-md shadow-lg text-center"
                                        style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)', width: '160px' }}
                                    >
                                        <p className="text-xs font-semibold text-primary">{key}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Section>

                <Section title="DevOps & Release Workflow (AI-Accelerated)" subtitle="The end-to-end process for developing, testing, and deploying new features.">
                   <div className="flex flex-wrap items-center gap-2 p-4 bg-primary border border-secondary rounded-md">
                       {devopsSteps.map((step, index) => (
                           <React.Fragment key={step}>
                               <div className="bg-tertiary text-primary text-xs font-semibold p-2 rounded-md shadow">
                                   {step}
                               </div>
                               {index < devopsSteps.length - 1 && (
                                   <div className="text-accent font-bold text-lg">&rarr;</div>
                               )}
                           </React.Fragment>
                       ))}
                   </div>
                </Section>
            </div>
        </div>
    );
};
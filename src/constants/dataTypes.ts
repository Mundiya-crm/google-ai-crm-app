export interface Lead {
    id: number;
    customerName: string;
    vehicleOfInterest: string; // e.g., "Toyota Vitz 2017"
    lastContacted: string;
    status: 'New' | 'Contacted' | 'Follow-up' | 'Closed';
}

export interface TimelineEvent {
    id: number;
    leadId: number;
    timestamp: string;
    type: 'USER_MESSAGE' | 'AI_SUGGESTION' | 'SYSTEM_NOTE';
    content: string;
    author: string; // "System", "AI Assistant", or user's name
}

export interface Alert {
    id: string;
    type: 'TREND' | 'LEAD' | 'FOLLOW_UP';
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    relatedEntityId?: number; // e.g., Lead ID
}

export interface AuditLog {
    id: string;
    timestamp: string;
    userName: string;
    userId: number;
    action: string; 
    details: string; 
    entityType?: 'vehicle' | 'user' | 'sale' | 'permissions' | 'provider';
    entityId?: number | string;
}

export interface SystemSettings {
    companyName: string;
    kraPin: string;
    address: string;
    defaultCurrency: 'KES' | 'USD';
    financialYearStart: string; // "MM-DD" format
}

export interface FeatureFlags {
    aiSalesAssistant: boolean;
    predictiveAlerts: boolean;
}

export interface ModuleConfig {
    key: string;
    label: string;
    visible: boolean;
}

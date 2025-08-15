

import { Permission, ROLE_PERMISSIONS, Role } from "./permissions";

export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  role: Role;
  permissions: Permission[];
  clearingAgentId?: string;
}

export const usersData: User[] = [
    { id: 1, email: 'admin@mundiya.com', password: 'password', name: 'Admin User', role: 'admin', permissions: ROLE_PERMISSIONS.admin },
    { id: 2, email: 'sales@mundiya.com', password: 'password', name: 'Default Sales', role: 'sales', permissions: ROLE_PERMISSIONS.sales },
    { id: 3, email: 'john.doe@mundiya.com', password: 'password', name: 'John Doe', role: 'sales', permissions: ROLE_PERMISSIONS.sales },
    { id: 4, email: 'clearing@mundiya.com', password: 'password', name: 'Michael Omondi', role: 'clearing_agent', permissions: ROLE_PERMISSIONS.clearing_agent, clearingAgentId: 'senator_one' },
];


import React, { createContext, useContext, ReactNode } from 'react';
import { useData } from './DataContext';
import { User } from '../constants/usersData';
import { Permission, Role } from '../constants/permissions';
import useLocalStorage from '../hooks/useLocalStorage';

// The User interface is now imported from usersData to include permissions
// We only need to redefine it here without the password for context usage
export type AuthenticatedUser = Omit<User, 'password'>;

interface AuthContextType {
  user: AuthenticatedUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthenticatedUser | null>>;
  login: (email: string, password: string) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useLocalStorage<AuthenticatedUser | null>('crm_auth_user_v1', null);
  const { users, roles } = useData();

  const login = (email: string, password: string) => {
    const foundUser = users.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && foundUser.password === password) {
       // Dynamically assign permissions based on role from the central roles state
      const userPermissions = roles[foundUser.role] || [];
      const userWithLatestPermissions = { ...foundUser, permissions: userPermissions };

      const { password: discardedPassword, ...userToSet } = userWithLatestPermissions;
      setUser(userToSet);
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (permission: Permission): boolean => {
    if (user?.role === 'admin') return true; // Admin always has all permissions
    return user?.permissions.includes(permission) ?? false;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

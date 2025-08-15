
import React, { useState, useEffect, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Role, Permission, ALL_PERMISSIONS } from '../constants/permissions';
import { useLogger } from '../hooks/useLogger';

const rolesToShow: { id: Role, name: string }[] = [
    { id: 'admin', name: 'Administrator' },
    { id: 'sales', name: 'Sales Team' },
    { id: 'clearing_agent', name: 'Clearing Agent' },
];

export const RolePermissionEditor: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const { roles, setRoles, users, setUsers } = useData();
    const { user: currentUser, setUser: setCurrentUser, hasPermission } = useAuth();
    const { logActivity } = useLogger();
    const [selectedRole, setSelectedRole] = useState<Role>('sales');
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (roles[selectedRole]) {
            setPermissions(roles[selectedRole]);
        }
    }, [selectedRole, roles]);

    const permissionGroups = useMemo(() => {
        return ALL_PERMISSIONS.reduce((acc, permission) => {
            acc[permission.category] = acc[permission.category] || [];
            acc[permission.category].push(permission);
            return acc;
        }, {} as Record<string, typeof ALL_PERMISSIONS>);
    }, []);

    const handlePermissionChange = (permission: Permission, isChecked: boolean) => {
        if (selectedRole === 'admin') return; // Prevent editing admin role
        setPermissions(prev => 
            isChecked ? [...prev, permission] : prev.filter(p => p !== permission)
        );
    };

    const handleSave = () => {
        setIsLoading(true);
        setMessage('');

        // 1. Update roles state in DataContext
        const newRoles = { ...roles, [selectedRole]: permissions };
        setRoles(newRoles);

        // 2. Update permissions for all users with this role in DataContext
        const updatedUsers = users.map(u => 
            u.role === selectedRole ? { ...u, permissions: permissions } : u
        );
        setUsers(updatedUsers);

        // 3. Update current user in AuthContext if their role was the one edited
        if (currentUser && currentUser.role === selectedRole) {
            setCurrentUser({ ...currentUser, permissions: permissions });
        }
        
        logActivity('PERMISSIONS_UPDATED', `updated permissions for the '${selectedRole}' role`, 'permissions', selectedRole);

        setIsLoading(false);
        setMessage(`Permissions for ${selectedRole} role updated successfully!`);
        setTimeout(() => setMessage(''), 3000);
    };
    
    const isSaveChangesDisabled = selectedRole === 'admin' || isLoading;

    return (
        <div className="bg-secondary p-4 rounded-lg border border-primary shadow-lg h-full flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">Role & Permission Editor</h2>
                <button onClick={() => setView('admin_panel_dashboard')} className="btn-secondary text-xs">&larr; Back to Admin Panel</button>
            </div>
            
            <div className="flex-grow flex gap-4 min-h-0">
                {/* Role List */}
                <div className="w-1/4 bg-primary rounded-lg p-2 flex flex-col">
                    <h3 className="text-lg font-bold text-primary p-2">Roles</h3>
                    <div className="flex-grow overflow-y-auto space-y-1">
                        {rolesToShow.map(role => (
                            <button 
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className={`w-full text-left p-3 rounded-lg transition-colors text-sm font-semibold ${selectedRole === role.id ? 'bg-accent/20 text-accent' : 'text-primary hover:bg-tertiary/50'}`}
                            >
                                {role.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Permission Editor */}
                <div className="w-3/4 bg-primary rounded-lg p-4 flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-primary">
                            Editing Permissions for: <span className="text-accent">{rolesToShow.find(r => r.id === selectedRole)?.name}</span>
                        </h3>
                        {selectedRole === 'admin' && (
                             <p className="text-xs text-yellow-400 mt-1">The Administrator role has all permissions enabled by default and cannot be modified.</p>
                        )}
                    </div>

                    <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                        {Object.entries(permissionGroups).map(([category, perms]) => (
                            <div key={category}>
                                <h4 className="font-bold text-primary border-b border-secondary/50 pb-1 mb-2">{category}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                    {perms.map(p => (
                                        <label key={p.id} className="flex items-center gap-2 text-sm text-primary p-1 rounded-md hover:bg-tertiary/50 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={permissions.includes(p.id)}
                                                onChange={(e) => handlePermissionChange(p.id, e.target.checked)}
                                                disabled={selectedRole === 'admin'}
                                                className="h-4 w-4 rounded bg-tertiary border-primary text-accent focus:ring-accent disabled:opacity-50"
                                            />
                                            {p.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end items-center gap-3 pt-3 border-t border-secondary mt-auto">
                         {message && <div className="text-sm font-semibold text-green-400">{message}</div>}
                        <button onClick={handleSave} disabled={isSaveChangesDisabled} className="btn-primary">
                            {isLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

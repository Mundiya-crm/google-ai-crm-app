
import React, { useState, useEffect, useMemo } from 'react';
import { User } from '../constants/usersData';
import { useData } from '../context/DataContext';
import { Role, Permission, ALL_PERMISSIONS, ROLE_PERMISSIONS } from '../constants/permissions';
import { useLogger } from '../hooks/useLogger';

interface UserEditModalProps {
    user: User | null;
    onClose: () => void;
    onSave: (user: User) => void;
}

const initialFormState: Omit<User, 'id' | 'permissions'> = {
    name: '',
    email: '',
    password: '',
    role: 'sales',
    clearingAgentId: undefined,
};

export const UserEditModal: React.FC<UserEditModalProps> = ({ user, onClose, onSave }) => {
    const { clearingAgents } = useData();
    const { logActivity } = useLogger();
    const [formData, setFormData] = useState<Omit<User, 'id' | 'permissions'>>(initialFormState);
    
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                password: '', // Password should be empty for security, only set if changed
                role: user.role,
                clearingAgentId: user.clearingAgentId,
            });
        } else {
            setFormData(initialFormState);
        }
    }, [user]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Password validation for new users
        if (!user && !formData.password) {
            alert('Password is required for new users.');
            return;
        }

        const permissions = ROLE_PERMISSIONS[formData.role] || [];
        
        let finalUserData = {
            ...user, // This includes the original ID if it exists
            ...formData,
            permissions
        };

        // If password field is empty during an edit, don't change the password
        if (user && !formData.password) {
            delete (finalUserData as Partial<User>).password;
        }
        
        logActivity(user ? 'USER_UPDATED' : 'USER_CREATED', `saved user details for ${finalUserData.name}`, 'user', user?.id);
        onSave(finalUserData as User);
    };

    const permissionsForRole = useMemo(() => {
        const permissionIds = ROLE_PERMISSIONS[formData.role] || [];
        return ALL_PERMISSIONS.filter(p => permissionIds.includes(p.id));
    }, [formData.role]);

    const permissionGroups = useMemo(() => {
        return permissionsForRole.reduce((acc, permission) => {
            acc[permission.category] = acc[permission.category] || [];
            acc[permission.category].push(permission);
            return acc;
        }, {} as Record<string, typeof ALL_PERMISSIONS>);
    }, [permissionsForRole]);

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-start pt-16 z-50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-primary border border-primary rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-primary mb-4">{user ? `Edit User: ${user.name}` : 'Add New User'}</h3>
                
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto pr-2 space-y-4">
                    {/* User Details */}
                    <div>
                        <label className="text-sm text-secondary">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50"/>
                    </div>
                    <div>
                        <label className="text-sm text-secondary">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50"/>
                    </div>
                    <div>
                        <label className="text-sm text-secondary">Password</label>
                        <input type="password" name="password" value={formData.password || ''} onChange={handleInputChange} placeholder={user ? "Leave blank to keep current password" : "Required"} className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50"/>
                    </div>
                    <div>
                        <label className="text-sm text-secondary">Role</label>
                        <select name="role" value={formData.role} onChange={handleInputChange} className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50">
                            <option value="admin">Admin</option>
                            <option value="sales">Sales</option>
                            <option value="clearing_agent">Clearing Agent</option>
                        </select>
                    </div>

                    {formData.role === 'clearing_agent' && (
                        <div>
                            <label className="text-sm text-secondary">Assign to Clearing Company</label>
                            <select name="clearingAgentId" value={formData.clearingAgentId || ''} onChange={handleInputChange} required className="w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50">
                                <option value="">Select a company...</option>
                                {clearingAgents.map(agent => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
                            </select>
                        </div>
                    )}

                    {/* Permissions Display */}
                    <div>
                        <h4 className="text-base font-semibold text-primary mt-4 mb-2">Role Permissions</h4>
                        <div className="p-3 bg-tertiary/30 rounded-md max-h-48 overflow-y-auto">
                           {Object.entries(permissionGroups).map(([category, permissions]) => (
                               <div key={category} className="mb-2">
                                   <p className="text-xs font-bold text-secondary uppercase tracking-wider">{category}</p>
                                   <ul className="pl-2">
                                       {permissions.map(p => (
                                           <li key={p.id} className="text-xs text-primary/80">&bull; {p.label}</li>
                                       ))}
                                   </ul>
                               </div>
                           ))}
                        </div>
                    </div>
                </form>
                
                <div className="flex justify-end gap-3 pt-4 mt-auto border-t border-primary/50">
                    <button type="button" onClick={onClose} className="py-2 px-4 bg-tertiary text-primary rounded-btn hover:bg-tertiary/70">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="btn-primary py-2 px-6">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

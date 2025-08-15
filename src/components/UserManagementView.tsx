

import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { User } from '../constants/usersData';
import { UserEditModal } from './UserEditModal';
import { useLogger } from '../hooks/useLogger';

export const UserManagementView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const { users, setUsers } = useData();
    const { user: currentUser } = useAuth();
    const { logActivity } = useLogger();
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState<User | null | 'new'>(null);

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users;
        const lowercasedTerm = searchTerm.toLowerCase();
        return users.filter(u =>
            u.name.toLowerCase().includes(lowercasedTerm) ||
            u.email.toLowerCase().includes(lowercasedTerm) ||
            u.role.toLowerCase().includes(lowercasedTerm)
        );
    }, [searchTerm, users]);
    
    const handleSaveUser = (userToSave: User) => {
        if ('id' in userToSave && userToSave.id) { // Editing existing user
            setUsers(prev => prev.map(u => u.id === userToSave.id ? userToSave : u));
        } else { // Adding new user
            const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
            setUsers(prev => [...prev, { ...userToSave, id: newId }]);
        }
        setEditingUser(null);
    };

    const handleDeleteUser = (userId: number) => {
        if (currentUser?.id === userId) {
            alert("You cannot delete your own account.");
            return;
        }
        const userToDelete = users.find(u => u.id === userId);
        if (userToDelete && window.confirm(`Are you sure you want to delete user "${userToDelete.name}"? This action cannot be undone.`)) {
            setUsers(prev => prev.filter(u => u.id !== userId));
            logActivity('USER_DELETED', `deleted user ${userToDelete.name} (ID: ${userId})`, 'user', userId);
        }
    };

    return (
        <div className="bg-content-secondary p-4 rounded-lg border border-content-primary shadow-lg h-full flex flex-col">
            {editingUser && (
                <UserEditModal
                    user={editingUser === 'new' ? null : editingUser}
                    onClose={() => setEditingUser(null)}
                    onSave={handleSaveUser}
                />
            )}
            
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-content-primary">
                <h2 className="text-2xl font-bold text-content-primary">User & Role Management</h2>
                <div className="flex items-center gap-2">
                    <button onClick={() => setView('admin_panel_dashboard')} className="text-sm font-semibold text-accent hover:underline">
                        &larr; Back to Admin Panel
                    </button>
                    <button onClick={() => setEditingUser('new')} className="btn-primary text-sm">
                        + Add New User
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, email, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 text-sm px-3 py-2 border border-content-secondary rounded-btn bg-content-tertiary/50 text-content-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>
            
            <div className="overflow-auto flex-grow">
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-content-header z-10">
                        <tr>
                            {['Name', 'Email', 'Role', 'Actions'].map(header => (
                                <th key={header} className="text-left font-semibold text-content-secondary p-2 border-b border-content-primary text-xs whitespace-nowrap">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-content-primary/50">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-content-tertiary/30">
                                <td className="p-2 font-semibold">{user.name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2 capitalize">{user.role.replace('_', ' ')}</td>
                                <td className="p-2">
                                    <div className="flex gap-4">
                                        <button onClick={() => setEditingUser(user)} className="text-blue-400 font-semibold text-xs hover:underline">Edit</button>
                                        <button onClick={() => handleDeleteUser(user.id)} className="text-red-400 font-semibold text-xs hover:underline">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredUsers.length === 0 && (
                    <div className="text-center py-10 text-content-secondary">
                        No users found.
                    </div>
                )}
            </div>
        </div>
    );
};

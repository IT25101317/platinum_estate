import { useState, useEffect } from 'react';
import userService from '../../services/userService';
import UserTable from './UserTable';
import UserModal from './UserModal';
import UserDeleteModal from './UserDeleteModal';

const ROLES = ['ADMIN', 'AGENT', 'BUYER'];

const emptyForm = { name: '', email: '', role: 'BUYER', phoneNumber: '' };

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);   // null = create mode
    const [deletingUser, setDeletingUser] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');

    // Fetch all users on mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Auto-clear success message
    useEffect(() => {
        if (success) {
            const t = setTimeout(() => setSuccess(''), 3000);
            return () => clearTimeout(t);
        }
    }, [success]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to load users. Make sure the backend is running on port 8080.');
        } finally {
            setLoading(false);
        }
    };

    // Open CREATE modal
    const openCreateModal = () => {
        setEditingUser(null);
        setFormData(emptyForm);
        setFormError('');
        setShowModal(true);
    };

    // Open EDIT modal
    const openEditModal = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber || '',
        });
        setFormError('');
        setShowModal(true);
    };

    // Open DELETE modal
    const openDeleteModal = (user) => {
        setDeletingUser(user);
        setShowDeleteModal(true);
    };

    // Handle form submit (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError('');
        try {
            if (editingUser) {
                // UPDATE
                await userService.updateUser(editingUser.id, formData);
                setSuccess(`User "${formData.name}" updated successfully.`);
            } else {
                // CREATE
                await userService.createUser(formData);
                setSuccess(`User "${formData.name}" created successfully.`);
            }
            setShowModal(false);
            fetchUsers();
        } catch (err) {
            const msg = err.response?.data?.error || 'Something went wrong. Please try again.';
            setFormError(msg);
        } finally {
            setFormLoading(false);
        }
    };

    // Handle DELETE confirm
    const handleDeleteConfirm = async () => {
        setFormLoading(true);
        try {
            await userService.deleteUser(deletingUser.id);
            setSuccess(`User "${deletingUser.name}" deleted successfully.`);
            setShowDeleteModal(false);
            fetchUsers();
        } catch (err) {
            setError('Failed to delete user.');
            setShowDeleteModal(false);
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {users.length} total user{users.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                        + Add User
                    </button>
                </div>

                {/* Success banner */}
                {success && (
                    <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
                        {success}
                    </div>
                )}

                {/* Error banner */}
                {error && (
                    <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 ml-4">✕</button>
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    {loading ? (
                        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                            Loading users...
                        </div>
                    ) : (
                        <UserTable
                            users={users}
                            onEdit={openEditModal}
                            onDelete={openDeleteModal}
                        />
                    )}
                </div>
            </div>

            {/* Create / Edit Modal */}
            {showModal && (
                <UserModal
                    editingUser={editingUser}
                    formData={formData}
                    setFormData={setFormData}
                    formError={formError}
                    formLoading={formLoading}
                    roles={ROLES}
                    onSubmit={handleSubmit}
                    onClose={() => setShowModal(false)}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <UserDeleteModal
                    user={deletingUser}
                    loading={formLoading}
                    onConfirm={handleDeleteConfirm}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
}

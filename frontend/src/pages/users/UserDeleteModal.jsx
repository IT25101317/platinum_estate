export default function UserDeleteModal({ user, loading, onConfirm, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 overflow-hidden">

                {/* Icon */}
                <div className="px-6 pt-6 pb-2 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                        <span className="text-red-500 text-xl">🗑</span>
                    </div>
                    <h2 className="text-base font-semibold text-gray-800">Delete User</h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Are you sure you want to delete{' '}
                        <span className="font-medium text-gray-800">{user?.name}</span>?
                        This action cannot be undone.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3 px-6 py-5">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 rounded-lg transition-colors"
                    >
                        {loading ? 'Deleting...' : 'Yes, Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}

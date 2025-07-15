import React from 'react';

function ConfirmDialog({ open, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xs mx-4 animate-fade-in">
        <div className="mb-4 text-center text-lg text-gray-800">{message}</div>
        <div className="flex gap-4 justify-center mt-6">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            onClick={onConfirm}
            autoFocus
          >
            {confirmText}
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog; 
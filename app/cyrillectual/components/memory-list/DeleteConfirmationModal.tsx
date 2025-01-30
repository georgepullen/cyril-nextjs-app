import React from 'react';
import { motion } from 'framer-motion';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#0D0D15]/90 flex items-center justify-center z-50 px-4"
      role="dialog"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1E1E2E]/90 backdrop-blur-xl w-full max-w-md p-8 rounded-lg 
                  border border-[#b35cff]/20 shadow-[0_0_50px_rgba(179,92,255,0.1)]"
      >
        <h3 id="delete-dialog-title" className="text-lg font-medium mb-4">Delete Memory?</h3>
        <p id="delete-dialog-description" className="text-gray-400 mb-6">
          Are you sure you want to delete this memory? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-gray-300 
                      hover:bg-gray-500/10 rounded-lg transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-red-400 hover:text-red-300 
                      hover:bg-red-400/10 rounded-lg transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-red-400/50"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}; 
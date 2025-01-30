import React, { useState } from 'react';
import { Branch, deleteBranch } from '../../utils/supabaseUtils';
import AddBranch from './AddBranch';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

interface BranchListProps {
  branches: Branch[];
  user: any;
  handleBranchAdded: (newBranch: Branch) => void;
  onBranchDeleted?: (branchId: string) => void;
}

const BranchList: React.FC<BranchListProps> = ({ 
  branches, 
  user, 
  handleBranchAdded,
  onBranchDeleted = () => {} 
}) => {
  const router = useRouter();
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleBranchClick = (branchId: string) => {
    router.push(`/cyrillectual/branch/${branchId}`);
  };

  const handleDeleteClick = async (e: React.MouseEvent, branchId: string) => {
    e.stopPropagation();
    setBranchToDelete(branchId);
  };

  const handleConfirmDelete = async () => {
    if (branchToDelete) {
      const success = await deleteBranch(branchToDelete);
      if (success) {
        onBranchDeleted(branchToDelete);
      }
      setBranchToDelete(null);
    }
  };

  return (
    <>
      <div className="space-y-8">
        <AddBranch user={user} onBranchAdded={handleBranchAdded} />
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-200">Your Branches</h2>
          
          {branches.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 rounded-lg bg-[#1E1E2E]/50 border border-purple-500/20 text-center"
            >
              <p className="text-gray-400">No branches created yet. Start by adding one above!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map((branch, index) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleBranchClick(branch.id)}
                  className="group relative p-6 bg-[#1E1E2E]/80 rounded-lg border border-purple-500/20 
                            hover:border-purple-500/40 transition-all duration-300 
                            hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <button
                    onClick={(e) => handleDeleteClick(e, branch.id)}
                    className="absolute top-2 right-2 p-2
                              opacity-0 group-hover:opacity-100
                              text-red-400 hover:text-red-300 
                              hover:bg-red-400/10 rounded-md 
                              transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <h3 className="text-xl font-medium text-gray-200 mb-2">{branch.title}</h3>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <span className="text-sm">Created {formatDate(branch.created_at)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {branchToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1E1E2E] p-6 rounded-lg border border-purple-500/20 max-w-md mx-4"
          >
            <h3 className="text-lg font-medium mb-4">Delete Branch?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this branch? This will also delete all memories associated with it. 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setBranchToDelete(null)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-gray-300 
                         hover:bg-gray-500/10 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm text-red-400 hover:text-red-300 
                         hover:bg-red-400/10 rounded-md transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default BranchList; 
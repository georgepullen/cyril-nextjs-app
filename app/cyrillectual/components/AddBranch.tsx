import React, { useState } from 'react';
import { createBranch, Branch } from '../../utils/supabaseUtils';
import { motion } from 'framer-motion';

interface AddBranchProps {
  user: any;
  onBranchAdded: (branch: Branch) => void;
}

const AddBranch: React.FC<AddBranchProps> = ({ user, onBranchAdded }) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (title.trim() === '' || !user) return;
    
    setIsLoading(true);
    try {
      const newBranch = await createBranch(title, user.id);
      if (newBranch) {
        onBranchAdded(newBranch);
        setTitle('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-lg bg-[#1E1E2E]/80 border border-purple-500/20"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-200">Create New Branch</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter branch title..."
          className="flex-grow p-3 rounded-lg bg-[#2A2A3F] border border-purple-500/20 
                    text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 
                    transition-colors duration-300"
        />
        <button
          onClick={handleAdd}
          disabled={isLoading || !title.trim()}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300
                     ${isLoading || !title.trim() 
                       ? 'bg-purple-600/50 cursor-not-allowed' 
                       : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/20'}`}
        >
          {isLoading ? 'Creating...' : 'Create Branch'}
        </button>
      </div>
    </motion.div>
  );
};

export default AddBranch; 
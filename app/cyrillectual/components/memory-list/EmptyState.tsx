import React from 'react';

interface EmptyStateProps {
  onCreateMemory: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateMemory }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <p className="text-gray-400">No memories yet.</p>
        <button
          onClick={onCreateMemory}
          className="px-6 py-3 bg-gradient-to-r from-[#b35cff]/10 to-[#ffad4a]/10 
                    hover:from-[#b35cff]/20 hover:to-[#ffad4a]/20 border border-[#b35cff]/20 
                    rounded-lg transition-all duration-300 group"
        >
          <span className="bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
            Create Your First Memory
          </span>
        </button>
      </div>
    </div>
  );
}; 
import React, { useState } from 'react';
import { Memory } from '../../utils/supabaseUtils';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MemoryEditor from './MemoryEditor';

interface MemoryCardProps {
  memory: Memory;
  isEditing: boolean;
  editContent: string;
  isLoading: boolean;
  onEdit: () => void;
  onEditChange: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  isEditing,
  editContent,
  isLoading,
  onEdit,
  onEditChange,
  onSave,
  onCancel,
  onKeyDown,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleConfirmDelete = () => {
    // onDelete();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="h-12 bg-[#1E1E2E] border-b border-purple-500/20 
                    flex items-center justify-between px-4 flex-shrink-0">
        <span className="text-sm font-medium truncate flex-1">
          {isEditing ? 'Editing Memory' : memory.content.split('\n')[0]}
        </span>
        <div className="flex-shrink-0 ml-2">
          {isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={onCancel}
                className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-300 
                         hover:bg-gray-500/10 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                disabled={isLoading || !editContent.trim()}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200
                          ${isLoading || !editContent.trim() 
                            ? 'text-purple-400/50 cursor-not-allowed' 
                            : 'text-purple-400 hover:text-purple-300 hover:bg-purple-400/10'}`}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          ) : (
            <button
              onClick={onEdit}
              className="px-3 py-1.5 text-sm text-purple-400 hover:text-purple-300 
                       hover:bg-purple-400/10 rounded-md transition-colors duration-200"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6" onClick={!isEditing ? onEdit : undefined}>
        {isEditing ? (
          <div className="h-full">
            <MemoryEditor
              content={editContent}
              onChange={onEditChange}
              onKeyDown={onKeyDown}
              autoFocus
              maxLength={500}
            />
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {memory.content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      <div className="h-8 bg-[#1E1E2E] border-t border-purple-500/20 
                    flex items-center justify-between px-4 flex-shrink-0 text-xs">
        <span className="text-gray-400 truncate">
          Created {formatDistanceToNow(new Date(memory.created_at), { addSuffix: true })}
          {memory.updated_at !== memory.created_at && 
            ' • Updated ' + formatDistanceToNow(new Date(memory.updated_at), { addSuffix: true })}
        </span>
        {!isEditing && (
          <span className="text-gray-400 ml-2 flex-shrink-0">
            {memory.content.length}/500
          </span>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#1E1E2E] p-6 rounded-lg border border-purple-500/20 max-w-md">
            <h3 className="text-lg font-medium mb-4">Delete Memory?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this memory? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryCard; 
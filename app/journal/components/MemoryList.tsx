import React, { useState, useCallback } from 'react';
import { Memory, createMemory, updateMemory, deleteMemory } from '../../utils/supabaseUtils';
import MemoryEditor from './MemoryEditor';
import MemoryCard from './MemoryCard';
import { formatDistanceToNow } from 'date-fns';

interface MemoryListProps {
  memories: Memory[];
  branchId: string;
  onMemoryAdded: (memory: Memory) => void;
  onMemoryUpdated: (memory: Memory) => void;
  onMemoryDeleted?: (memoryId: string) => void;
}

const MemoryList: React.FC<MemoryListProps> = ({ 
  memories, 
  branchId, 
  onMemoryAdded, 
  onMemoryUpdated,
  onMemoryDeleted = () => {}
}) => {
  const [newMemory, setNewMemory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleAddMemory = async () => {
    if (!newMemory.trim()) return;
    
    setIsLoading(true);
    try {
      const memory = await createMemory(branchId, newMemory.trim());
      if (memory) {
        onMemoryAdded(memory);
        setNewMemory('');
        setIsAddingMemory(false);
        setCurrentIndex(0); // Show the newly added memory
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (editingId) {
        handleSaveEdit();
      } else {
        handleAddMemory();
      }
    }
  };

  const startEditing = (memory: Memory) => {
    setEditingId(memory.id);
    setEditContent(memory.content);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editContent.trim()) return;
    
    setIsLoading(true);
    try {
      const updatedMemory = await updateMemory(editingId, editContent.trim());
      if (updatedMemory) {
        onMemoryUpdated(updatedMemory);
      }
    } finally {
      setIsLoading(false);
      setEditingId(null);
      setEditContent('');
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleMemorySelect = (index: number) => {
    // If we're adding a new memory, discard it
    if (isAddingMemory) {
      setIsAddingMemory(false);
      setNewMemory('');
    }
    setCurrentIndex(index);
  };

  const handleDeleteMemory = async (memoryId: string) => {
    const success = await deleteMemory(memoryId);
    if (success) {
      onMemoryDeleted(memoryId);
      // Move to the previous memory or the next one if we're at the start
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (memories.length > 1) {
        setCurrentIndex(0);
      }
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row relative">
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-purple-600 p-3 rounded-full 
                  shadow-lg hover:bg-purple-700 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-40
        md:w-64 bg-[#1E1E2E] border-r border-purple-500/20 
        flex-shrink-0 flex flex-col overflow-hidden
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        w-3/4 sm:w-64
      `}>
        <div className="p-4 border-b border-purple-500/20 flex-shrink-0 flex items-center justify-between">
          <button
            onClick={() => setIsAddingMemory(true)}
            className="flex-1 px-4 py-2 rounded-lg font-medium bg-purple-600 
                      hover:bg-purple-700 transition-colors duration-200 text-sm"
          >
            New Memory
          </button>
          <button 
            onClick={toggleSidebar}
            className="ml-2 p-2 rounded-lg hover:bg-purple-500/10 md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-2">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className={`group relative rounded-lg transition-colors duration-200
                        ${index === currentIndex 
                          ? 'bg-purple-500/20' 
                          : 'hover:bg-purple-500/10'}`}
            >
              <button
                onClick={() => handleMemorySelect(index)}
                className="w-full text-left p-3"
              >
                <div className="text-sm truncate text-white">
                  {memory.content.split('\n')[0]}
                </div>
                <div className="text-xs opacity-60 mt-1 text-gray-400">
                  {formatDistanceToNow(new Date(memory.created_at), { addSuffix: true })}
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(memory.id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2
                          opacity-0 group-hover:opacity-100
                          text-red-400 hover:text-red-300 
                          hover:bg-red-400/10 rounded-md 
                          transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1E1E2E] p-6 rounded-lg border border-purple-500/20 max-w-md">
            <h3 className="text-lg font-medium mb-4">Delete Memory?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this memory? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-gray-300 
                         hover:bg-gray-500/10 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (showDeleteConfirm) {
                    handleDeleteMemory(showDeleteConfirm);
                    setShowDeleteConfirm(null);
                  }
                }}
                className="px-4 py-2 text-sm text-red-400 hover:text-red-300 
                         hover:bg-red-400/10 rounded-md transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {isAddingMemory ? (
          <div className="flex flex-col h-full">
            <div className="h-12 bg-[#1E1E2E] border-b border-purple-500/20 
                          flex items-center justify-between px-4 flex-shrink-0">
              <span className="text-sm font-medium">New Memory</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setIsAddingMemory(false);
                    setNewMemory('');
                  }}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-300 
                           hover:bg-gray-500/10 rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMemory}
                  disabled={isLoading || !newMemory.trim()}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200
                            ${isLoading || !newMemory.trim() 
                              ? 'text-purple-400/50 cursor-not-allowed' 
                              : 'text-purple-400 hover:text-purple-300 hover:bg-purple-400/10'}`}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden p-6">
              <div className="h-full">
                <MemoryEditor
                  content={newMemory}
                  onChange={setNewMemory}
                  onKeyDown={handleKeyPress}
                  placeholder="Start typing your memory... (Markdown supported)"
                />
              </div>
            </div>
          </div>
        ) : memories.length > 0 ? (
          <MemoryCard
            memory={memories[currentIndex]}
            isEditing={editingId === memories[currentIndex].id}
            editContent={editContent}
            isLoading={isLoading}
            onEdit={() => startEditing(memories[currentIndex])}
            onEditChange={setEditContent}
            onSave={handleSaveEdit}
            onCancel={cancelEditing}
            onKeyDown={handleKeyPress}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400">No memories yet. Start by adding one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryList; 
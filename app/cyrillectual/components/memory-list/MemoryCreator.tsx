import React, { useState, useCallback } from 'react';
import { Memory, createMemory } from '../../../utils/supabaseUtils';
import MemoryEditor from '../MemoryEditor';
import { X, Check, AlertCircle } from 'lucide-react';
import debounce from 'lodash/debounce';

interface MemoryCreatorProps {
  branchId: string;
  onMemoryAdded: (memory: Memory) => void;
  onCancel: () => void;
}

export const MemoryCreator: React.FC<MemoryCreatorProps> = ({
  branchId,
  onMemoryAdded,
  onCancel
}) => {
  const [newMemory, setNewMemory] = useState('');
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);

  // Debounced auto-save function for new memories
  const debouncedSaveNewMemory = useCallback(
    debounce(async (content: string) => {
      // Don't save if content is just whitespace, hashtags, or other markdown formatting
      const meaningfulContent = content.replace(/^[#\s*_-]+/, '').trim();
      if (!meaningfulContent || meaningfulContent.length < 3) return;
      
      setAutoSaveStatus('saving');
      try {
        const memory = await createMemory(branchId, content.trim());
        if (memory) {
          onMemoryAdded(memory);
          setNewMemory('');
          setAutoSaveStatus('saved');
        } else {
          setAutoSaveStatus('error');
        }
      } catch (error) {
        console.error('Auto-save error:', error);
        setAutoSaveStatus('error');
      }
    }, 1000),
    [branchId, setAutoSaveStatus]
  );

  // Handle new memory content changes with auto-save
  const handleNewMemoryChange = (content: string) => {
    setNewMemory(content);
    // Only trigger auto-save if there's meaningful content
    const meaningfulContent = content.replace(/^[#\s*_-]+/, '').trim();
    if (meaningfulContent && meaningfulContent.length >= 3) {
      debouncedSaveNewMemory(content);
    }
  };

  // Cancel new memory creation and cleanup
  const handleCancel = () => {
    debouncedSaveNewMemory.cancel(); // Cancel any pending saves
    onCancel();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Render auto-save status
  const renderAutoSaveStatus = () => {
    const statusConfig = {
      saving: {
        text: 'Saving changes...',
        className: 'text-gray-400',
        icon: null
      },
      saved: {
        text: 'All changes saved',
        className: 'text-green-400',
        icon: <Check className="w-4 h-4" />
      },
      error: {
        text: 'Error saving changes',
        className: 'text-red-400',
        icon: <AlertCircle className="w-4 h-4" />
      },
      null: {
        text: 'Changes save automatically',
        className: 'text-gray-400',
        icon: null
      }
    };

    const config = statusConfig[autoSaveStatus || 'null'];

    return (
      <div className={`flex items-center gap-1.5 text-xs ${config.className}`}>
        {config.icon}
        <span>{config.text}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-16 bg-[#1E1E2E]/90 backdrop-blur-xl border-b border-[#b35cff]/20 
                    flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
            New Memory
          </span>
          {renderAutoSaveStatus()}
        </div>
        <button
          onClick={handleCancel}
          className="p-2 text-gray-400 hover:text-gray-300 
                    hover:bg-gray-500/10 rounded-lg transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-hidden p-6">
        <div className="h-full">
          <MemoryEditor
            content={newMemory}
            onChange={handleNewMemoryChange}
            onKeyDown={handleKeyPress}
            placeholder="Start typing your memory... (Markdown supported)"
            autoFocus={true}
            maxChars={10000}
          />
        </div>
      </div>
    </div>
  );
}; 
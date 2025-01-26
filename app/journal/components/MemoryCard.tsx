import React from 'react';
import { Memory } from '../../utils/supabaseUtils';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MemoryEditor from './MemoryEditor';
import { Edit2, Save, X, Menu } from 'lucide-react';
import KeyboardKey from './KeyboardKey';

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
  onToggleSidebar?: () => void;
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
  onToggleSidebar,
}) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="h-16 bg-[#1E1E2E]/90 backdrop-blur-xl border-b border-[#b35cff]/20 
                    flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
            {isEditing ? 'Editing Memory' : 'Memory'}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={onCancel}
                className="p-2 text-gray-400 hover:text-gray-300 
                          hover:bg-gray-500/10 rounded-lg transition-colors duration-200
                          focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50"
                title="Cancel (Esc)"
                aria-label="Cancel editing"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={onSave}
                disabled={isLoading || !editContent.trim()}
                className={`p-2 rounded-lg transition-all duration-200
                          focus:outline-none focus:ring-2 
                          ${isLoading || !editContent.trim()
                            ? 'text-[#b35cff]/50 cursor-not-allowed'
                            : 'text-[#b35cff] hover:bg-[#b35cff]/10 focus:ring-[#b35cff]/50'}`}
                title="Save (Shift+Enter)"
                aria-label="Save changes"
              >
                <Save className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={onEdit}
              className="p-2 text-[#b35cff] hover:bg-[#b35cff]/10 
                        rounded-lg transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50"
              aria-label="Edit memory"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Shortcuts Bar - Only show when editing */}
      {isEditing && (
        <div className="h-8 bg-[#161622] border-b border-[#b35cff]/20 
                      flex items-center px-6 flex-shrink-0">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-gray-500 text-xs">
              <div className="flex items-center space-x-1">
                <KeyboardKey>SHIFT</KeyboardKey>
                <span>+</span>
                <KeyboardKey>ENTER</KeyboardKey>
              </div>
              <span>save</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500 text-xs">
              <KeyboardKey>ESC</KeyboardKey>
              <span>cancel</span>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div 
        className="flex-1 overflow-y-auto p-6" 
        onClick={!isEditing ? onEdit : undefined}
        role={!isEditing ? "button" : undefined}
        tabIndex={!isEditing ? 0 : undefined}
        onKeyDown={!isEditing ? (e) => e.key === 'Enter' && onEdit() : undefined}
        aria-label={!isEditing ? "Click to edit memory" : undefined}
      >
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
          <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-200 
                         prose-a:text-[#b35cff] prose-a:no-underline hover:prose-a:text-[#ffad4a] 
                         prose-code:text-[#ffad4a] prose-pre:bg-[#1E1E2E] max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {memory.content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="h-12 bg-[#1E1E2E]/90 backdrop-blur-xl border-t border-[#b35cff]/20 
                    flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">
            {memory.updated_at !== memory.created_at
              ? 'Updated ' + formatDistanceToNow(new Date(memory.updated_at), { addSuffix: true })
              : 'Created ' + formatDistanceToNow(new Date(memory.created_at), { addSuffix: true })}
          </span>
          {!isEditing && (
            <span className="text-sm text-gray-400">
              {memory.content.length}/500
            </span>
          )}
        </div>
        
        {/* Sidebar Toggle Button - Only show on mobile */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-[#b35cff] hover:bg-[#b35cff]/10 
                      rounded-lg transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MemoryCard; 
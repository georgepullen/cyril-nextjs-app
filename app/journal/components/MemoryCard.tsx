import React from 'react';
import { Memory } from '../../utils/supabaseUtils';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MemoryEditor from './MemoryEditor';
import { Edit2, X, Menu, Check, AlertCircle, Loader2, Brain } from 'lucide-react';

interface MemoryCardProps {
  memory: Memory;
  isEditing: boolean;
  editContent: string;
  onEdit: () => void;
  onEditChange: (content: string) => void;
  onCancel: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onToggleSidebar?: () => void;
  autoSaveStatus?: 'saved' | 'saving' | 'error' | null;
  onGenerateQuestions: () => void;
  isGeneratingQuestions: boolean;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  isEditing,
  editContent,
  onEdit,
  onEditChange,
  onCancel,
  onKeyDown,
  onToggleSidebar,
  autoSaveStatus,
  onGenerateQuestions,
  isGeneratingQuestions
}) => {
  const renderAutoSaveStatus = () => {
    if (!isEditing) return null;

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
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="h-16 bg-[#1E1E2E]/90 backdrop-blur-xl border-b border-[#b35cff]/20 
                    flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
            {isEditing ? 'Editing Memory' : 'Memory'}
          </span>
          {renderAutoSaveStatus()}
        </div>
        <div className="flex items-center space-x-4">
          {!isEditing && (
            <button
              onClick={onGenerateQuestions}
              disabled={isGeneratingQuestions}
              className={`px-3 py-1.5 rounded-lg transition-all duration-200 text-sm
                        flex items-center gap-2
                        ${isGeneratingQuestions
                          ? 'bg-gray-500/10 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#b35cff]/10 to-[#ffad4a]/10 text-white hover:from-[#b35cff]/20 hover:to-[#ffad4a]/20'
                        }`}
              aria-label="Generate questions for this memory"
            >
              {isGeneratingQuestions ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  <span>Generate Questions</span>
                </>
              )}
            </button>
          )}
          {isEditing ? (
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-300 
                        hover:bg-gray-500/10 rounded-lg transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50"
              title="Press Esc to exit"
              aria-label="Cancel editing"
            >
              <X className="w-5 h-5" />
            </button>
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
              maxChars={5000}
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
              {memory.content.length}/20000 characters
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
import React from 'react';
import { Memory } from '../../../utils/supabaseUtils';
import { motion } from 'framer-motion';
import { Plus, X, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import QuestionConfig, { QuestionConfig as QuestionConfigType } from '../QuestionConfig';
import FeedbackConfig, { FeedbackSettings } from '../FeedbackConfig';

interface MemorySidebarProps {
  memories: Memory[];
  currentIndex: number;
  isAddingMemory: boolean;
  isSidebarOpen: boolean;
  onMemorySelect: (index: number) => void;
  onAddMemory: () => void;
  onDeleteMemory: (id: string) => void;
  onCloseSidebar: () => void;
  questionConfig: QuestionConfigType;
  onQuestionConfigChange: (config: QuestionConfigType) => void;
  isQuestionConfigExpanded: boolean;
  onToggleQuestionConfig: () => void;
  feedbackSettings: FeedbackSettings;
  onFeedbackSettingsChange: (settings: FeedbackSettings) => void;
  isFeedbackConfigExpanded: boolean;
  onToggleFeedbackConfig: () => void;
}

export const MemorySidebar: React.FC<MemorySidebarProps> = ({
  memories,
  currentIndex,
  isAddingMemory,
  isSidebarOpen,
  onMemorySelect,
  onAddMemory,
  onDeleteMemory,
  onCloseSidebar,
  questionConfig,
  onQuestionConfigChange,
  isQuestionConfigExpanded,
  onToggleQuestionConfig,
  feedbackSettings,
  onFeedbackSettingsChange,
  isFeedbackConfigExpanded,
  onToggleFeedbackConfig,
}) => {
  return (
    <div className={`
      fixed md:relative inset-y-0 left-0 z-40
      w-[300px] bg-[#1E1E2E]/90 backdrop-blur-xl
      border-r border-[#b35cff]/20 flex-shrink-0 flex flex-col
      transition-transform duration-300 ease-in-out
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      md:h-full h-[calc(100vh-48px)] md:top-0 top-12
    `}>
      {/* Sidebar Header */}
      <div className="flex-shrink-0 p-3 border-b border-[#b35cff]/20 space-y-2">
        <button
          onClick={onAddMemory}
          className="w-full px-3 py-2 bg-gradient-to-r from-[#b35cff]/10 to-[#ffad4a]/10 
                    hover:from-[#b35cff]/20 hover:to-[#ffad4a]/20 border border-[#b35cff]/20 
                    rounded-lg transition-all duration-300 group
                    outline-none focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50
                    flex items-center justify-center"
          aria-label="Create new memory"
        >
          <Plus className="w-4 h-4 text-[#b35cff]" />
          <span className="bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent ml-2 text-sm">
            New Memory
          </span>
        </button>
      </div>

      {/* Scrollable Container for Memory List and Preferences */}
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto">
        {/* Memory List */}
        <div className="flex-1 p-4 space-y-2">
          {isAddingMemory && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group relative rounded-lg transition-all duration-200
                        bg-gradient-to-r from-[#b35cff]/20 to-[#ffad4a]/20 border-[#b35cff]/30
                        border border-[#b35cff]/20 focus-within:ring-2 
                        focus-within:ring-[#b35cff]/50"
            >
              <div className="w-full text-left p-4">
                <div className="text-sm text-white line-clamp-2">
                  Draft Memory
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Currently editing...
                </div>
              </div>
            </motion.div>
          )}
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group relative rounded-lg transition-all duration-200
                        ${index === currentIndex && !isAddingMemory
                          ? 'bg-gradient-to-r from-[#b35cff]/20 to-[#ffad4a]/20 border-[#b35cff]/30' 
                          : 'hover:bg-gradient-to-r hover:from-[#b35cff]/10 hover:to-[#ffad4a]/10'} 
                        border border-[#b35cff]/20 focus-within:ring-2 
                        focus-within:ring-[#b35cff]/50`}
            >
              <button
                onClick={() => onMemorySelect(index)}
                className="w-full text-left p-4 focus:outline-none"
                aria-label={`Select memory: ${memory.content.split('\n')[0].replace(/^#+\s*/, '')}`}
              >
                <div className="text-sm text-white line-clamp-2">
                  {memory.content.split('\n')[0].replace(/^#+\s*/, '')}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  {formatDistanceToNow(new Date(memory.created_at), { addSuffix: true })}
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteMemory(memory.id);
                }}
                className="absolute right-2 top-2 p-2 opacity-0 group-hover:opacity-100
                          text-red-400 hover:text-red-300 hover:bg-red-400/10 
                          rounded-md transition-all duration-200 focus:outline-none 
                          focus:ring-2 focus:ring-red-400/50 focus:opacity-100"
                aria-label="Delete memory"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Question and Feedback Preferences */}
        <div className="flex-shrink-0 p-3 space-y-2 border-t border-[#b35cff]/20">
          <QuestionConfig
            config={questionConfig}
            onConfigChange={onQuestionConfigChange}
            isExpanded={isQuestionConfigExpanded}
            onToggleExpand={onToggleQuestionConfig}
          />
          <FeedbackConfig
            settings={feedbackSettings}
            onSettingsChange={onFeedbackSettingsChange}
            isExpanded={isFeedbackConfigExpanded}
            onToggleExpand={onToggleFeedbackConfig}
          />
        </div>
      </div>

      {/* Mobile Close Button */}
      <div className="flex-shrink-0 md:hidden border-t border-[#b35cff]/20">
        <button 
          onClick={onCloseSidebar}
          className="w-full h-12 bg-[#1E1E2E] hover:bg-[#b35cff]/10
                    flex items-center justify-center gap-2
                    text-gray-400 hover:text-gray-300 
                    transition-all duration-200 group"
          aria-label="Close sidebar"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          <span className="text-xs">Close Sidebar</span>
        </button>
      </div>
    </div>
  );
}; 
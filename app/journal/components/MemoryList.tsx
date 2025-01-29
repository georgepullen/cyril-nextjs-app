import React, { useState, useCallback } from 'react';
import { Memory, createMemory, updateMemory, deleteMemory } from '../../utils/supabaseUtils';
import MemoryEditor from './MemoryEditor';
import MemoryCard from './MemoryCard';
import QuestionsModal from './QuestionsModal';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Plus, X, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import debounce from 'lodash/debounce';
import { generateQuestionsFromMemories, generateFeedbackForAnswers } from '../../utils/perplexityUtils';
import FeedbackConfig, { FeedbackSettings } from './FeedbackConfig';
import QuestionConfig, { QuestionConfig as QuestionConfigType } from './QuestionConfig';

interface MemoryListProps {
  memories: Memory[];
  branchId: string;
  onMemoryAdded: (memory: Memory) => void;
  onMemoryUpdated: (memory: Memory) => void;
  onMemoryDeleted?: (memoryId: string) => void;
  editingMemoryId: string | null;
  editContent: string;
  onStartEditing: (memory: Memory) => void;
  onCancelEditing: () => void;
  onEditChange: (content: string) => void;
}

const MemoryList: React.FC<MemoryListProps> = ({
  memories,
  branchId,
  onMemoryAdded,
  onMemoryUpdated,
  onMemoryDeleted = () => {},
  editingMemoryId,
  editContent,
  onStartEditing,
  onCancelEditing,
  onEditChange
}) => {
  const [newMemory, setNewMemory] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);
  const [newMemoryAutoSaveStatus, setNewMemoryAutoSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<string | null>(null);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(''));
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmittingAnswers, setIsSubmittingAnswers] = useState(false);
  const [feedbackSettings, setFeedbackSettings] = useState<FeedbackSettings>({
    examBoard: 'General Feedback',
    gradeLevel: 'General',
    subjectArea: '',
    additionalNotes: ''
  });
  const [isFeedbackConfigExpanded, setIsFeedbackConfigExpanded] = useState(false);
  const [questionConfig, setQuestionConfig] = useState<QuestionConfigType>({
    type: 'single-long',
    questionCount: 1,
    marks: {
      perQuestion: [20]
    }
  });
  const [isQuestionConfigExpanded, setIsQuestionConfigExpanded] = useState(false);

  // Debounced auto-save function for editing existing memories
  const debouncedSave = useCallback(
    debounce(async (memoryId: string, content: string) => {
      if (!content.trim()) return;
      
      setAutoSaveStatus('saving');
      try {
        const updatedMemory = await updateMemory(memoryId, content.trim());
        if (updatedMemory) {
          onMemoryUpdated(updatedMemory);
          setAutoSaveStatus('saved');
        } else {
          setAutoSaveStatus('error');
        }
      } catch (error) {
        console.error('Auto-save error:', error);
        setAutoSaveStatus('error');
      }
    }, 1000),
    [onMemoryUpdated]
  );

  // Save immediately without debounce
  const saveImmediately = async (memoryId: string, content: string) => {
    if (!content.trim()) return;
    
    setAutoSaveStatus('saving');
    try {
      const updatedMemory = await updateMemory(memoryId, content.trim());
      if (updatedMemory) {
        onMemoryUpdated(updatedMemory);
        setAutoSaveStatus('saved');
      } else {
        setAutoSaveStatus('error');
      }
    } catch (error) {
      console.error('Save error:', error);
      setAutoSaveStatus('error');
    }
  };

  // Handle content changes during editing
  const handleEditChange = (content: string) => {
    onEditChange(content);
    if (editingMemoryId) {
      debouncedSave(editingMemoryId, content);
    }
  };

  // Cancel editing and cleanup
  const cancelEditing = async () => {
    if (editingMemoryId && editContent.trim()) {
      debouncedSave.cancel(); // Cancel any pending debounced saves
      await saveImmediately(editingMemoryId, editContent);
    }
    onCancelEditing();
    setAutoSaveStatus(null);
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (editingMemoryId) {
        await cancelEditing();
      } else {
        setIsAddingMemory(false);
        setNewMemory('');
      }
    }
  };

  // Debounced auto-save function for new memories
  const debouncedSaveNewMemory = useCallback(
    debounce(async (content: string) => {
      // Don't save if content is just whitespace, hashtags, or other markdown formatting
      const meaningfulContent = content.replace(/^[#\s*_-]+/, '').trim();
      if (!meaningfulContent || meaningfulContent.length < 3) return;
      
      setNewMemoryAutoSaveStatus('saving');
      try {
        const memory = await createMemory(branchId, content.trim());
        if (memory) {
          onMemoryAdded(memory);
          setNewMemory('');
          setIsAddingMemory(false);
          setCurrentIndex(0); // Show the newly added memory
          setNewMemoryAutoSaveStatus('saved');
        } else {
          setNewMemoryAutoSaveStatus('error');
        }
      } catch (error) {
        console.error('Auto-save error:', error);
        setNewMemoryAutoSaveStatus('error');
      }
    }, 2000), // Increased debounce time to 2 seconds for new memories
    [branchId, onMemoryAdded]
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
  const cancelNewMemory = () => {
    debouncedSaveNewMemory.cancel(); // Cancel any pending saves
    setIsAddingMemory(false);
    setNewMemory('');
    setNewMemoryAutoSaveStatus(null);
  };

  // Render auto-save status for new memory
  const renderNewMemoryAutoSaveStatus = () => {
    if (!isAddingMemory) return null;

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

    const config = statusConfig[newMemoryAutoSaveStatus || 'null'];

    return (
      <div className={`flex items-center gap-1.5 text-xs ${config.className}`}>
        {config.icon}
        <span>{config.text}</span>
      </div>
    );
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

  const generateQuestions = async () => {
    if (!memories[currentIndex]) return;
    
    setIsGeneratingQuestions(true);
    setShowQuestionsModal(true);
    
    try {
      const memoryContent = memories[currentIndex].content;

      const questions = await generateQuestionsFromMemories(
        memoryContent, 
        questionConfig,
        feedbackSettings
      );
      setGeneratedQuestions(questions);
      
      // Reset answers array based on question count
      setAnswers(Array(questionConfig.questionCount).fill(''));
      
    } catch (error) {
      console.error('Error generating questions:', error);
      setGeneratedQuestions('Error generating questions. Please try again.');
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmitAnswers = async () => {
    if (!generatedQuestions || !feedbackSettings) return;
    
    setIsSubmittingAnswers(true);
    try {
      const feedbackResult = await generateFeedbackForAnswers(generatedQuestions, answers, feedbackSettings);
      setFeedback(feedbackResult);
    } catch (error) {
      console.error('Error submitting answers:', error);
      setFeedback('Error processing your answers. Please try again.');
    } finally {
      setIsSubmittingAnswers(false);
    }
  };

  const resetQuestionsAndAnswers = () => {
    setShowQuestionsModal(false);
    setGeneratedQuestions(null);
    setAnswers(Array(questionConfig.questionCount).fill(''));
    setFeedback(null);
  };

  return (
    <div className="h-full flex md:flex-row relative">
      {/* Sidebar */}
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
            onClick={() => setIsAddingMemory(true)}
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
                  onClick={() => handleMemorySelect(index)}
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
                    setShowDeleteConfirm(memory.id);
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
              onConfigChange={setQuestionConfig}
              isExpanded={isQuestionConfigExpanded}
              onToggleExpand={() => setIsQuestionConfigExpanded(!isQuestionConfigExpanded)}
            />
            <FeedbackConfig
              settings={feedbackSettings}
              onSettingsChange={setFeedbackSettings}
              isExpanded={isFeedbackConfigExpanded}
              onToggleExpand={() => setIsFeedbackConfigExpanded(!isFeedbackConfigExpanded)}
            />
          </div>
        </div>

        {/* Mobile Close Button */}
        <div className="flex-shrink-0 md:hidden border-t border-[#b35cff]/20">
          <button 
            onClick={() => setIsSidebarOpen(false)}
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

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {isAddingMemory ? (
          <div className="flex flex-col h-full">
            <div className="h-16 bg-[#1E1E2E]/90 backdrop-blur-xl border-b border-[#b35cff]/20 
                          flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
                  New Memory
                </span>
                {renderNewMemoryAutoSaveStatus()}
              </div>
              <button
                onClick={cancelNewMemory}
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
        ) : memories.length > 0 ? (
          <MemoryCard
            memory={memories[currentIndex]}
            isEditing={editingMemoryId === memories[currentIndex].id}
            editContent={editContent}
            onEdit={() => onStartEditing(memories[currentIndex])}
            onEditChange={handleEditChange}
            onCancel={cancelEditing}
            onKeyDown={handleKeyPress}
            onToggleSidebar={() => setIsSidebarOpen(true)}
            autoSaveStatus={autoSaveStatus}
            onGenerateQuestions={generateQuestions}
            isGeneratingQuestions={isGeneratingQuestions}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center space-y-4">
              <p className="text-gray-400">No memories yet.</p>
              <button
                onClick={() => setIsAddingMemory(true)}
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
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
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
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-400 hover:text-gray-300 
                          hover:bg-gray-500/10 rounded-lg transition-colors duration-200
                          focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50"
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
                className="px-4 py-2 text-red-400 hover:text-red-300 
                          hover:bg-red-400/10 rounded-lg transition-colors duration-200
                          focus:outline-none focus:ring-2 focus:ring-red-400/50"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Questions Modal */}
      <QuestionsModal
        isOpen={showQuestionsModal}
        onClose={resetQuestionsAndAnswers}
        isGenerating={isGeneratingQuestions}
        questions={generatedQuestions}
        answers={answers}
        onAnswerChange={handleAnswerChange}
        onSubmitAnswers={handleSubmitAnswers}
        isSubmitting={isSubmittingAnswers}
        feedback={feedback}
      />
    </div>
  );
};

export default MemoryList; 
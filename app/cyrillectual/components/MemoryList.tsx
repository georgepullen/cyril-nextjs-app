import React, { useState } from 'react';
import { Memory, deleteMemory } from '../../utils/supabaseUtils';
import MemoryCard from './MemoryCard';
import QuestionsModal from './QuestionsModal';
import { generateQuestionsFromMemories, generateFeedbackForAnswers } from '../../utils/perplexityUtils';
import { FeedbackSettings } from './FeedbackConfig';
import { QuestionConfig as QuestionConfigType } from './QuestionConfig';
import { MemorySidebar } from './memory-list/MemorySidebar';
import { MemoryCreator } from './memory-list/MemoryCreator';
import { DeleteConfirmationModal } from './memory-list/DeleteConfirmationModal';
import { EmptyState } from './memory-list/EmptyState';

interface MemoryListProps {
  memories: Memory[];
  branchId: string;
  onMemoryAdded: (memory: Memory) => void;
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
  onMemoryDeleted = () => {},
  editingMemoryId,
  editContent,
  onStartEditing,
  onCancelEditing,
  onEditChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
  const [questionConfig, setQuestionConfig] = useState<QuestionConfigType>({
    type: 'single-long',
    questionCount: 1,
    marks: {
      perQuestion: [20]
    }
  });
  const [isQuestionConfigExpanded, setIsQuestionConfigExpanded] = useState(false);
  const [isFeedbackConfigExpanded, setIsFeedbackConfigExpanded] = useState(false);

  const handleMemorySelect = (index: number) => {
    if (isAddingMemory) {
      setIsAddingMemory(false);
    }
    setCurrentIndex(index);
  };

  const handleDeleteMemory = async (memoryId: string) => {
    const success = await deleteMemory(memoryId);
    if (success) {
      onMemoryDeleted(memoryId);
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancelEditing();
    }
  };

  return (
    <div className="h-full flex md:flex-row relative">
      <MemorySidebar
        memories={memories}
        currentIndex={currentIndex}
        isAddingMemory={isAddingMemory}
        isSidebarOpen={isSidebarOpen}
        onMemorySelect={handleMemorySelect}
        onAddMemory={() => setIsAddingMemory(true)}
        onDeleteMemory={(id: string) => setShowDeleteConfirm(id)}
        onCloseSidebar={() => setIsSidebarOpen(false)}
        questionConfig={questionConfig}
        onQuestionConfigChange={setQuestionConfig}
        isQuestionConfigExpanded={isQuestionConfigExpanded}
        onToggleQuestionConfig={() => setIsQuestionConfigExpanded(!isQuestionConfigExpanded)}
        feedbackSettings={feedbackSettings}
        onFeedbackSettingsChange={setFeedbackSettings}
        isFeedbackConfigExpanded={isFeedbackConfigExpanded}
        onToggleFeedbackConfig={() => setIsFeedbackConfigExpanded(!isFeedbackConfigExpanded)}
      />

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
          <MemoryCreator
            branchId={branchId}
            onMemoryAdded={onMemoryAdded}
            onCancel={() => setIsAddingMemory(false)}
          />
        ) : memories.length > 0 ? (
          <MemoryCard
            memory={memories[currentIndex]}
            isEditing={editingMemoryId === memories[currentIndex].id}
            editContent={editContent}
            onEdit={() => onStartEditing(memories[currentIndex])}
            onEditChange={onEditChange}
            onCancel={onCancelEditing}
            onKeyDown={handleKeyDown}
            onToggleSidebar={() => setIsSidebarOpen(true)}
            onGenerateQuestions={generateQuestions}
            isGeneratingQuestions={isGeneratingQuestions}
          />
        ) : (
          <EmptyState onCreateMemory={() => setIsAddingMemory(true)} />
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => {
          if (showDeleteConfirm) {
            handleDeleteMemory(showDeleteConfirm);
            setShowDeleteConfirm(null);
          }
        }}
      />

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
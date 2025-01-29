import React from 'react';
import { Loader2, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import QuestionAnswerSection from './QuestionAnswerSection';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FeedbackSettings } from './FeedbackConfig';

interface QuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGenerating: boolean;
  questions: string | null;
  answers: string[];
  onAnswerChange: (index: number, value: string) => void;
  onSubmitAnswers: (settings: FeedbackSettings) => void;
  isSubmitting: boolean;
  feedback: string | null;
}

const QuestionsModal: React.FC<QuestionsModalProps> = ({
  isOpen,
  onClose,
  isGenerating,
  questions,
  answers,
  onAnswerChange,
  onSubmitAnswers,
  isSubmitting,
  feedback
}) => {
  const [isQuestionsExpanded, setIsQuestionsExpanded] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#0D0D15] flex flex-col z-50"
      role="dialog"
      aria-labelledby="questions-dialog-title"
    >
      {/* Header */}
      <div className="h-16 bg-[#1E1E2E]/90 backdrop-blur-xl border-b border-[#b35cff]/20 
                    flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-300 
                      hover:bg-gray-500/10 rounded-lg transition-colors duration-200
                      flex items-center gap-2 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span>Back to Memories</span>
          </button>
          <div className="w-px h-6 bg-[#b35cff]/20" />
          <h3 
            id="questions-dialog-title" 
            className="text-lg font-medium bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent"
          >
            Reflection Questions
          </h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {isGenerating ? (
          <div className="h-full flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#b35cff] animate-spin mb-4" />
            <p className="text-gray-400">Analyzing your memories...</p>
          </div>
        ) : (
          <div className="h-full flex flex-col lg:flex-row">
            {/* Questions Panel - Collapsible on mobile */}
            <div className={`lg:w-1/2 border-b lg:border-b-0 lg:border-r border-[#b35cff]/20 
                          ${isQuestionsExpanded ? 'flex-1' : 'lg:flex-1'}`}>
              {/* Mobile Toggle */}
              <button
                onClick={() => setIsQuestionsExpanded(!isQuestionsExpanded)}
                className="w-full p-4 flex items-center justify-between lg:hidden
                          text-sm text-gray-300 hover:bg-[#b35cff]/5"
              >
                <span>Questions</span>
                {isQuestionsExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              <div className={`overflow-y-auto bg-[#161622] lg:bg-transparent
                            ${isQuestionsExpanded ? 'block' : 'hidden lg:block'}
                            ${isQuestionsExpanded ? 'h-[50vh] lg:h-full' : 'lg:h-full'}`}>
                <div className="p-6">
                  <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-200 
                                prose-strong:text-white prose-em:text-[#b35cff] max-w-none
                                prose-a:text-[#b35cff] prose-a:no-underline hover:prose-a:text-[#ffad4a]
                                prose-code:text-[#ffad4a] prose-pre:bg-[#161622]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {questions || ''}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>

            {/* Answers Panel */}
            <div className={`lg:w-1/2 overflow-y-auto flex-1 
                          ${isQuestionsExpanded ? 'hidden lg:block' : 'block'}`}>
              <div className="p-6">
                <QuestionAnswerSection
                  answers={answers}
                  onAnswerChange={onAnswerChange}
                  onSubmit={onSubmitAnswers}
                  isSubmitting={isSubmitting}
                  feedback={feedback}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsModal; 
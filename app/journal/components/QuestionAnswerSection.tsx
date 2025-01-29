import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import FeedbackConfig, { FeedbackSettings } from './FeedbackConfig';

interface QuestionAnswerSectionProps {
  answers: string[];
  onAnswerChange: (index: number, value: string) => void;
  onSubmit: (settings: FeedbackSettings) => void;
  isSubmitting: boolean;
  feedback: string | null;
}

const defaultFeedbackSettings: FeedbackSettings = {
  examBoard: 'General Feedback',
  subjectArea: '',
  gradeLevel: 'General',
  additionalNotes: ''
};

const QuestionAnswerSection: React.FC<QuestionAnswerSectionProps> = ({
  answers,
  onAnswerChange,
  onSubmit,
  isSubmitting,
  feedback
}) => {
  const [feedbackSettings, setFeedbackSettings] = useState<FeedbackSettings>(defaultFeedbackSettings);
  const [isConfigExpanded, setIsConfigExpanded] = useState(false);

  const handleSubmit = () => {
    if (feedbackSettings) {
      onSubmit(feedbackSettings);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h4 className="text-sm font-medium text-gray-300">Your Answers</h4>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || answers.every(a => !a.trim())}
            className={`px-4 py-2 rounded-lg transition-all duration-300
                      flex items-center justify-center gap-2 w-full sm:w-auto
                      ${isSubmitting || answers.every(a => !a.trim())
                        ? 'bg-gray-500/10 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#b35cff]/20 to-[#ffad4a]/20 text-white hover:from-[#b35cff]/30 hover:to-[#ffad4a]/30'
                      }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Submit for Feedback</span>
              </>
            )}
          </button>
        </div>

        {/* Feedback Configuration */}
        <FeedbackConfig
          settings={feedbackSettings}
          onSettingsChange={setFeedbackSettings}
          isExpanded={isConfigExpanded}
          onToggleExpand={() => setIsConfigExpanded(!isConfigExpanded)}
        />
      </div>

      {/* Answer Fields */}
      <div className="space-y-6">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#b35cff]/10 border border-[#b35cff]/20 
                            flex items-center justify-center text-xs text-[#b35cff]">
                {i + 1}
              </span>
              <span className="text-xs sm:text-sm">Your Answer:</span>
            </label>
            <textarea
              value={answers[i]}
              onChange={(e) => onAnswerChange(i, e.target.value)}
              placeholder="Type your answer here..."
              className="w-full bg-[#161622] text-white border border-[#b35cff]/20 
                       rounded-lg p-3 text-sm placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50
                       disabled:opacity-50 disabled:cursor-not-allowed
                       min-h-[120px] resize-y"
              disabled={isSubmitting}
            />
          </div>
        ))}
      </div>

      {/* Feedback Section */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-4 border-t border-[#b35cff]/20 pt-6"
        >
          <h4 className="text-sm font-medium bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
            AI Feedback
          </h4>
          <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-200 
                         prose-strong:text-white prose-em:text-[#b35cff] max-w-none
                         prose-a:text-[#b35cff] prose-a:no-underline hover:prose-a:text-[#ffad4a]
                         prose-code:text-[#ffad4a] prose-pre:bg-[#161622]
                         prose-sm sm:prose-base">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {feedback}
            </ReactMarkdown>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuestionAnswerSection; 
import React from 'react';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface QuestionAnswerSectionProps {
  answers: string[];
  onAnswerChange: (index: number, value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  feedback: string | null;
}

const QuestionAnswerSection: React.FC<QuestionAnswerSectionProps> = ({
  answers,
  onAnswerChange,
  onSubmit,
  isSubmitting,
  feedback
}) => {
  return (
    <div className="space-y-6">
      {!feedback ? (
        <>
          {answers.map((answer, index) => (
            <div key={index} className="space-y-2">
              <label className="text-sm text-gray-400">Answer {index + 1}</label>
              <textarea
                value={answer}
                onChange={(e) => onAnswerChange(index, e.target.value)}
                placeholder="Type your answer here..."
                className="w-full bg-[#1E1E2E] text-white border border-[#b35cff]/20 
                         rounded-lg px-3 py-2 text-sm placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50
                         min-h-[100px] resize-y"
              />
            </div>
          ))}

          <button
            onClick={onSubmit}
            disabled={isSubmitting || answers.some(a => !a.trim())}
            className={`w-full px-4 py-3 rounded-lg transition-all duration-200
                      flex items-center justify-center gap-2
                      ${isSubmitting || answers.some(a => !a.trim())
                        ? 'bg-gray-500/10 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#b35cff]/10 to-[#ffad4a]/10 text-white hover:from-[#b35cff]/20 hover:to-[#ffad4a]/20'}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating Feedback...</span>
              </>
            ) : (
              <span>Submit Answers</span>
            )}
          </button>
        </>
      ) : (
        <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-200 
                       prose-strong:text-white prose-em:text-[#b35cff] max-w-none
                       prose-a:text-[#b35cff] prose-a:no-underline hover:prose-a:text-[#ffad4a]
                       prose-code:text-[#ffad4a] prose-pre:bg-[#161622]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {feedback}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswerSection; 
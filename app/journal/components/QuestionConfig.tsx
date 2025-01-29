import React from 'react';
import { Settings, ChevronDown } from 'lucide-react';

export interface QuestionConfig {
  type: 'single-long' | 'medium' | 'short';
  questionCount: number;
  marks: {
    perQuestion: number[];
  };
}

interface QuestionConfigProps {
  config: QuestionConfig;
  onConfigChange: (config: QuestionConfig) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const QuestionConfig: React.FC<QuestionConfigProps> = ({
  config,
  onConfigChange,
  isExpanded,
  onToggleExpand
}) => {
  const handleTypeChange = (type: QuestionConfig['type']) => {
    const newConfig: QuestionConfig = {
      type,
      questionCount: type === 'single-long' ? 1 : type === 'medium' ? 2 : 3,
      marks: {
        perQuestion: []
      }
    };

    // Initialize marks based on type
    switch (type) {
      case 'single-long':
        newConfig.marks.perQuestion = [20];
        break;
      case 'medium':
        newConfig.marks.perQuestion = Array(newConfig.questionCount).fill(8);
        break;
      case 'short':
        newConfig.marks.perQuestion = Array(newConfig.questionCount).fill(3);
        break;
    }

    onConfigChange(newConfig);
  };

  const handleQuestionCountChange = (count: number) => {
    const limits = getQuestionCountLimits();
    // Clamp the count between min and max limits
    const validCount = Math.min(Math.max(count, limits.min), limits.max);
    
    const newConfig = { ...config };
    newConfig.questionCount = validCount;

    // Adjust marks array based on new count
    if (validCount > newConfig.marks.perQuestion.length) {
      // Add new marks with default values
      const defaultMark = config.type === 'single-long' ? 20 : config.type === 'medium' ? 8 : 3;
      newConfig.marks.perQuestion = [
        ...newConfig.marks.perQuestion,
        ...Array(validCount - newConfig.marks.perQuestion.length).fill(defaultMark)
      ];
    } else {
      // Remove excess marks
      newConfig.marks.perQuestion = newConfig.marks.perQuestion.slice(0, validCount);
    }

    onConfigChange(newConfig);
  };

  const handleMarkChange = (index: number, value: number) => {
    const newConfig = { ...config };
    newConfig.marks.perQuestion[index] = value;
    onConfigChange(newConfig);
  };

  const getTotalMarks = () => {
    return config.marks.perQuestion.reduce((a, b) => a + b, 0);
  };

  const getQuestionCountLimits = () => {
    switch (config.type) {
      case 'single-long':
        return { min: 1, max: 1 };
      case 'medium':
        return { min: 1, max: 4 };
      case 'short':
        return { min: 1, max: 7 };
    }
  };

  const getMarksLimits = () => {
    switch (config.type) {
      case 'single-long':
        return { min: 10, max: 30 };
      case 'medium':
        return { min: 5, max: 15 };
      case 'short':
        return { min: 1, max: 5 };
    }
  };

  return (
    <div className="bg-[#161622] border border-[#b35cff]/20 rounded-lg overflow-hidden">
      <button
        onClick={onToggleExpand}
        className="w-full px-4 py-3 flex items-center justify-between text-sm
                  hover:bg-[#b35cff]/5 transition-colors duration-200"
      >
        <div className="flex items-center gap-2 text-gray-300">
          <Settings className="w-4 h-4" />
          <span>Question Preferences</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {getTotalMarks()} marks total
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200
                                ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 space-y-4 border-t border-[#b35cff]/20">
          <div className="space-y-2">
            <label className="text-xs text-gray-400">Question Type</label>
            <select
              value={config.type}
              onChange={(e) => handleTypeChange(e.target.value as QuestionConfig['type'])}
              className="w-full bg-[#1E1E2E] text-white border border-[#b35cff]/20 
                       rounded-lg px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50"
            >
              <option value="single-long">Long Question</option>
              <option value="medium">Medium Questions</option>
              <option value="short">Short Questions</option>
            </select>
          </div>

          {config.type !== 'single-long' && (
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Number of Questions</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={getQuestionCountLimits().min}
                  max={getQuestionCountLimits().max}
                  value={config.questionCount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      handleQuestionCountChange(value);
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      handleQuestionCountChange(value);
                    }
                  }}
                  className="w-20 bg-[#1E1E2E] text-white border border-[#b35cff]/20 
                           rounded-lg px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50"
                />
                <span className="text-xs text-gray-400">
                  (min {getQuestionCountLimits().min}, max {getQuestionCountLimits().max})
                </span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs text-gray-400">Marks per Question</label>
            <div className="space-y-2">
              {config.marks.perQuestion.map((marks, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-24">
                    Question {index + 1}:
                  </span>
                  <input
                    type="number"
                    min={getMarksLimits().min}
                    max={getMarksLimits().max}
                    value={marks}
                    onChange={(e) => handleMarkChange(index, parseInt(e.target.value))}
                    className="w-20 bg-[#1E1E2E] text-white border border-[#b35cff]/20 
                             rounded-lg px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50"
                  />
                  <span className="text-xs text-gray-400">
                    marks (max {getMarksLimits().max})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionConfig; 
import React from 'react';
import { Settings, ChevronDown } from 'lucide-react';

export interface FeedbackSettings {
  examBoard: string;
  subjectArea: string;
  gradeLevel: string;
  additionalNotes: string;
}

interface FeedbackConfigProps {
  settings: FeedbackSettings;
  onSettingsChange: (settings: FeedbackSettings) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const examBoards = [
  'General Feedback',
  'AQA',
  'Edexcel',
  'OCR',
  'WJEC',
  'Cambridge International',
  'IB',
  'Other'
];

const gradeLevels = [
  'General',
  'GCSE',
  'A-Level',
  'University',
  'Professional',
  'Other'
];

const FeedbackConfig: React.FC<FeedbackConfigProps> = ({
  settings,
  onSettingsChange,
  isExpanded,
  onToggleExpand
}) => {
  const handleChange = (field: keyof FeedbackSettings, value: string) => {
    onSettingsChange({
      ...settings,
      [field]: value
    });
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
          <span>Feedback Preferences</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200
                              ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {isExpanded && (
        <div className="p-4 space-y-4 border-t border-[#b35cff]/20">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Exam Board</label>
              <select
                value={settings.examBoard}
                onChange={(e) => handleChange('examBoard', e.target.value)}
                className="w-full bg-[#1E1E2E] text-white border border-[#b35cff]/20 
                         rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50"
              >
                {examBoards.map(board => (
                  <option key={board} value={board}>{board}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400">Grade Level</label>
              <select
                value={settings.gradeLevel}
                onChange={(e) => handleChange('gradeLevel', e.target.value)}
                className="w-full bg-[#1E1E2E] text-white border border-[#b35cff]/20 
                         rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50"
              >
                {gradeLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400">Subject Area</label>
            <input
              type="text"
              value={settings.subjectArea}
              onChange={(e) => handleChange('subjectArea', e.target.value)}
              placeholder="e.g., Mathematics, History, Computer Science"
              className="w-full bg-[#1E1E2E] text-white border border-[#b35cff]/20 
                       rounded-lg px-3 py-2 text-sm placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400">Additional Notes</label>
            <textarea
              value={settings.additionalNotes}
              onChange={(e) => handleChange('additionalNotes', e.target.value)}
              placeholder="Any specific requirements or focus areas..."
              className="w-full bg-[#1E1E2E] text-white border border-[#b35cff]/20 
                       rounded-lg px-3 py-2 text-sm placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50
                       min-h-[80px] resize-y"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackConfig; 
import React from 'react';

interface MemoryEditorProps {
  content: string;
  onChange: (content: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  autoFocus?: boolean;
  maxLength?: number;
}

const MemoryEditor: React.FC<MemoryEditorProps> = ({
  content,
  onChange,
  onKeyDown,
  placeholder = "Add a new memory... (Markdown supported)",
  autoFocus = false,
  maxLength = 500,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= maxLength) {
      onChange(newContent);
    }
  };

  const getCharacterCountColor = () => {
    const remaining = maxLength - content.length;
    if (remaining <= 50) return 'text-red-400';
    if (remaining <= 100) return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <div className="h-full flex flex-col">
      <textarea
        value={content}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        maxLength={maxLength}
        className="flex-1 w-full bg-transparent text-white p-2 rounded-lg
                  focus:outline-none placeholder-gray-400 resize-none font-mono"
        autoFocus={autoFocus}
      />
      <div className="flex justify-end mt-2">
        <span className={`text-xs ${getCharacterCountColor()} transition-colors duration-200`}>
          {content.length}/{maxLength} characters
        </span>
      </div>
    </div>
  );
};

export default MemoryEditor; 
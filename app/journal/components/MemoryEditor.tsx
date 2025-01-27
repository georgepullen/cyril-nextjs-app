import React, { useRef } from 'react';
import ImageInserter from './ImageInserter';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      // Submit on Shift+Enter
      e.preventDefault();
      onKeyDown(e);
    } else if (e.key === 'Escape') {
      // Pass through Escape key
      onKeyDown(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= maxLength) {
      onChange(newContent);
    }
  };

  const handleImageInsert = (markdown: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = content.substring(0, start) + markdown + content.substring(end);
    
    if (newContent.length <= maxLength) {
      onChange(newContent);
      // Set cursor position after the inserted markdown
      setTimeout(() => {
        textarea.focus();
        const newPosition = start + markdown.length;
        textarea.setSelectionRange(newPosition, newPosition);
      }, 0);
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
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full h-full bg-transparent text-white p-2 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50
                    placeholder-gray-400 resize-none font-mono
                    disabled:opacity-50 disabled:cursor-not-allowed"
          autoFocus={autoFocus}
          aria-label="Memory content"
          aria-describedby="character-count"
        />
        <div className="absolute bottom-2 right-2">
          <ImageInserter onInsert={handleImageInsert} />
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <span 
          id="character-count"
          className={`text-xs ${getCharacterCountColor()} transition-colors duration-200`}
          role="status"
          aria-live="polite"
        >
          {content.length}/{maxLength} characters
        </span>
      </div>
    </div>
  );
};

export default MemoryEditor; 
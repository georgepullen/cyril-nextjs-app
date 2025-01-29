import React, { useRef } from 'react';
import ImageInserter from './ImageInserter';

interface MemoryEditorProps {
  content: string;
  onChange: (content: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  autoFocus?: boolean;
  maxWords?: number;
}

const MemoryEditor: React.FC<MemoryEditorProps> = ({
  content,
  onChange,
  onKeyDown,
  placeholder = "Add a new memory... (Markdown supported)",
  autoFocus = false,
  maxWords = 5000,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getWordCount = (text: string): number => {
    // Split by whitespace and filter out empty strings
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      // Pass through Escape key
      onKeyDown(e);
    } else if (e.key === 'i' && e.ctrlKey && e.shiftKey) {
      // Ctrl+Shift+I for image insertion
      e.preventDefault();
      const imageButton = document.querySelector('[data-image-button]') as HTMLButtonElement;
      if (imageButton) {
        // Store current cursor position before clicking
        const start = e.currentTarget.selectionStart;
        const end = e.currentTarget.selectionEnd;
        imageButton.click();
        // Restore cursor position after click
        setTimeout(() => {
          e.currentTarget.focus();
          e.currentTarget.setSelectionRange(start, end);
        }, 0);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (getWordCount(newContent) <= maxWords) {
      onChange(newContent);
    }
  };

  const handleImageInsert = (markdown: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = content.substring(0, start) + markdown + content.substring(end);
    
    if (getWordCount(newContent) <= maxWords) {
      onChange(newContent);
      // Set cursor position after the inserted markdown
      setTimeout(() => {
        textarea.focus();
        const newPosition = start + markdown.length;
        textarea.setSelectionRange(newPosition, newPosition);
      }, 0);
    }
  };

  const getWordCountColor = () => {
    const remaining = maxWords - getWordCount(content);
    if (remaining <= 100) return 'text-red-400';
    if (remaining <= 500) return 'text-yellow-400';
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
          className="w-full h-full bg-transparent text-white p-2 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50
                    placeholder-gray-400 resize-none font-mono
                    disabled:opacity-50 disabled:cursor-not-allowed"
          autoFocus={autoFocus}
          aria-label="Memory content"
          aria-describedby="word-count"
        />
        <div className="absolute bottom-2 right-2">
          <ImageInserter onInsert={handleImageInsert} />
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <span 
          id="word-count"
          className={`text-xs ${getWordCountColor()} transition-colors duration-200`}
          role="status"
          aria-live="polite"
        >
          {getWordCount(content)}/{maxWords} words
        </span>
      </div>
    </div>
  );
};

export default MemoryEditor; 
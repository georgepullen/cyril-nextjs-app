import React, { useRef } from 'react';
import ImageInserter from './ImageInserter';

interface MemoryEditorProps {
  content: string;
  onChange: (content: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  autoFocus?: boolean;
  maxChars?: number;
}

const MemoryEditor: React.FC<MemoryEditorProps> = ({
  content,
  onChange,
  onKeyDown,
  placeholder = "Add a new memory... (Markdown supported)",
  autoFocus = false,
  maxChars = 5000,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    if (newContent.length <= maxChars) {
      onChange(newContent);
    }
  };

  const handleImageInsert = (markdown: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = content.substring(0, start) + markdown + content.substring(end);
    
    if (newContent.length <= maxChars) {
      onChange(newContent);
      // Set cursor position after the inserted markdown
      setTimeout(() => {
        textarea.focus();
        const newPosition = start + markdown.length;
        textarea.setSelectionRange(newPosition, newPosition);
      }, 0);
    }
  };

  const getCharCountColor = () => {
    const remaining = maxChars - content.length;
    if (remaining <= 200) return 'text-red-400';
    if (remaining <= 1000) return 'text-yellow-400';
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
          aria-describedby="char-count"
          maxLength={maxChars}
        />
        <div className="absolute bottom-2 right-2">
          <ImageInserter onInsert={handleImageInsert} />
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <span 
          id="char-count"
          className={`text-xs ${getCharCountColor()} transition-colors duration-200`}
          role="status"
          aria-live="polite"
        >
          {content.length}/{maxChars} characters
        </span>
      </div>
    </div>
  );
};

export default MemoryEditor; 
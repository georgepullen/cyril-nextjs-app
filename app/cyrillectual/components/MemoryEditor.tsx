import React, { useRef, useCallback } from 'react';
import ImageInserter from './ImageInserter';
import { 
  Bold, Italic, Heading1, Heading2, Heading3, 
  List, ListOrdered, Table, Link as LinkIcon, 
  Code, Quote, Strikethrough,
  Minus, CheckSquare
} from 'lucide-react';

interface MemoryEditorProps {
  content: string;
  onChange: (content: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  autoFocus?: boolean;
  maxChars?: number;
}

interface FormatAction {
  icon?: React.ReactNode;
  label?: string;
  action?: () => void;
  shortcut?: string;
  tooltip?: string;
  type?: 'separator';
}

const MemoryEditor: React.FC<MemoryEditorProps> = ({
  content,
  onChange,
  onKeyDown,
  placeholder = "Start writing your memory...",
  autoFocus = false,
  maxChars = 10000,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = useCallback((before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + 
                   before + selectedText + after + 
                   content.substring(end);

    if (newText.length <= maxChars) {
      onChange(newText);
      // Set cursor position after formatting
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + before.length + selectedText.length + after.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  }, [content, onChange, maxChars]);

  const insertBlockText = useCallback((before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    // Ensure there's a newline before and after the block
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);
    
    const needsNewlineBefore = beforeText.length > 0 && !beforeText.endsWith('\n\n');
    const needsNewlineAfter = afterText.length > 0 && !afterText.startsWith('\n\n');
    
    const newText = beforeText + 
                   (needsNewlineBefore ? '\n\n' : '') + 
                   before + selectedText + after + 
                   (needsNewlineAfter ? '\n\n' : '') + 
                   afterText;

    if (newText.length <= maxChars) {
      onChange(newText);
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + before.length + selectedText.length + after.length +
                            (needsNewlineBefore ? 2 : 0);
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  }, [content, onChange, maxChars]);

  const formatActions: FormatAction[] = [
    {
      icon: <Heading1 className="w-4 h-4" />,
      label: 'H1',
      action: () => insertBlockText('# '),
      shortcut: '1',
      tooltip: 'Heading 1'
    },
    {
      icon: <Heading2 className="w-4 h-4" />,
      label: 'H2',
      action: () => insertBlockText('## '),
      shortcut: '2',
      tooltip: 'Heading 2'
    },
    {
      icon: <Heading3 className="w-4 h-4" />,
      label: 'H3',
      action: () => insertBlockText('### '),
      shortcut: '3',
      tooltip: 'Heading 3'
    },
    { type: 'separator' },
    {
      icon: <Bold className="w-4 h-4" />,
      label: 'B',
      action: () => insertText('**', '**'),
      shortcut: 'B',
      tooltip: 'Bold'
    },
    {
      icon: <Italic className="w-4 h-4" />,
      label: 'I',
      action: () => insertText('*', '*'),
      shortcut: 'I',
      tooltip: 'Italic'
    },
    {
      icon: <Strikethrough className="w-4 h-4" />,
      label: 'S',
      action: () => insertText('~~', '~~'),
      shortcut: 'S',
      tooltip: 'Strikethrough'
    },
    { type: 'separator' },
    {
      icon: <List className="w-4 h-4" />,
      label: 'UL',
      action: () => insertBlockText('- '),
      tooltip: 'Bullet List'
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      label: 'OL',
      action: () => insertBlockText('1. '),
      tooltip: 'Numbered List'
    },
    {
      icon: <CheckSquare className="w-4 h-4" />,
      label: 'Task',
      action: () => insertBlockText('- [ ] '),
      tooltip: 'Task List'
    },
    { type: 'separator' },
    {
      icon: <Table className="w-4 h-4" />,
      label: 'Table',
      action: () => insertBlockText('| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |'),
      tooltip: 'Insert Table'
    },
    {
      icon: <LinkIcon className="w-4 h-4" />,
      label: 'Link',
      action: () => insertText('[', '](url)'),
      tooltip: 'Insert Link'
    },
    {
      icon: <Code className="w-4 h-4" />,
      label: 'Code',
      action: () => insertText('`', '`'),
      tooltip: 'Inline Code'
    },
    {
      icon: <Quote className="w-4 h-4" />,
      label: 'Quote',
      action: () => insertBlockText('> '),
      tooltip: 'Blockquote'
    },
    {
      icon: <Minus className="w-4 h-4" />,
      label: 'HR',
      action: () => insertBlockText('---'),
      tooltip: 'Horizontal Rule'
    }
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      onKeyDown(e);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      insertText('  '); // Insert 2 spaces for tab
    } else if (e.ctrlKey || e.metaKey) {
      const key = e.key.toUpperCase();
      const action = formatActions.find(a => a.shortcut === key);
      if (action?.action) {
        e.preventDefault();
        action.action();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= maxChars) {
      onChange(newContent);
    }
  };

  const getCharCountColor = () => {
    const remaining = maxChars - content.length;
    if (remaining <= 200) return 'text-red-400';
    if (remaining <= 1000) return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <div className="h-full flex flex-col bg-[#1E1E2E] rounded-lg border border-[#b35cff]/20">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-[#b35cff]/20">
        {formatActions.map((action, index) => 
          action.type === 'separator' ? (
            <div key={index} className="w-px h-6 bg-[#b35cff]/20 mx-1" />
          ) : (
            <button
              key={index}
              onClick={() => action.action && action.action()}
              className="p-1.5 rounded hover:bg-[#b35cff]/10 text-gray-300 
                       hover:text-white transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-[#b35cff]/50
                       group relative"
              title={`${action.tooltip}${action.shortcut ? ` (Ctrl+${action.shortcut})` : ''}`}
            >
              {action.icon}
              <span className="sr-only">{action.label}</span>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1
                            bg-[#1E1E2E] text-white text-xs rounded border border-[#b35cff]/20
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200
                            pointer-events-none whitespace-nowrap">
                {action.tooltip}
                {action.shortcut && <span className="ml-1 opacity-75">(Ctrl+{action.shortcut})</span>}
              </div>
            </button>
          )
        )}

        <div className="ml-auto flex items-center gap-2">
          <ImageInserter onInsert={(markdown) => insertText(markdown)} />
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full h-full bg-transparent text-white p-4 
                    focus:outline-none placeholder-gray-400 resize-none font-mono
                    disabled:opacity-50 disabled:cursor-not-allowed
                    scrollbar-thin scrollbar-thumb-[#b35cff]/20 scrollbar-track-transparent"
          autoFocus={autoFocus}
          aria-label="Memory content"
          aria-describedby="char-count"
          maxLength={maxChars}
          style={{ scrollbarWidth: 'thin' }}
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-[#b35cff]/20">
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
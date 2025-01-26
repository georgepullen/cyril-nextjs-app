import React, { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

interface ImageInserterProps {
  onInsert: (markdown: string) => void;
}

const ImageInserter: React.FC<ImageInserterProps> = ({ onInsert }) => {
  const [isInserting, setIsInserting] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleInsert = () => {
    if (imageUrl.trim()) {
      const markdown = `![Image](${imageUrl.trim()})`;
      onInsert(markdown);
      setImageUrl('');
      setIsInserting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInsert();
    } else if (e.key === 'Escape') {
      setIsInserting(false);
      setImageUrl('');
    }
  };

  return (
    <div className="relative inline-block">
      {isInserting ? (
        <div className="flex items-center bg-[#1E1E2E] border border-[#b35cff]/20 
                      rounded-lg overflow-hidden shadow-lg min-w-[250px] md:min-w-[300px]">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste image URL and press Enter"
            className="flex-1 bg-transparent text-white px-3 py-2 
                     focus:outline-none text-sm placeholder-gray-400"
            autoFocus
          />
          <div className="flex items-center px-2 space-x-1">
            <button
              onClick={() => {
                setIsInserting(false);
                setImageUrl('');
              }}
              className="p-1 text-gray-400 hover:text-gray-300 
                        hover:bg-gray-500/10 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={handleInsert}
              disabled={!imageUrl.trim()}
              className={`p-1 rounded transition-colors
                        ${imageUrl.trim() 
                          ? 'text-[#b35cff] hover:bg-[#b35cff]/10' 
                          : 'text-gray-400 cursor-not-allowed'}`}
            >
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsInserting(true)}
          className="p-2 text-[#b35cff] hover:bg-[#b35cff]/10 
                    rounded-lg transition-colors duration-200"
          title="Insert Image (Ctrl+Shift+I)"
          data-image-button
        >
          <ImageIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ImageInserter; 
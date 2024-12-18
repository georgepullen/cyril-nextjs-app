import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  content: string;
}

const ReleaseNotes: React.FC<MarkdownProps> = ({ content }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-900 text-white w-full">
      <img
        src="/logo.svg"
        alt="Logo"
        className="w-32 mb-6"
      />
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ReleaseNotes;

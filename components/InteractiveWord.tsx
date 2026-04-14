'use client';

import { useState } from 'react';
import { glossary } from '@/lib/data';

interface InteractiveWordProps {
  wordId: string;
  text: string;
  onWordClick: (wordId: string) => void;
}

export default function InteractiveWord({ wordId, text, onWordClick }: InteractiveWordProps) {
  const [isHovered, setIsHovered] = useState(false);
  const wordData = glossary[wordId];

  if (!wordData) return <span>{text}</span>;

  return (
    <span className="relative inline-block">
      <button
        className="font-bold text-[#2c3e50] hover:text-[#1a252f] underline decoration-dotted decoration-2 underline-offset-4 transition-colors duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.stopPropagation(); // Prevent page flip if clicking word
          onWordClick(wordId);
        }}
        aria-haspopup="dialog"
      >
        {text}
      </button>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 md:w-56 p-3 bg-[#fffdf8] border border-[#e2d9c8] text-gray-800 text-sm rounded shadow-xl z-50 pointer-events-none font-serif">
          <div className="font-bold text-[#2c3e50] mb-1 capitalize">{wordData.word}</div>
          <div className="text-gray-700 text-xs leading-relaxed">{wordData.definition}</div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#e2d9c8]"></div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#fffdf8] -mt-[1px]"></div>
        </div>
      )}
    </span>
  );
}

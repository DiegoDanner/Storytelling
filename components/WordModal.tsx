'use client';

import { glossary } from '@/lib/data';
import { X, Volume2 } from 'lucide-react';
import { useEffect } from 'react';
import { playAudio } from '@/lib/tts';

interface WordModalProps {
  wordId: string | null;
  onClose: () => void;
}

export default function WordModal({ wordId, onClose }: WordModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!wordId) return null;

  const wordData = glossary[wordId];
  if (!wordData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      {/* Subtle backdrop */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] pointer-events-auto" onClick={onClose} />
      
      <div 
        className="relative bg-[#fffdf8] rounded-sm shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 pointer-events-auto border border-[#e2d9c8]"
        role="dialog"
        aria-modal="true"
      >
        {/* Top decorative line (like a dictionary card) */}
        <div className="h-2 w-full bg-[#8b5a2b]"></div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-serif capitalize flex items-center gap-2">
                {wordData.word}
                <button 
                  onClick={() => playAudio(wordData.word)}
                  className="p-1.5 text-[#8b5a2b] hover:bg-[#8b5a2b]/10 rounded-full transition-colors"
                  aria-label="Listen to pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </h2>
              {wordData.pronunciation && (
                <p className="mt-1 text-sm font-mono text-gray-500">{wordData.pronunciation}</p>
              )}
            </div>
            <button 
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-full h-px bg-gray-200 my-2"></div>
          
          <div>
            <p className="text-lg text-gray-800 font-serif leading-relaxed">{wordData.definition}</p>
          </div>
          
          <div className="bg-[#f4f1ea] p-3 rounded border-l-4 border-[#8b5a2b]">
            <p className="text-gray-700 italic font-serif">&quot;{wordData.example}&quot;</p>
          </div>
        </div>
      </div>
    </div>
  );
}

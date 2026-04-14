'use client';

import { glossary } from '@/lib/data';
import { BookA, Volume2, X } from 'lucide-react';
import { useEffect } from 'react';
import { playAudio } from '@/lib/tts';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWordClick: (wordId: string) => void;
}

export default function GlossaryModal({ isOpen, onClose, onWordClick }: GlossaryModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const words = Object.values(glossary).sort((a, b) => a.word.localeCompare(b.word));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      
      <div 
        className="relative bg-[#fffdf8] rounded-sm shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200 pointer-events-auto border border-[#e2d9c8]"
        role="dialog"
        aria-modal="true"
      >
        <div className="h-2 w-full bg-[#2c3e50]"></div>
        <div className="flex items-center justify-between p-6 border-b border-[#e2d9c8] bg-[#f4f1ea]">
          <h2 className="text-2xl font-bold text-[#2c3e50] font-serif flex items-center gap-3">
            <BookA className="w-6 h-6" />
            Glossary
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-[#2c3e50] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid gap-4 md:grid-cols-2">
            {words.map((wordData) => (
              <div 
                key={wordData.id} 
                className="bg-white p-4 rounded-sm shadow-sm border border-[#e2d9c8] hover:border-[#2c3e50] hover:shadow-md transition-all cursor-pointer group"
                onClick={() => {
                  onClose();
                  onWordClick(wordData.id);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 font-serif capitalize group-hover:text-[#2c3e50] transition-colors">
                    {wordData.word}
                  </h3>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(wordData.word);
                    }}
                    className="p-1.5 text-gray-400 hover:text-[#2c3e50] hover:bg-[#f4f1ea] rounded-full transition-colors"
                    aria-label={`Listen to ${wordData.word}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 font-serif line-clamp-2">{wordData.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

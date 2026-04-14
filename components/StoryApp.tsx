'use client';

import { useState } from 'react';
import Book from './Book';
import WordModal from './WordModal';
import GlossaryModal from './GlossaryModal';
import { BookA } from 'lucide-react';

export default function StoryApp() {
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full flex justify-end">
        <button
          onClick={() => setIsGlossaryOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-sm hover:shadow-md hover:bg-blue-50 transition-all border border-blue-100"
        >
          <BookA className="w-5 h-5" />
          Open Glossary
        </button>
      </div>

      <Book onWordClick={setActiveWordId} />

      {activeWordId && (
        <WordModal 
          wordId={activeWordId} 
          onClose={() => setActiveWordId(null)} 
        />
      )}

      <GlossaryModal 
        isOpen={isGlossaryOpen} 
        onClose={() => setIsGlossaryOpen(false)}
        onWordClick={setActiveWordId}
      />
    </div>
  );
}

'use client';

import { PageData } from '@/lib/data';
import InteractiveWord from './InteractiveWord';
import Image from 'next/image';
import { Volume2 } from 'lucide-react';
import { playAudio } from '@/lib/tts';
import { useState } from 'react';

interface PageProps {
  page: PageData;
  onWordClick: (wordId: string) => void;
  isLeftPage?: boolean;
}

export default function Page({ page, onWordClick, isLeftPage }: PageProps) {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Derive the source based on error state and current page
  const imgSrc = imgError ? '/images/fallback-illustration.jpg' : page.imageUrl;

  return (
    <div 
      className="flex flex-col h-full relative"
      style={{ overflow: 'hidden', padding: '24px', boxSizing: 'border-box' }}
    >
      {/* Page Content */}
      <div className="flex-1 flex flex-col h-full">
        <div className="relative w-full h-[45%] min-h-[120px] mb-4 rounded-sm overflow-hidden shadow-sm border border-black/5 shrink-0 bg-[#f4f1ea]">
          {isLoading && (
            <div className="absolute inset-0 animate-pulse bg-[#e2d9c8]"></div>
          )}
          <Image
            key={page.imageUrl} // Forces re-render and resets loading/error state when url changes
            src={imgSrc}
            alt={page.imageAlt}
            fill
            className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            referrerPolicy="no-referrer"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setImgError(true);
              setIsLoading(false);
            }}
          />
        </div>
        
        <div className="flex-1 flex flex-col relative mt-2 pb-6">
          <button
            onClick={() => playAudio(page.rawText)}
            className="absolute -top-8 right-0 p-1.5 text-gray-400 hover:text-[#8b5a2b] transition-colors z-10"
            aria-label="Read page aloud"
          >
            <Volume2 className="w-5 h-5" />
          </button>
          
          <div 
            className="text-sm sm:text-base md:text-lg text-gray-800 font-serif text-justify"
            style={{ wordWrap: 'break-word', overflowWrap: 'break-word', lineHeight: 1.6 }}
          >
            {page.content.map((segment, index) => {
              if (segment.isWord && segment.wordId) {
                return (
                  <InteractiveWord
                    key={index}
                    wordId={segment.wordId}
                    text={segment.text}
                    onWordClick={onWordClick}
                  />
                );
              }
              return <span key={index}>{segment.text}</span>;
            })}
          </div>
        </div>
      </div>
      
      {/* Page Number */}
      <div className={`absolute bottom-4 ${isLeftPage ? 'left-6' : 'right-6'} text-gray-400 font-serif text-xs md:text-sm`}>
        {page.id}
      </div>
    </div>
  );
}

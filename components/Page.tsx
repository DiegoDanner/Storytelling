'use client';

import { PageData } from '@/lib/data';
import InteractiveWord from './InteractiveWord';
import Image from 'next/image';
import { useState } from 'react';

interface PageProps {
  page: PageData;
  onWordClick: (wordId: string) => void;
  isLeftPage?: boolean;
  displayMode?: 'image' | 'text' | 'both';
}

export default function Page({ page, onWordClick, isLeftPage, displayMode = 'both' }: PageProps) {
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
        {(displayMode === 'both' || displayMode === 'image') && (
          <div className={`relative w-full ${displayMode === 'image' ? 'h-full mb-0' : 'h-[45%] min-h-[120px] mb-4'} rounded-sm overflow-hidden shadow-sm border border-black/5 shrink-0 bg-[#f4f1ea]`}>
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
        )}
        
        {(displayMode === 'both' || displayMode === 'text') && (
          <div className={`flex-1 flex flex-col relative pb-8 overflow-hidden ${displayMode === 'text' ? 'justify-center px-4 md:px-8' : 'mt-2'}`} style={{ minHeight: '100%' }}>
            <div 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 font-serif text-justify"
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
        )}
      </div>
      
      {/* Page Number */}
      <div className={`absolute bottom-4 ${isLeftPage ? 'left-6' : 'right-6'} text-gray-400 font-serif text-xs md:text-sm`}>
        {displayMode === 'image' ? page.id * 2 - 1 : displayMode === 'text' ? page.id * 2 : page.id}
      </div>
    </div>
  );
}

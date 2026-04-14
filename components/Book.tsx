'use client';

import { useState, useRef, useEffect } from 'react';
import { storyPages } from '@/lib/data';
import Page from './Page';
import { motion } from 'motion/react';
import Image from 'next/image';
import { playAudio, pauseAudio, resumeAudio, stopAudio } from '@/lib/tts';
import { Play, Pause, Square } from 'lucide-react';

interface BookProps {
  onWordClick: (wordId: string) => void;
}

export default function Book({ onWordClick }: BookProps) {
  const [currentSheet, setCurrentSheet] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isAutoPlayingRef = useRef(false);

  const sheets: any[] = [];
  
  if (storyPages.length > 0) {
    // Front Cover
    sheets.push({
      isFrontCover: true,
      front: null,
      back: { page: storyPages[0], mode: 'image' },
    });

    for (let i = 1; i < storyPages.length; i++) {
      sheets.push({
        front: { page: storyPages[i - 1], mode: 'text' },
        back: { page: storyPages[i], mode: 'image' },
      });
    }

    // Last Story Sheet
    sheets.push({
      front: { page: storyPages[storyPages.length - 1], mode: 'text' },
      back: null,
    });
  } else {
    sheets.push({
      isFrontCover: true,
      front: null,
      back: null,
    });
  }

  // Back Cover
  sheets.push({
    isBackCover: true,
    front: null,
    back: null,
  });

  const turnNext = () => {
    if (currentSheet < sheets.length) {
      setCurrentSheet(prev => prev + 1);
    }
  };

  const turnPrev = () => {
    if (currentSheet > 0) {
      setCurrentSheet(prev => prev - 1);
    }
  };

  const handleBookClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      turnPrev();
    } else {
      turnNext();
    }
  };

  const handlePlay = () => {
    isAutoPlayingRef.current = true;
    setIsPlaying(true);
    setIsPaused(false);
    playCurrentSheet(currentSheet);
  };

  const handlePause = () => {
    pauseAudio();
    setIsPaused(true);
  };

  const handleResume = () => {
    resumeAudio();
    setIsPaused(false);
  };

  const handleStop = () => {
    isAutoPlayingRef.current = false;
    setIsPlaying(false);
    setIsPaused(false);
    stopAudio();
  };

  const playCurrentSheet = (sheetIndex: number) => {
    stopAudio();
    
    const sheet = sheets[sheetIndex];
    let textToRead = '';
    
    if (sheet.isFrontCover) {
      textToRead = "Leo's Night of Star-Dust and Stories. By Diego Danner.";
    } else if (sheet.front && sheet.front.mode === 'text') {
      textToRead = sheet.front.page.rawText;
    } else if (sheet.back && sheet.back.mode === 'text') {
      textToRead = sheet.back.page.rawText;
    } else if (sheet.isBackCover) {
      textToRead = "The End.";
    }

    if (textToRead) {
      playAudio(textToRead, () => {
        if (isAutoPlayingRef.current) {
          if (sheetIndex < sheets.length - 1) {
            setCurrentSheet(sheetIndex + 1);
          } else {
            handleStop();
          }
        }
      });
    } else {
      if (isAutoPlayingRef.current) {
        setTimeout(() => {
          if (isAutoPlayingRef.current) {
            if (sheetIndex < sheets.length - 1) {
              setCurrentSheet(sheetIndex + 1);
            } else {
              handleStop();
            }
          }
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (isAutoPlayingRef.current) {
      playCurrentSheet(currentSheet);
    }
  }, [currentSheet]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
      {/* Global Audio Controls */}
      <div className="flex items-center gap-4 mb-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-black/5">
        {!isPlaying ? (
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 text-gray-600 hover:text-[#2c3e50] transition-colors font-serif"
            aria-label="Play audiobook"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Read to me</span>
          </button>
        ) : (
          <>
            {isPaused ? (
              <button
                onClick={handleResume}
                className="flex items-center gap-2 text-gray-600 hover:text-[#2c3e50] transition-colors font-serif"
                aria-label="Resume audiobook"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-2 text-gray-600 hover:text-[#2c3e50] transition-colors font-serif"
                aria-label="Pause audiobook"
              >
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </button>
            )}
            <div className="w-px h-4 bg-gray-300 mx-2"></div>
            <button
              onClick={handleStop}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors font-serif"
              aria-label="Stop audiobook"
            >
              <Square className="w-5 h-5 fill-current" />
              <span>Stop</span>
            </button>
          </>
        )}
      </div>

      <div className="relative w-full aspect-[1.2/1] sm:aspect-[1.5/1] md:aspect-[2/1] perspective-[2500px] flex items-center justify-center p-2 md:p-8">
        {/* Book Container */}
        <motion.div 
        className="relative w-full h-full max-w-[96%] max-h-[96%] flex cursor-pointer justify-center items-center" 
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
        onClick={handleBookClick}
      >
        
        {/* Center Fold Shadow */}
        <div 
          className="absolute inset-y-0 left-1/2 w-16 -ml-8 z-50 pointer-events-none"
          style={{ 
            opacity: 0.15,
            background: 'linear-gradient(to right, rgba(0,0,0,0.08), rgba(0,0,0,0.02), rgba(0,0,0,0.08))'
          }}
        ></div>

        {/* Sheets */}
        {sheets.map((sheet, index) => {
          const isFlipped = currentSheet > index;
          const zIndex = isFlipped ? index : sheets.length - index;

          return (
            <motion.div
              key={index}
              className="absolute top-0 right-0 w-1/2 h-full origin-left pointer-events-none"
              initial={false}
              animate={{ rotateY: isFlipped ? -180 : 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
              style={{ 
                zIndex, 
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Front Face */}
              <div 
                className={`absolute inset-0 w-full h-full rounded-r-md pointer-events-auto shadow-[-1px_0_2px_rgba(0,0,0,0.1)] overflow-hidden ${sheet.isFrontCover ? 'bg-[#2c3e50]' : 'bg-[#fdfbf7]'}`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent w-8 pointer-events-none" />
                {sheet.isFrontCover && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 bg-[#2c3e50] shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]">
                    <div className="border-2 border-[#ecf0f1]/20 p-8 md:p-12 rounded-sm w-full h-full flex flex-col items-center justify-center">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-[#ecf0f1] text-center">Leo&apos;s Night of Star-Dust and Stories</h1>
                      <p className="text-xl md:text-2xl font-serif text-[#bdc3c7] text-center">By Diego Danner</p>
                    </div>
                  </div>
                )}
                {sheet.front && <Page page={sheet.front.page} onWordClick={onWordClick} isLeftPage={false} displayMode={sheet.front.mode} />}
              </div>

              {/* Back Face */}
              <div 
                className={`absolute inset-0 w-full h-full rounded-l-md pointer-events-auto shadow-[1px_0_2px_rgba(0,0,0,0.1)] overflow-hidden ${sheet.isBackCover ? 'bg-[#2c3e50]' : 'bg-[#fdfbf7]'}`}
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-l from-black/5 to-transparent w-8 right-0 pointer-events-none" />
                {sheet.isBackCover && (
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="w-16 h-16 rounded-full bg-black/10"></div>
                  </div>
                )}
                {sheet.back && <Page page={sheet.back.page} onWordClick={onWordClick} isLeftPage={true} displayMode={sheet.back.mode} />}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      </div>
    </div>
  );
}

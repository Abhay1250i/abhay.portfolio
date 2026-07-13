'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export const KonamiListener = () => {
  const router = useRouter();

  useEffect(() => {
    const konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const expectedKey = konamiCode[index].toLowerCase();

      if (key === expectedKey) {
        index++;
        if (index === konamiCode.length) {
          // Success! Confetti blast
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
          });
          
          // Flash a short console easter egg message
          console.log('%c🚀 ACCESS GRANTED: Developer Terminal unlocked!', 'color: #10b981; font-size: 16px; font-weight: bold;');
          
          // Redirect to terminal
          router.push('/terminal');
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return null;
};

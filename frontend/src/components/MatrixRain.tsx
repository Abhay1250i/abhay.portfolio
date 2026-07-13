'use client';

import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  onExit: () => void;
}

export const MatrixRain = ({ onExit }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters definition
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@&%*+=<>?/\\';
    const charArr = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);

    // Drops array
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // stagger starting heights
    }

    let animationId: number;

    const render = () => {
      // Semi-transparent black background creates fade trail effect
      ctx.fillStyle = 'rgba(3, 3, 3, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0f0'; // matrix green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop height if it reaches bottom
        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationId);
    };
  }, [onExit]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#030303]">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-6 left-6 font-mono text-xs text-green-400 bg-black/40 px-3 py-1.5 border border-green-500/20 rounded-md backdrop-blur-md animate-pulse">
        Press <kbd className="px-1.5 py-0.5 bg-green-500/10 border border-green-500/30 rounded text-green-300">ESC</kbd> to exit Matrix Mode.
      </div>
    </div>
  );
};
export default MatrixRain;

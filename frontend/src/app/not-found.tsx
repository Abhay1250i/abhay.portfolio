'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, Terminal, RotateCcw } from 'lucide-react';

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Game parameters
  const gridSize = 20;
  const tileCount = 15; // 300x300 canvas size
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 8, y: 8 },
    { x: 7, y: 8 },
  ]);
  const [food, setFood] = useState({ x: 4, y: 4 });
  const [dir, setDir] = useState({ x: 1, y: 0 });

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        setGameStarted(true);
      }
      switch (e.key) {
        case 'ArrowUp':
          if (dir.y !== 1) setDir({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (dir.y !== -1) setDir({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (dir.x !== 1) setDir({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (dir.x !== -1) setDir({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dir, gameStarted]);

  // Main game tick loop
  useEffect(() => {
    if (gameOver || !gameStarted) return;

    const gameTick = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        head.x += dir.x;
        head.y += dir.y;

        // Collision check with boundaries
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
          setGameOver(true);
          clearInterval(gameTick);
          return prevSnake;
        }

        // Collision check with self
        for (let i = 0; i < prevSnake.length; i++) {
          if (prevSnake[i].x === head.x && prevSnake[i].y === head.y) {
            setGameOver(true);
            clearInterval(gameTick);
            return prevSnake;
          }
        }

        const newSnake = [head, ...prevSnake];

        // Food collision check
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 10);
          setFood({
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
          });
        } else {
          newSnake.pop(); // remove tail to maintain size
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameTick);
  }, [dir, food, gameOver, gameStarted]);

  // Render canvas frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isLight = document.documentElement.classList.contains('light-theme');

    // Canvas background
    ctx.fillStyle = isLight ? '#e5e7eb' : '#111827';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Food
    ctx.fillStyle = '#ef4444'; // Red food
    ctx.beginPath();
    ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Snake
    ctx.fillStyle = '#3b82f6'; // Blue snake
    snake.forEach((part, index) => {
      // Draw head with gradient or circle
      if (index === 0) {
        ctx.fillStyle = '#2563eb';
      } else {
        ctx.fillStyle = '#3b82f6';
      }
      ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
    });
  }, [snake, food]);

  const resetGame = () => {
    setSnake([
      { x: 8, y: 8 },
      { x: 7, y: 8 },
    ]);
    setDir({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  return (
    <div className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-12 max-w-5xl mx-auto py-10 px-4">
      {/* Visual Game Details */}
      <div className="space-y-6 max-w-md text-center lg:text-left">
        <h1 className="font-display text-5xl font-black text-foreground">404 OUT OF BOUNDS</h1>
        <p className="text-sm text-muted leading-relaxed">
          The requested page is missing. In the meantime, try playing the classic **Snake mini-game**. Use your arrow keys to steer and eat food!
        </p>

        <div className="flex justify-center lg:justify-start gap-4">
          <Link href="/" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-transform hover:scale-105">
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
          <Link href="/terminal" className="px-4 py-2.5 bg-card hover:bg-input text-foreground border border-border rounded-xl text-xs font-semibold flex items-center gap-2 transition-transform hover:scale-105">
            <Terminal className="w-4 h-4 text-blue-500" />
            <span>Launch Shell</span>
          </Link>
        </div>
      </div>

      {/* Snake Game Canvas Board */}
      <div className="glass p-6 rounded-2xl border-border flex flex-col items-center shadow-lg relative max-w-sm">
        <div className="flex justify-between items-center w-full mb-4 text-xs font-mono text-muted">
          <span>SCORE: <b className="text-foreground">{score}</b></span>
          <span>HI-SCORE: <b className="text-foreground">150</b></span>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-border/80">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="block"
          />

          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
              <span className="text-xs font-semibold text-white font-mono animate-pulse">
                PRESS ANY ARROW KEY TO START
              </span>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center text-center p-4 gap-3">
              <span className="text-sm font-bold text-red-500 font-mono">GAME OVER</span>
              <button
                onClick={resetGame}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Game</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

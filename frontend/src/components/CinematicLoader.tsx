'use client';

import React, { useState, useEffect } from 'react';

export const CinematicLoader = () => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const logs = [
    'Initializing Portfolio...',
    'Loading Layout Engines...',
    'Injecting 3D Parallax Tilt Canvas...',
    'Connecting MongoDB Cluster API...',
    'Caching Web Audio Synth Oscillators...',
    'Booting AI Assistant (ANI)...',
    'Unlocking Developer Console Mode...',
    'Status: 100% Ready.',
  ];

  useEffect(() => {
    // Increment loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => setIsRemoved(true), 800); // fade out duration
          }, 400);
          return 100;
        }
        // Random incremental speed
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  // Increment console log lines based on progress
  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < logs.length - 1) return prev + 1;
        clearInterval(logInterval);
        return prev;
      });
    }, 600);

    return () => clearInterval(logInterval);
  }, []);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#030303] z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 ease-out select-none ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Visual noise background overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="w-full max-w-sm px-6 space-y-8 text-center relative">
        {/* Glow behind logo */}
        <div className="absolute -inset-10 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Cinematic Logo */}
        <h1 className="font-display text-5xl sm:text-6xl font-black tracking-widest text-white animate-pulse">
          ANI
        </h1>

        {/* Loading Progress Log */}
        <div className="h-16 flex flex-col justify-end text-[10px] text-gray-500 font-mono space-y-1 select-text">
          {logs.slice(Math.max(0, logIndex - 2), logIndex + 1).map((log, idx) => (
            <p
              key={idx}
              className={`transition-opacity duration-300 ${
                idx === 2 || logIndex < 2 ? 'text-blue-400 font-semibold' : 'opacity-55'
              }`}
            >
              &gt; {log}
            </p>
          ))}
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-2">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 transition-all duration-150 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-mono text-gray-400">
            <span>SYSTEM REBUILD</span>
            <span className="font-bold text-white">{Math.min(progress, 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CinematicLoader;

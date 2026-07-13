'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Terminal, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MatrixRain from '../../components/MatrixRain';
import { useTheme } from '../../components/ThemeContext';

interface CommandLog {
  command: string;
  output: string;
}

export default function TerminalPage() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: 'systeminfo',
      output: 'ANI.DEV OS [Version 1.0.0]\n(c) 2026 Abhay Kumar Bid. All rights reserved.\nType "help" for a list of available commands.',
    },
  ]);
  const [showMatrix, setShowMatrix] = useState(false);
  const router = useRouter();
  const { toggleTheme } = useTheme();
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [history]);

  // Log to Developer Console on page launch
  useEffect(() => {
    console.log(
      '%cHello Developer 👋 Welcome to ANI. Try typing "help" in the on-screen console!',
      'color: #3b82f6; font-size: 16px; font-weight: bold; padding: 8px;'
    );
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output = '';
    switch (cmd) {
      case 'help':
        output = `Available commands:
  about      - Display Abhay's bio
  skills     - View technical stack
  projects   - Show engineering works
  contact    - Retrieve contact methods
  matrix     - Trigger Matrix code rain overlay
  theme      - Toggle interface dark/light theme
  joke       - Print a developer joke
  secret     - Unlock developer achievements
  easteregg  - Fire particles
  clear      - Clear console log history
  exit       - Return to home page`;
        break;
      case 'about':
        output = `Abhay Kumar Bid
----------------------------
Degree:     B.Tech Computer Science Engineering (2025 - 2029)
College:    Roorkee Institute of Technology (RIT), Roorkee
Academic:   CGPA 8.5 / 10
Tagline:    Frontend Developer & AI Enthusiast`;
        break;
      case 'skills':
        output = `Technical stack proficiencies:
  Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP, Node.js, Express, MongoDB, Docker, Git.`;
        break;
      case 'projects':
        output = `Featured Engineering Works:
  - Truth Lense: Media authenticity verification tool (Next.js, FastAPI, Python).
  - Notes App: Offline note editor (React, IndexedDB).
  - Budget Tracker: Client financial dashboard (React, Chart.js).
  - Gov Subsidies: Accessibility aid portal (Node.js, Express, MongoDB).`;
        break;
      case 'contact':
        output = `Contact Information:
  Email:    abhaykumarbid.cse25@ritroorkee.com
  Phone:    +91 9204380297
  GitHub:   github.com/abhay1250i
  LinkedIn: linkedin.com/in/abhay-kumar-bid-769101381/`;
        break;
      case 'matrix':
        setShowMatrix(true);
        setInput('');
        return;
      case 'theme':
        toggleTheme();
        output = '🌓 Theme toggled successfully.';
        break;
      case 'joke':
        const jokes = [
          "Why do programmers wear glasses? Because they can't C#.",
          "There are 10 types of people in the world: those who understand binary, and those who don't.",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
          "['hip', 'hip'] (hip hip array!)"
        ];
        output = `😂 ${jokes[Math.floor(Math.random() * jokes.length)]}`;
        break;
      case 'secret':
        output = '🔓 ACHIEVEMENT UNLOCKED: Secret Project unlocked! Check out source code on github.com/abhay1250i.';
        break;
      case 'easteregg':
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        output = '🚀 Unlocked easter egg! Confetti particle system activated.';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        router.push('/');
        return;
      default:
        output = `Command not found: "${cmd}". Type "help" to see available options.`;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput('');
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center max-w-4xl mx-auto py-10">
      {showMatrix && <MatrixRain onExit={() => setShowMatrix(false)} />}

      {/* Return CTA */}
      <div className="mb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Console mode</span>
        </Link>
      </div>

      {/* Terminal window */}
      <div className="flex-1 glass border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[500px]">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-card border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-muted font-mono">abhay@ani.dev: ~/console</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          className="flex-1 p-6 overflow-y-auto bg-[#030303]/95 font-mono text-xs sm:text-sm text-green-400 space-y-4"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((log, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-blue-500 font-bold">abhay@ani.dev:~$</span>
                <span className="text-white font-semibold">{log.command}</span>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed text-gray-300">
                {log.output}
              </div>
            </div>
          ))}
          <div ref={terminalEndRef} />

          {/* Prompt line */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
            <span className="text-blue-500 font-bold shrink-0">abhay@ani.dev:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent border-0 text-white placeholder-transparent focus:outline-none focus:ring-0 select-text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
}

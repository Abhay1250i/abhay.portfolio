'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Home, User, Code, FileText, Mail, Terminal, Lock, Globe } from 'lucide-react';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const items = [
    { name: 'Go to Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'About Abhay', path: '/#about', icon: <User className="w-4 h-4" /> },
    { name: 'Skills & Tech Stack', path: '/#skills', icon: <Code className="w-4 h-4" /> },
    { name: 'View Projects', path: '/#projects', icon: <FileText className="w-4 h-4" /> },
    { name: 'Read Blog CMS', path: '/blog', icon: <FileText className="w-4 h-4" /> },
    { name: 'Abee\'s Bucket List', path: '/bucketlist', icon: <Globe className="w-4 h-4" /> },
    { name: 'Contact Abhay', path: '/#contact', icon: <Mail className="w-4 h-4" /> },
    { name: 'Developer Terminal', path: '/terminal', icon: <Terminal className="w-4 h-4" /> },
    { name: 'Admin Control Panel', path: '/admin', icon: <Lock className="w-4 h-4" /> },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const navigateTo = (path: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(path);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/50 backdrop-blur-xs"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="w-full max-w-lg overflow-hidden glass rounded-2xl shadow-2xl border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-border">
          <Search className="w-5 h-5 text-muted" />
          <input
            type="text"
            className="w-full h-14 bg-transparent border-0 px-4 text-foreground placeholder-muted focus:outline-none focus:ring-0 text-sm"
            placeholder="Type a command or search page..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs text-muted bg-input border border-border rounded-md">
            ESC
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-sm text-muted text-center">No results found.</div>
          ) : (
            filteredItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => navigateTo(item.path)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm text-foreground/90 hover:bg-input hover:text-foreground transition-all focus:outline-none cursor-pointer"
              >
                <span className="text-muted">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card text-xs text-muted">
          <span>Use ↑↓ to navigate, Enter to select</span>
          <span>Press Ctrl+K to toggle</span>
        </div>
      </div>
    </div>
  );
};

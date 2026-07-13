'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeContext';
import { Sun, Moon, Menu, X, Command } from 'lucide-react';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 glass-nav shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-display font-bold text-xl tracking-tight text-foreground flex items-center gap-1">
              <span>ani</span>
              <span className="text-blue-500">.</span>
              <span>dev</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#about" className="text-muted hover:text-foreground transition-colors text-sm font-medium">About</Link>
            <Link href="/#skills" className="text-muted hover:text-foreground transition-colors text-sm font-medium">Skills</Link>
            <Link href="/#projects" className="text-muted hover:text-foreground transition-colors text-sm font-medium">Projects</Link>
            <Link href="/blog" className="text-muted hover:text-foreground transition-colors text-sm font-medium">Blog</Link>
            <Link href="/bucketlist" className="text-muted hover:text-foreground transition-colors text-sm font-medium">Bucket List</Link>
            <Link href="/#contact" className="text-muted hover:text-foreground transition-colors text-sm font-medium">Contact</Link>
            
            {/* Command shortcut visual helper */}
            <div className="flex items-center gap-1 text-xs text-muted border border-border px-2 py-1 rounded bg-input">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="text-muted hover:text-foreground transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            {/* Theme Toggle Mobile */}
            <button 
              onClick={toggleTheme} 
              className="text-muted hover:text-foreground transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-muted hover:text-foreground transition-colors focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden glass border-t border-border p-4 space-y-3">
          <Link 
            href="/#about" 
            onClick={() => setIsOpen(false)}
            className="block text-muted hover:text-foreground text-sm font-medium"
          >
            About
          </Link>
          <Link 
            href="/#skills" 
            onClick={() => setIsOpen(false)}
            className="block text-muted hover:text-foreground text-sm font-medium"
          >
            Skills
          </Link>
          <Link 
            href="/#projects" 
            onClick={() => setIsOpen(false)}
            className="block text-muted hover:text-foreground text-sm font-medium"
          >
            Projects
          </Link>
          <Link 
            href="/blog" 
            onClick={() => setIsOpen(false)}
            className="block text-muted hover:text-foreground text-sm font-medium"
          >
            Blog
          </Link>
          <Link 
            href="/bucketlist" 
            onClick={() => setIsOpen(false)}
            className="block text-muted hover:text-foreground text-sm font-medium"
          >
            Bucket List
          </Link>
          <Link 
            href="/#contact" 
            onClick={() => setIsOpen(false)}
            className="block text-muted hover:text-foreground text-sm font-medium"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

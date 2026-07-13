'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, Home, Search, Trash2, Mail, 
  BrainCircuit, Globe, MessageSquare, 
  Calendar, FileText, CheckCircle2, ChevronRight, X 
} from 'lucide-react';
import Tilt3D from '../../components/Tilt3D';

interface Bookmark {
  name: string;
  url: string;
  category: string;
  subText?: string;
}

const DEFAULT_BOOKMARKS: Bookmark[] = [
  // Entertainment
  { name: 'YouTube', url: 'https://youtube.com', category: 'Entertainment' },
  { name: 'JioHotstar', url: 'https://jiohotstar.com', category: 'Entertainment' },
  
  // Birthdays
  { name: 'Little', url: '#', category: 'Birthdays', subText: 'Sep 20 • Turns 20' },
  
  // Social Media
  { name: 'Instagram', url: 'https://instagram.com', category: 'Social Media' },
  { name: 'X', url: 'https://x.com', category: 'Social Media' },
  { name: 'Threads', url: 'https://threads.net', category: 'Social Media' },
  { name: 'Gmail', url: 'mailto:abhaykumarbid.cse25@ritroorkee.com', category: 'Social Media' },
  { name: 'GitHub', url: 'https://github.com/abhay1250i', category: 'Social Media' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/abhay-kumar-bid-769101381/', category: 'Social Media' },
  
  // Projects
  { name: 'InkWell', url: '#', category: 'Projects' },
  { name: 'Golu', url: '#', category: 'Projects', subText: 'Aug 24 • Turns 18' },
  
  // Reviews
  { name: 'Abeee', url: '#', category: 'Reviews', subText: 'Aug 3 • Turns 20' },
  { name: 'Movies4u', url: '#', category: 'Reviews' },
  { name: 'MOVIESMOD', url: '#', category: 'Reviews' },
  { name: 'KatWorld', url: '#', category: 'Reviews' },
  { name: 'Moctale', url: '#', category: 'Reviews' },
  
  // AI
  { name: 'ChatGPT', url: 'https://chat.openai.com', category: 'AI' },
  { name: 'Claude', url: 'https://claude.ai', category: 'AI' },
  { name: 'Gemini', url: 'https://gemini.google.com', category: 'AI' },
  { name: 'Stitch', url: '#', category: 'AI' },
  
  // Live
  { name: 'Cricket', url: '#', category: 'Live' },
  { name: 'Football', url: '#', category: 'Live' },
  { name: 'Formula 1', url: '#', category: 'Live' },
  
  // Cr9
  { name: 'Crex', url: '#', category: 'Cr9' },
  { name: 'Cricbuzz', url: 'https://cricbuzz.com', category: 'Cr9' },
  
  // Notes
  { name: 'Google', url: 'https://google.com', category: 'Notes' },
  { name: 'Notes', url: '#', category: 'Notes' }
];

export default function BucketListPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  
  // Form input state
  const [newLink, setNewLink] = useState({ name: '', url: '', category: 'Social Media', subText: '' });

  useEffect(() => {
    const saved = localStorage.getItem('bucket_list_bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    } else {
      setBookmarks(DEFAULT_BOOKMARKS);
      localStorage.setItem('bucket_list_bookmarks', JSON.stringify(DEFAULT_BOOKMARKS));
    }
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Entertainment': return <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
      case 'Birthdays': return <Calendar className="w-4 h-4 text-pink-500" />;
      case 'Social Media': return <svg className="w-4 h-4 stroke-current fill-none text-purple-500" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
      case 'Projects': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'AI': return <BrainCircuit className="w-4 h-4 text-indigo-500" />;
      default: return <Globe className="w-4 h-4 text-muted" />;
    }
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.name || !newLink.url) return;

    const updated = [...bookmarks, newLink];
    setBookmarks(updated);
    localStorage.setItem('bucket_list_bookmarks', JSON.stringify(updated));
    setNewLink({ name: '', url: '', category: 'Social Media', subText: '' });
    setIsModalOpen(false);
  };

  const handleDeleteLink = (name: string) => {
    const updated = bookmarks.filter((b) => b.name !== name);
    setBookmarks(updated);
    localStorage.setItem('bucket_list_bookmarks', JSON.stringify(updated));
  };

  // Group bookmarks by category
  const categories = Array.from(new Set(bookmarks.map((b) => b.category)));

  const filteredBookmarks = bookmarks.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-[85vh] py-8 space-y-8 relative">
      {/* Background visual image overlay recreating the Red Bull F1 garage theme */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-20 opacity-30 mix-blend-overlay pointer-events-none rounded-3xl"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/95 to-background -z-10 pointer-events-none rounded-3xl" />

      {/* Header Panel */}
      <div className="flex items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-transform hover:scale-105">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Abee's Bucket List
            </h1>
            <p className="text-[10px] text-muted font-mono">WORKSPACE ROUTER: ~/bucketlist</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Link</span>
          </button>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="max-w-md glass flex items-center px-4 py-2.5 rounded-xl border-border">
        <Search className="w-4 h-4 text-muted mr-2" />
        <input 
          type="text" 
          placeholder="Filter bucket bookmarks..."
          className="bg-transparent border-0 text-xs text-foreground placeholder-muted focus:outline-none w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Bookmark Cards Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const categoryItems = filteredBookmarks.filter((b) => b.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <Tilt3D key={category}>
              <div className="glass p-5 rounded-2xl border-border space-y-4 flex flex-col justify-between h-fit min-h-[200px] shadow-sm hover:border-blue-500/30 transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-border/40 pb-2">
                    <span className="text-xs font-bold text-foreground tracking-wide flex items-center gap-2">
                      {getCategoryIcon(category)}
                      {category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {categoryItems.map((item) => (
                      <div key={item.name} className="flex justify-between items-center group/item p-1.5 rounded-lg hover:bg-input transition-colors">
                        <a 
                          href={item.url} 
                          target={item.url.startsWith('http') ? '_blank' : '_self'} 
                          rel="noopener noreferrer"
                          className="flex-1 text-xs text-foreground/90 hover:text-blue-500 font-medium transition-colors"
                        >
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            {item.subText && (
                              <span className="text-[9px] text-muted font-mono">{item.subText}</span>
                            )}
                          </div>
                        </a>
                        <button
                          onClick={() => handleDeleteLink(item.name)}
                          className="text-muted hover:text-red-500 transition-colors opacity-0 group-hover/item:opacity-100 p-0.5"
                          aria-label={`Delete ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tilt3D>
          );
        })}
      </div>

      {/* ADD BOOKMARK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="glass w-full max-w-sm rounded-2xl border-border p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <h3 className="font-display font-bold text-foreground text-sm">Add New Link</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-foreground cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLink} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-muted font-semibold">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none"
                  placeholder="Instagram / InkWell"
                  value={newLink.name}
                  onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted font-semibold">URL</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none"
                  placeholder="https://example.com"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted font-semibold">Category</label>
                <select
                  className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none"
                  value={newLink.category}
                  onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
                >
                  <option value="Entertainment">Entertainment</option>
                  <option value="Birthdays">Birthdays</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Projects">Projects</option>
                  <option value="Reviews">Reviews</option>
                  <option value="AI">AI</option>
                  <option value="Live">Live</option>
                  <option value="Cr9">Cr9</option>
                  <option value="Notes">Notes</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-muted font-semibold">Sub-text (Optional)</label>
                <input 
                  type="text" 
                  className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none"
                  placeholder="Sep 20 • Turns 20"
                  value={newLink.subText}
                  onChange={(e) => setNewLink({ ...newLink, subText: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold cursor-pointer"
              >
                Add Bookmark
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Calendar, ChevronRight, X } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  readTime: string;
  createdAt: string;
  coverImage?: string;
}

const FALLBACK_BLOGS: BlogPost[] = [
  {
    _id: '1',
    title: 'Mastering Framer Motion in Next.js',
    slug: 'mastering-framer-motion-nextjs',
    content: `Framer Motion is a production-ready motion library for React. It offers simple, declarative APIs to coordinate complex animations, layout shifts, and scroll-linked effects.\n\n### Why use Framer Motion in Next.js App Router?\nWith Server Components by default, you can delegate visual animations to Client Components. Subtly adding transitions can make a website feel highly polished, expensive, and responsive. For example, animating card enters using simple \`initial\` and \`animate\` attributes:\n\n\`\`\`typescript\n<motion.div\n  initial={{ opacity: 0, y: 20 }}\n  animate={{ opacity: 1, y: 0 }}\n/>\n\`\`\``,
    tags: ['Next.js', 'React', 'Framer Motion', 'Web Design'],
    readTime: '4 min read',
    createdAt: '2026-07-10T12:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe'
  },
  {
    _id: '2',
    title: 'Building a Developer Terminal in React',
    slug: 'developer-terminal-react',
    content: `Recruiters love easter eggs. Adding a fully functional, interactive shell console inside your developer portfolio creates an unforgettable experience.\n\n### Capturing the Konami Code\nBy registering a global keydown event listener in React, you can match incoming keys to the sequence array:\n\n\`\`\`typescript\nconst konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];\n\`\`\`\n\nWhen a match is finalized, trigger confetti explosions and redirect to \`/terminal\`. This shows immediate frontend competence and playful attention to detail.`,
    tags: ['React', 'TypeScript', 'Terminal', 'Easter Eggs'],
    readTime: '6 min read',
    createdAt: '2026-07-12T15:30:00Z',
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713'
  }
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      try {
        const res = await fetch(`${backendUrl}/blogs`);
        if (res.ok) {
          const data = await res.json();
          setBlogs(data.length > 0 ? data : FALLBACK_BLOGS);
        } else {
          setBlogs(FALLBACK_BLOGS);
        }
      } catch (err) {
        setBlogs(FALLBACK_BLOGS);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      {/* Return Home CTA */}
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
        <h1 className="font-display text-4xl font-bold text-foreground flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-500" />
          <span>Engineering Blog &amp; CMS</span>
        </h1>
        <p className="text-muted text-sm mt-1">
          Sharing concepts, guides, and thoughts on frontend architecture and artificial intelligence.
        </p>
      </div>

      {/* Blogs list */}
      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <div 
            key={blog._id} 
            className="glass rounded-2xl border-border overflow-hidden hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between shadow-sm"
          >
            {blog.coverImage && (
              <div 
                className="h-48 w-full bg-cover bg-center border-b border-border/50" 
                style={{ backgroundImage: `url(${blog.coverImage})` }} 
              />
            )}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-muted font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {blog.readTime}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-foreground leading-tight">{blog.title}</h3>
              
              <p className="text-xs text-muted/95 leading-relaxed">
                {blog.content.replace(/[#*`]/g, '').substring(0, 150)}...
              </p>
              
              <div className="flex flex-wrap gap-1.5 pt-2">
                {blog.tags.map((tag) => (
                  <span key={tag} className="text-[9px] bg-input border border-border px-2 py-0.5 rounded text-muted font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <button 
                onClick={() => setSelectedBlog(blog)}
                className="w-full py-2.5 bg-input hover:bg-blue-600 hover:text-white rounded-xl text-xs font-semibold text-muted hover:shadow-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Read Full Article</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* IMMERSIVE READING OVERLAY MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass w-full max-w-3xl rounded-2xl border-border max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col">
            
            {/* Header / Close button */}
            <div className="sticky top-0 bg-background/95 backdrop-blur-md px-6 py-4 border-b border-border flex items-center justify-between z-10">
              <h2 className="font-display font-bold text-foreground text-base truncate pr-6">{selectedBlog.title}</h2>
              <button 
                onClick={() => setSelectedBlog(null)} 
                className="text-muted hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content body */}
            <div className="p-8 space-y-6 text-sm text-foreground/90 leading-relaxed font-sans">
              <div className="flex items-center gap-4 text-xs text-muted font-mono border-b border-border/50 pb-4">
                <span>Published: {new Date(selectedBlog.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>Read Time: {selectedBlog.readTime}</span>
              </div>
              <div className="whitespace-pre-wrap space-y-4">
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

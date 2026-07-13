'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Mail, Phone, BookOpen, GraduationCap, Award, 
  Send, ExternalLink, Code2, Cpu, Rocket, ChevronRight,
  Timeline, Terminal, Flame, BookOpenCheck
} from 'lucide-react';
import Tilt3D from '../components/Tilt3D';
import CinematicLoader from '../components/CinematicLoader';
import GithubStats from '../components/GithubStats';

interface ProjectType {
  _id: string;
  title: string;
  description: string;
  stack: string[];
  challenges?: string;
  outcomes?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

interface SkillType {
  _id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  proficiency: number;
  linesOfCode?: string;
  experience?: string;
}

const FALLBACK_PROJECTS: ProjectType[] = [
  {
    _id: '1',
    title: 'Truth Lense',
    description: 'A media authenticity validation platform that aggregates visual forensics algorithms to authenticate digital content.',
    stack: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Python', 'Docker'],
    challenges: 'Integrating resource-heavy Python forensic models and maintaining low latency for web clients during visual processing uploads.',
    outcomes: 'Built a modular microservices API queue, reducing front-end waiting time by 45% using Server-Sent Events (SSE).',
    githubUrl: 'https://github.com/abhay1250i/truth-lense',
    liveUrl: 'https://truthlense.ani.dev',
    featured: true,
  },
  {
    _id: '2',
    title: 'ani.dev Portfolio',
    description: 'The premium, responsive personal brand portfolio platform styled like Apple & Linear, running with integrated developer terminal mode.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Express', 'MongoDB'],
    challenges: 'Creating fluid, high-performance transitions and managing persistent layouts for interactive admin and terminal views.',
    outcomes: 'Achieved 98+ Lighthouse scores across SEO, Performance, and Accessibility.',
    githubUrl: 'https://github.com/abhay1250i/portfolio',
    liveUrl: 'https://ani.dev',
    featured: true,
  },
  {
    _id: '3',
    title: 'Abee Bucket List Extension',
    description: 'A Chrome productivity extension styled like Red Bull F1 garage to organize shortcuts, bookmarks, AI routes, and birthdays in a glassmorphic board.',
    stack: ['Chrome API', 'React', 'TypeScript', 'Tailwind CSS', 'Webpack'],
    challenges: 'Managing cross-origin messaging and persistent local state variables across background service workers.',
    outcomes: 'Deployed as a zip bundle, organizing bookmarks into responsive grids with 3D tilt effects.',
    featured: true,
  },
  {
    _id: '4',
    title: 'Government Subsidies Portal',
    description: 'A portal simplifying discovery and application for state-provided subsidies, targeted at accessibility.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    challenges: 'Designing for extremely diverse screen sizes and poor internet connections in remote areas.',
    outcomes: 'Deployed with high responsiveness, supporting offline accessibility for cached items.',
    githubUrl: 'https://github.com/abhay1250i/subsidy-portal',
    featured: true,
  },
  {
    _id: '5',
    title: 'Notes App',
    description: 'An offline-first markdown-enabled personal note-taking utility with tags and auto-save capabilities.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'IndexedDB'],
    challenges: 'Syncing note states and schemas across client-side IndexedDB databases.',
    outcomes: 'Delivered an offline notepad supporting custom markdown rendering styles.',
    githubUrl: 'https://github.com/abhay1250i/notes-app',
    featured: false,
  },
  {
    _id: '6',
    title: 'Budget Tracker',
    description: 'A client-side financial tracker helping users log expenses, set limits, and view charts.',
    stack: ['React', 'Chart.js', 'Tailwind CSS', 'LocalStorage API'],
    challenges: 'Maintaining responsive chart sizing during browser window resize events.',
    outcomes: 'Created an offline-first visualizer tool for quick personal expense tracking.',
    githubUrl: 'https://github.com/abhay1250i/budget-tracker',
    featured: false,
  },
  {
    _id: '7',
    title: 'DSA & Mini Projects',
    description: 'A repository containing clean Data Structures and Algorithms solutions alongside interactive mini utilities.',
    stack: ['C++', 'JavaScript', 'HTML5', 'Algorithms'],
    challenges: 'Documenting code logic and complex data structures for educational clarity.',
    outcomes: 'Maintained 80+ optimized algorithm files covering sorting, dynamic programming, and grids.',
    githubUrl: 'https://github.com/abhay1250i/dsa',
    featured: false,
  }
];

const FALLBACK_SKILLS: SkillType[] = [
  { _id: '1', name: 'React', category: 'frontend', proficiency: 85, linesOfCode: '18,000+', experience: '1 Year' },
  { _id: '2', name: 'Next.js', category: 'frontend', proficiency: 80, linesOfCode: '12,000+', experience: '1 Year' },
  { _id: '3', name: 'TypeScript', category: 'frontend', proficiency: 78, linesOfCode: '8,000+', experience: '1 Year' },
  { _id: '4', name: 'Tailwind CSS', category: 'frontend', proficiency: 90, linesOfCode: '25,000+', experience: '1 Year' },
  { _id: '5', name: 'Framer Motion', category: 'frontend', proficiency: 75, linesOfCode: '3,000+', experience: '1 Year' },
  { _id: '6', name: 'Node.js', category: 'backend', proficiency: 65, linesOfCode: '5,000+', experience: 'Studying' },
  { _id: '7', name: 'Express.js', category: 'backend', proficiency: 70, linesOfCode: '4,000+', experience: 'Studying' },
  { _id: '8', name: 'MongoDB', category: 'backend', proficiency: 60, linesOfCode: 'Basic Schemas', experience: 'Studying' },
  { _id: '9', name: 'Docker', category: 'tools', proficiency: 65, linesOfCode: 'Basic Containers', experience: '8 Months' },
  { _id: '10', name: 'Git & GitHub', category: 'tools', proficiency: 80, linesOfCode: '80+ Commits', experience: '8 Months' }
];

export default function Home() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Hover state details for skills cards
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      try {
        const [projRes, skillRes] = await Promise.all([
          fetch(`${backendUrl}/projects`),
          fetch(`${backendUrl}/skills`),
        ]);
        if (projRes.ok && skillRes.ok) {
          const projs = await projRes.json();
          const sks = await skillRes.json();
          
          // Map properties to set stats
          const mappedSks = sks.length > 0 ? sks.map((s: any, idx: number) => ({
            ...s,
            linesOfCode: FALLBACK_SKILLS[idx]?.linesOfCode || '10,000+',
            experience: FALLBACK_SKILLS[idx]?.experience || '1 Year'
          })) : FALLBACK_SKILLS;

          setProjects(projs.length > 0 ? projs : FALLBACK_PROJECTS);
          setSkills(mappedSks);
        } else {
          setProjects(FALLBACK_PROJECTS);
          setSkills(FALLBACK_SKILLS);
        }
      } catch (err) {
        setProjects(FALLBACK_PROJECTS);
        setSkills(FALLBACK_SKILLS);
      }
    };
    fetchData();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('loading');
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${backendUrl}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (res.ok) {
        setContactStatus('success');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setContactStatus('error');
      }
    } catch (err) {
      setContactStatus('error');
    }
  };

  return (
    <div className="space-y-24">
      <CinematicLoader />

      {/* HERO SECTION */}
      <section className="min-h-[75vh] flex flex-col justify-center items-center text-center px-4 relative mt-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-500 mb-6 font-semibold animate-bounce">
          <Rocket className="w-3.5 h-3.5" />
          <span>Frontend Developer &amp; AI Enthusiast</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl leading-tight">
          I don't just build websites. <br/>
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            I build experiences
          </span> that remain.
        </h1>

        <p className="text-muted text-base sm:text-lg md:text-xl max-w-2xl mt-6 leading-relaxed">
          Hi, I'm <span className="text-foreground font-semibold">Abhay Kumar Bid</span>. Crafting visual interfaces with high performance, micro-animations, and integrated artificial intelligence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link href="#contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:scale-105 text-sm cursor-pointer">
            Hire Me
          </Link>
          <Link href="#projects" className="px-6 py-3 bg-card hover:bg-input text-foreground font-medium rounded-xl border border-border transition-all hover:scale-105 text-sm cursor-pointer">
            View Projects
          </Link>
          <a href="https://github.com/abhay1250i" target="_blank" rel="noopener noreferrer" className="p-3 bg-card hover:bg-input text-foreground rounded-xl border border-border transition-transform hover:scale-110 flex items-center justify-center cursor-pointer" aria-label="GitHub">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/abhay-kumar-bid-769101381/" target="_blank" rel="noopener noreferrer" className="p-3 bg-card hover:bg-input text-foreground rounded-xl border border-border transition-transform hover:scale-110 flex items-center justify-center cursor-pointer" aria-label="LinkedIn">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
      </section>

      {/* ABOUT & TIMELINE STORY */}
      <section id="about" className="scroll-mt-20">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-8 border-l-4 border-blue-500 pl-4">
          The Journey
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Tilt3D>
            <div className="glass p-8 rounded-2xl border-border space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* Profile Picture Element */}
                <div className="w-24 h-24 rounded-2xl border border-border shadow-md flex-shrink-0 relative overflow-hidden group bg-card">
                  <img 
                    src="/profile.jpg" 
                    alt="Abhay Kumar Bid" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-1.5">
                    <span className="text-[9px] text-white font-mono font-semibold">Abhay Bid</span>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    <span>Who am I?</span>
                  </h3>
                  <div className="text-foreground/80 leading-relaxed text-sm space-y-4">
                    <p>
                      I am a builder. I started coding because I wanted to create things that could exist outside my own mind. My first project was a simple calculator, but the feeling of typing code and watching something align in real-time was addictive.
                    </p>
                    <p>
                      I've built systems that failed, APIs that crashed, and UI components that looked messy. But every error code was a lesson. Fast forward to today: I'm focusing on high-performance design, interactive animations, and integration of neural network elements.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50 text-xs">
                <div>
                  <span className="block text-muted font-semibold">CAMPUS</span>
                  <span className="text-foreground font-medium">RIT Roorkee</span>
                </div>
                <div>
                  <span className="block text-muted font-semibold">EMAIL</span>
                  <span className="text-foreground font-mono break-all">abhaykumarbid.cse25@ritroorkee.com</span>
                </div>
              </div>
            </div>
          </Tilt3D>

          {/* Interactive Timeline */}
          <div className="glass p-8 rounded-2xl border-border space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              <span>Interactive Timeline</span>
            </h3>
            
            <div className="border-l border-border pl-6 relative space-y-6 text-xs">
              <div className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-background group-hover:scale-125 transition-transform" />
                <span className="font-bold text-foreground block">B.Tech Admission</span>
                <p className="text-[10px] text-muted mt-0.5">Joined Roorkee Institute of Technology, CSE (2025)</p>
              </div>

              <div className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-background group-hover:scale-125 transition-transform" />
                <span className="font-bold text-foreground block">Built Truth Lense</span>
                <p className="text-[10px] text-muted mt-0.5">Media authenticity forensic validation service queue.</p>
              </div>

              <div className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-background group-hover:scale-125 transition-transform" />
                <span className="font-bold text-foreground block">Hackathons &amp; Open Source</span>
                <p className="text-[10px] text-muted mt-0.5">Collaborated on modular tool packages and custom extension systems.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS INTERACTIVE CARDS */}
      <section id="skills" className="scroll-mt-20">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-4 border-l-4 border-blue-500 pl-4">
          Tech Stack &amp; Metrics
        </h2>
        <p className="text-muted text-xs mb-8">Hover over any technology card to reveal development metrics.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(['frontend', 'backend', 'tools'] as const).map((cat) => (
            <div key={cat} className="glass p-6 rounded-2xl border-border space-y-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground capitalize flex items-center gap-2 border-b border-border/40 pb-3">
                {cat === 'frontend' && <Code2 className="w-5 h-5 text-blue-500" />}
                {cat === 'backend' && <Cpu className="w-5 h-5 text-purple-500" />}
                {cat === 'tools' && <Award className="w-5 h-5 text-emerald-500" />}
                <span>{cat} Development</span>
              </h3>
              
              <div className="space-y-4">
                {skills
                  .filter((s) => s.category === cat)
                  .map((skill) => (
                    <div 
                      key={skill._id} 
                      className="relative p-3 rounded-xl hover:bg-input border border-transparent hover:border-border transition-all duration-300"
                      onMouseEnter={() => setHoveredSkill(skill._id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-foreground/90 font-semibold">{skill.name}</span>
                        <span className="text-blue-500 font-bold">{skill.proficiency}%</span>
                      </div>

                      {/* Expanding details on hover */}
                      <div className={`mt-2 overflow-hidden transition-all duration-300 text-[10px] text-muted ${
                        hoveredSkill === skill._id ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="flex justify-between pt-1 font-mono">
                          <span>LOC: {skill.linesOfCode}</span>
                          <span>XP: {skill.experience}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS IN 3D PARALLAX */}
      <section id="projects" className="scroll-mt-20">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-8 border-l-4 border-blue-500 pl-4">
          Featured Engineering Works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <Tilt3D key={proj._id} className="h-full">
              <div className="glass p-6 rounded-2xl border-border hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-foreground">{proj.title}</h3>
                    <div className="flex gap-2">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors cursor-pointer" aria-label="GitHub">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors cursor-pointer" aria-label="Live Demo">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{proj.description}</p>
                  
                  {proj.challenges && (
                    <div className="text-[11px] bg-card p-3 rounded-lg border border-border">
                      <span className="font-semibold text-blue-500 block mb-1">Challenge:</span>
                      <span className="text-muted">{proj.challenges}</span>
                    </div>
                  )}
                  
                  {proj.outcomes && (
                    <div className="text-[11px] bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                      <span className="font-semibold text-emerald-500 block mb-1">Outcome:</span>
                      <span className="text-muted">{proj.outcomes}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-border">
                  {proj.stack.map((tech) => (
                    <span key={tech} className="text-[10px] bg-input px-2 py-0.5 rounded text-muted font-mono border border-border/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </section>

      {/* GITHUB INTEGRATION Heatmap */}
      <section className="scroll-mt-20">
        <GithubStats />
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-20 max-w-2xl mx-auto">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-8 border-l-4 border-blue-500 pl-4 text-center sm:text-left">
          Let's Work Together
        </h2>
        <div className="glass p-8 rounded-2xl border-border space-y-6 shadow-md">
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-muted font-semibold uppercase tracking-wider">Your Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Abhay Kumar Bid"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted font-semibold uppercase tracking-wider">Your Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="you@domain.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-muted font-semibold uppercase tracking-wider">Subject</label>
              <input 
                type="text" 
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Job Opportunity / Partnership"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-muted font-semibold uppercase tracking-wider">Message</label>
              <textarea 
                rows={5}
                required
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="Let me know how we can collaborate..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              />
            </div>

            <button 
              type="submit" 
              disabled={contactStatus === 'loading'}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              {contactStatus === 'loading' ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            {contactStatus === 'success' && (
              <p className="text-xs text-emerald-500 text-center font-semibold mt-2">
                Thank you! Your message was sent successfully.
              </p>
            )}
            {contactStatus === 'error' && (
              <p className="text-xs text-red-500 text-center font-semibold mt-2">
                An error occurred. Please try again or email directly.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

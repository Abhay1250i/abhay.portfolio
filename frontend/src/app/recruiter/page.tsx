'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileDown, Mail, Phone, Calendar, ArrowLeft, 
  MapPin, CheckSquare, Award, Clock, Star 
} from 'lucide-react';
import Tilt3D from '../../components/Tilt3D';

export default function RecruiterPage() {
  const summaryDetails = {
    name: 'Abhay Kumar Bid',
    role: 'Frontend Developer | AI Enthusiast',
    experience: 'Undergrad CSE B.Tech (Graduation: 2029)',
    location: 'Uttarakhand, India',
    college: 'Roorkee Institute of Technology, Roorkee',
    cgpa: '8.5 / 10',
    email: 'abhaykumarbid.cse25@ritroorkee.com',
    phone: '+91 9204380297',
  };

  const keyStrengths = [
    'Highly proficient in modern React architectures & Next.js App Router.',
    'Integrated AI Agent systems trained specifically on portfolio parameters.',
    'Docker multi-stage setups and robust MongoDB schema structures.',
    'High performance focus (Lighthouse 95+ targeted designs).'
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8 animate-fade-in">
      {/* Return home */}
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Recruiter Mode</span>
        </Link>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Recruiter Fast-Track Portal
            </h1>
            <p className="text-xs text-muted mt-1">
              A comprehensive summary of Abhay's qualifications, readable in 2 minutes.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <a 
              href="mailto:abhaykumarbid.cse25@ritroorkee.com" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-2 transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              <span>Send Quick Email</span>
            </a>
            <a 
              href="#contact" 
              className="px-4 py-2 bg-card hover:bg-input text-foreground border border-border rounded-xl text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
            >
              <FileDown className="w-4 h-4 text-blue-500" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left column: Summary Stats */}
        <div className="md:col-span-1 space-y-6">
          <Tilt3D>
            <div className="glass p-6 rounded-2xl border-border space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-wider">
                <Star className="w-4 h-4 animate-pulse" />
                <span>Profile Snapshot</span>
              </div>
              
              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="block text-muted">NAME</span>
                  <span className="text-foreground font-semibold">{summaryDetails.name}</span>
                </div>
                <div>
                  <span className="block text-muted">ROLE</span>
                  <span className="text-foreground font-semibold">{summaryDetails.role}</span>
                </div>
                <div>
                  <span className="block text-muted">COLLEGE</span>
                  <span className="text-foreground font-semibold">{summaryDetails.college}</span>
                </div>
                <div>
                  <span className="block text-muted">CGPA</span>
                  <span className="text-foreground font-bold text-blue-500">{summaryDetails.cgpa}</span>
                </div>
                <div>
                  <span className="block text-muted">LOCATION</span>
                  <span className="text-foreground font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-muted" />
                    {summaryDetails.location}
                  </span>
                </div>
              </div>
            </div>
          </Tilt3D>
          
          <div className="glass p-6 rounded-2xl border-border space-y-4 shadow-sm">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500" />
              <span>Availability</span>
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Available for Full-time Roles, Internships, and Technical Collaboration. Graduation target: **2029**.
            </p>
          </div>
        </div>

        {/* Right column: Highlights and Timeline */}
        <div className="md:col-span-2 space-y-6">
          {/* Why hire me */}
          <div className="glass p-6 rounded-2xl border-border space-y-4 shadow-sm">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-500" />
              <span>Key Strengths &amp; Competencies</span>
            </h3>
            
            <div className="space-y-3">
              {keyStrengths.map((str, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-foreground/90 leading-relaxed">{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Timeline */}
          <div className="glass p-6 rounded-2xl border-border space-y-4 shadow-sm">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>Fast Chronology</span>
            </h3>
            
            <div className="border-l border-border pl-4 relative space-y-4 text-xs">
              <div className="relative">
                <div className="absolute -left-6.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-background" />
                <span className="font-bold text-foreground block">B.Tech Computer Science Engineering</span>
                <span className="text-[10px] text-muted font-mono">2025 - 2029 (Roorkee Institute of Technology)</span>
              </div>
              
              <div className="relative">
                <div className="absolute -left-6.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-background" />
                <span className="font-bold text-foreground block">Built Truth Lense Platform</span>
                <span className="text-[10px] text-muted font-mono">Media Authenticity Forensic Validation Platform</span>
              </div>

              <div className="relative">
                <div className="absolute -left-6.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-background" />
                <span className="font-bold text-foreground block">Smart India Hackathon Finalist</span>
                <span className="text-[10px] text-muted font-mono">National Level Engineering Showcase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-8">
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <h1 className="font-display text-4xl font-bold text-white flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-blue-500" />
          <span>Privacy Policy &amp; Terms</span>
        </h1>
        <p className="text-gray-400 text-xs mt-2">Effective Date: July 13, 2026</p>
      </div>

      <div className="glass p-8 rounded-2xl border-white/10 space-y-6 text-sm text-gray-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Data Collection</h2>
          <p>
            The personal website `ani.dev` for Abhay Kumar Bid collects information you voluntarily provide via the contact form, including your name, email, subject, and message. We also analyze basic analytics data (such as page views) to optimize website performance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Use of Information</h2>
          <p>
            Collected contact data is used solely to respond to inquiries, job openings, or business collaborations. We do not sell, trade, or distribute your email or personal information to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Security Paradigms</h2>
          <p>
            We implement HTTPS encryption, request rate limiting, and inputs sanitization to prevent unauthorized access, SQL injections, or credential theft. Admin sections are guarded by JSON Web Tokens (JWT) and encrypted password hashing (bcryptjs).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Cookies &amp; Storage</h2>
          <p>
            This site uses local browser storage (`localStorage`) to persist user settings such as dark/light mode preference. No tracking cookies are injected onto your machine without explicit consent.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Code Licensing</h2>
          <p>
            Unless explicitly stated otherwise, all repository code files on `github.com/abhay1250i` are shared under the MIT License. You are free to view, adapt, and build upon the concepts.
          </p>
        </section>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="glass border-t border-border mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} Abhay Kumar Bid. All rights reserved.
            </p>
            <p className="text-xs text-muted/80 mt-1">
              Domain: <span className="text-blue-500 font-medium">ani.dev</span>
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy &amp; Terms
            </Link>
            <Link href="/bucketlist" className="hover:text-foreground transition-colors">
              Bucket List
            </Link>
            <Link href="/terminal" className="hover:text-foreground transition-colors">
              Dev Mode Console
            </Link>
            <Link href="/admin" className="hover:text-foreground transition-colors">
              Admin Login
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-muted/70">
          💡 Tip: Type the Konami Code <kbd className="px-1 py-0.5 bg-input border border-border rounded text-foreground">↑ ↑ ↓ ↓ ← → ← → B A</kbd> anywhere to unlock the Developer Terminal.
        </div>
      </div>
    </footer>
  );
};

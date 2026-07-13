'use client';

import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeaveWindow = () => {
      setIsHidden(true);
    };

    const handleMouseEnterWindow = () => {
      setIsHidden(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, []);

  // Animate follow trail
  useEffect(() => {
    const updateTrail = () => {
      setTrailPosition((prev) => {
        const ease = 0.15; // smoothness factor
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      requestRef.current = requestAnimationFrame(updateTrail);
    };
    requestRef.current = requestAnimationFrame(updateTrail);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position]);

  // Check for hover states on magnetic elements
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive-hover') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Spotlight Radial Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.04), transparent 80%)`,
        }}
      />

      {/* Inner Dot */}
      <div
        className="fixed w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
        }}
      />

      {/* Outer Follow Circle */}
      <div
        className="fixed rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 border border-blue-500/40 mix-blend-difference transition-all duration-300 ease-out hidden sm:block"
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
          width: isHovered ? '50px' : '24px',
          height: isHovered ? '50px' : '24px',
          backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
          borderColor: isHovered ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.4)',
        }}
      />
    </>
  );
};
export default CustomCursor;

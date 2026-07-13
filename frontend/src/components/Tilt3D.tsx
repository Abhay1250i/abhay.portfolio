'use client';

import React, { useRef, useState } from 'react';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
}

export const Tilt3D = ({ children, className = '' }: Tilt3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [transitionStyle, setTransitionStyle] = useState('all 0.5s cubic-bezier(0.25, 1, 0.5, 1)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Max rotation in degrees
    const maxRotate = 15;

    // Calculate rotation angles (Y-axis controls horizontal rotation, X-axis controls vertical)
    const rotateX = -mouseY * maxRotate;
    const rotateY = mouseX * maxRotate;

    setTransitionStyle('none'); // disable transition during mouse move for real-time tracking
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    // Reset to default on leave with smooth easing transition
    setTransitionStyle('all 0.5s cubic-bezier(0.25, 1, 0.5, 1)');
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: transitionStyle,
        transformStyle: 'preserve-3d',
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};
export default Tilt3D;

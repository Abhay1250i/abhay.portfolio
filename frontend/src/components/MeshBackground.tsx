'use client';

import React, { useEffect, useRef } from 'react';

export const MeshBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Grid details
    const cols = 25;
    const rows = 25;
    const spacingX = width / (cols - 1);
    const spacingY = height / (rows - 1);

    interface Point3D {
      x: number;
      y: number;
      baseZ: number;
      z: number;
    }

    const points: Point3D[][] = [];

    // Initialize 3D grid points
    for (let i = 0; i < cols; i++) {
      points[i] = [];
      for (let j = 0; j < rows; j++) {
        points[i][j] = {
          x: i * spacingX,
          y: j * spacingY,
          baseZ: 0,
          z: 0,
        };
      }
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Ease mouse coordinates
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      time += 0.015;

      // Update heights (Z coords) using waves and mouse distance
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const pt = points[i][j];

          // Trig sine/cosine heights
          const wave1 = Math.sin(i * 0.2 + time) * 15;
          const wave2 = Math.cos(j * 0.25 + time * 0.8) * 10;

          // Mouse proximity displacement
          const dx = pt.x - mouse.x;
          const dy = pt.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const push = dist < 200 ? (1 - dist / 200) * 35 : 0;

          pt.z = wave1 + wave2 - push;
        }
      }

      // Draw wireframe grid
      ctx.lineWidth = 0.5;

      const isLightTheme = document.documentElement.classList.contains('light-theme');
      ctx.strokeStyle = isLightTheme ? 'rgba(0, 113, 227, 0.05)' : 'rgba(59, 130, 246, 0.07)';
      ctx.fillStyle = isLightTheme ? 'rgba(0, 113, 227, 0.12)' : 'rgba(59, 130, 246, 0.2)';

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const pt = points[i][j];

          // Simple 3D projection representation
          const projX = pt.x + (pt.z * (pt.x - width / 2)) * 0.001;
          const projY = pt.y + (pt.z * (pt.y - height / 2)) * 0.001;

          // Draw links to neighbors
          if (i < cols - 1) {
            const nextPt = points[i + 1][j];
            const nextProjX = nextPt.x + (nextPt.z * (nextPt.x - width / 2)) * 0.001;
            const nextProjY = nextPt.y + (nextPt.z * (nextPt.y - height / 2)) * 0.001;

            ctx.beginPath();
            ctx.moveTo(projX, projY);
            ctx.lineTo(nextProjX, nextProjY);
            ctx.stroke();
          }

          if (j < rows - 1) {
            const downPt = points[i][j + 1];
            const downProjX = downPt.x + (downPt.z * (downPt.x - width / 2)) * 0.001;
            const downProjY = downPt.y + (downPt.z * (downPt.y - height / 2)) * 0.001;

            ctx.beginPath();
            ctx.moveTo(projX, projY);
            ctx.lineTo(downProjX, downProjY);
            ctx.stroke();
          }

          // Draw node points
          if (i % 2 === 0 && j % 2 === 0) {
            ctx.beginPath();
            ctx.arc(projX, projY, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-85"
    />
  );
};
export default MeshBackground;

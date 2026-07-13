'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startAmbientSynth = () => {
    // Initialize AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Create Main gain control
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0.0, ctx.currentTime);
    mainGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2.0); // Fade in over 2s
    mainGain.connect(ctx.destination);
    gainNodeRef.current = mainGain;

    // Chord frequency mapping (Space Pad Cmaj9 / Am9)
    const freqs = [110, 165, 220, 293.66, 329.63, 440]; 

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      // Soft triangle & sine mix
      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Low frequency modulation (LFO) for ambient wave motion
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
      lfoGain.gain.setValueAtTime(5, ctx.currentTime); // mod depth

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      // Set volume per note
      oscGain.gain.setValueAtTime(0.03, ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(mainGain);

      lfo.start();
      osc.start();

      oscillatorsRef.current.push(osc);
      // Keep track of LFO to terminate
      oscillatorsRef.current.push(lfo);
    });
  };

  const stopAmbientSynth = () => {
    // Fade out main volume
    const ctx = audioCtxRef.current;
    const gainNode = gainNodeRef.current;

    if (ctx && gainNode) {
      gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 1.0); // Fade out over 1s

      setTimeout(() => {
        oscillatorsRef.current.forEach((node) => {
          try {
            node.stop();
          } catch (e) {}
        });
        oscillatorsRef.current = [];
        ctx.close();
        audioCtxRef.current = null;
        gainNodeRef.current = null;
      }, 1000);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopAmbientSynth();
      setIsPlaying(false);
    } else {
      startAmbientSynth();
      setIsPlaying(true);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((node) => {
        try {
          node.stop();
        } catch (e) {}
      });
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={toggleMusic}
        className={`p-3 rounded-full glass border border-border shadow-2xl transition-transform hover:scale-110 flex items-center justify-center focus:outline-none cursor-pointer ${
          isPlaying ? 'text-blue-500 border-blue-500/30' : 'text-muted'
        }`}
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 animate-pulse" />
            <div className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 bg-blue-500 animate-[bounce_0.8s_infinite] h-2" />
              <span className="w-0.5 bg-blue-500 animate-[bounce_0.5s_infinite] h-3" />
              <span className="w-0.5 bg-blue-500 animate-[bounce_0.7s_infinite] h-1.5" />
            </div>
          </div>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
export default BackgroundMusic;

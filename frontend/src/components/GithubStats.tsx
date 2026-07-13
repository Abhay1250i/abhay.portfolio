'use client';

import React, { useState, useEffect } from 'react';
import { GitPullRequest, Flame, Code, BookMarked, GitCommit } from 'lucide-react';
import Tilt3D from './Tilt3D';

export const GithubStats = () => {
  const rows = 7;
  const cols = 25;
  
  // Set initial grid matching server output (all 0s)
  const [grid, setGrid] = useState<number[][]>(() =>
    Array.from({ length: rows }, () => Array(cols).fill(0))
  );

  useEffect(() => {
    const contributionGrid: number[][] = [];
    for (let r = 0; r < rows; r++) {
      contributionGrid[r] = [];
      for (let c = 0; c < cols; c++) {
        contributionGrid[r][c] = Math.floor(Math.random() * 4);
      }
    }
    setGrid(contributionGrid);
  }, []);

  const getBlockColor = (density: number) => {
    switch (density) {
      case 1: return 'bg-emerald-800/60 dark:bg-emerald-950/80';
      case 2: return 'bg-emerald-600/70 dark:bg-emerald-800/80';
      case 3: return 'bg-emerald-400 dark:bg-emerald-500';
      default: return 'bg-white/10 dark:bg-white/5';
    }
  };

  const pinnedRepos = [
    { name: 'truth-lense', desc: 'Forensics media authentication platform', lang: 'Python', stars: 45 },
    { name: 'subsidy-portal', desc: 'Accessible state subsidies service router', lang: 'TypeScript', stars: 28 },
    { name: 'budget-tracker', desc: 'Financial logging dashboard UI', lang: 'React', stars: 16 }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Pinned Repos Column */}
      <div className="md:col-span-1 flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-blue-500" />
          <span>Pinned Repositories</span>
        </h3>
        
        <div className="space-y-3 flex-1">
          {pinnedRepos.map((repo) => (
            <Tilt3D key={repo.name}>
              <div className="glass p-4 rounded-xl border-border flex flex-col justify-between h-28 shadow-sm">
                <div>
                  <h4 className="font-bold text-foreground text-xs font-mono">abhay1250i/{repo.name}</h4>
                  <p className="text-[10px] text-muted mt-1.5 line-clamp-1">{repo.desc}</p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-muted font-mono pt-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    {repo.lang}
                  </span>
                  <span>★ {repo.stars}</span>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </div>

      {/* GitHub Contribution Grid Column */}
      <div className="md:col-span-2 flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider flex items-center gap-2">
          <GitPullRequest className="w-4 h-4 text-purple-500" />
          <span>GitHub Contribution Heatmap (Mocked)</span>
        </h3>

        <div className="glass p-6 rounded-2xl border-border flex-1 flex flex-col justify-between shadow-sm">
          {/* Contribution Heatmap grid */}
          <div className="overflow-x-auto pb-4">
            <div className="grid grid-flow-col gap-1 w-max">
              {grid.map((row, rIdx) => (
                <div key={rIdx} className="grid gap-1">
                  {row.map((density, cIdx) => (
                    <div
                      key={cIdx}
                      className={`w-3 h-3 rounded-[2px] transition-all hover:scale-125 ${getBlockColor(density)}`}
                      title={`${density * 3} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Stats Timelines */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50 text-center">
            <div className="space-y-1">
              <span className="text-[10px] text-muted block">YEARLY COMMITS</span>
              <span className="text-sm font-bold text-foreground font-mono flex items-center justify-center gap-1">
                <GitCommit className="w-4 h-4 text-purple-400" />
                1,482
              </span>
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] text-muted block">STREAK</span>
              <span className="text-sm font-bold text-foreground font-mono flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-400" />
                214 Days
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-muted block">PRIMARY LANG</span>
              <span className="text-sm font-bold text-foreground font-mono flex items-center justify-center gap-1">
                <Code className="w-4 h-4 text-blue-400" />
                TypeScript
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GithubStats;

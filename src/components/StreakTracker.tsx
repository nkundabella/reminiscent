"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakTrackerProps {
  publishedDates?: string[];
}

export function StreakTracker({ publishedDates = [] }: StreakTrackerProps) {
  // 1. Prepare 365 days of data
  const { grid, monthLabels, currentStreak } = useMemo(() => {
    const today = new Date();
    const data = [];
    const dateMap = new Map<string, number>();

    // Count contributions per day
    publishedDates.forEach(dateStr => {
      const d = new Date(dateStr).toDateString();
      dateMap.set(d, (dateMap.get(d) || 0) + 1);
    });

    // Calculate Grid (53 weeks)
    // Start from 364 days ago
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);
    
    // Adjust to start on a Sunday or Monday to align rows
    // GitHub typically starts weeks on Sunday. Let's align Sunday = row 0.
    const startDayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDayOfWeek);

    const labels: { label: string; index: number }[] = [];
    let lastMonth = -1;

    for (let i = 0; i < 371; i++) { // ~53 weeks * 7 days
      const current = new Date(startDate);
      current.setDate(startDate.getDate() + i);
      
      const dateStr = current.toDateString();
      const intensity = dateMap.get(dateStr) || 0;
      
      data.push({
        date: current,
        intensity,
        isFuture: current > today
      });

      // Month labels (only on the first row of each week)
      if (i % 7 === 0) {
        const month = current.getMonth();
        if (month !== lastMonth) {
          const monthName = current.toLocaleString('default', { month: 'short' });
          labels.push({ label: monthName, index: Math.floor(i / 7) });
          lastMonth = month;
        }
      }
    }

    // Calculate current streak (naive implementation)
    let streak = 0;
    const checkDate = new Date(today);
    while (dateMap.has(checkDate.toDateString())) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return { grid: data, monthLabels: labels, currentStreak: streak };
  }, [publishedDates]);

  // GitHub-style intensity colors (Aura theme)
  const getColor = (intensity: number) => {
    if (intensity === 0) return "bg-aura-foreground/[0.03] border border-aura-foreground/5";
    if (intensity === 1) return "bg-aura-pink/30 border border-aura-pink/50";
    if (intensity === 2) return "bg-aura-blue/50 border border-aura-blue/70";
    if (intensity === 3) return "bg-aura-blue border border-aura-blue shadow-sm";
    return "bg-aura-green border border-aura-green shadow-[0_0_10px_rgba(16,185,129,0.3)]";
  };

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="w-full bg-aura-background/50 backdrop-blur-sm border-2 border-aura-foreground/10 p-10 shadow-2xl relative overflow-hidden group">
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-aura-pink/5 rounded-full blur-[80px] -z-10 group-hover:bg-aura-pink/10 transition-colors duration-1000" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="font-serif text-4xl font-bold text-aura-foreground tracking-tight flex items-center gap-3">
            Creative Momentum
          </h2>
          <p className="font-sans text-aura-foreground/50 text-sm mt-1">Reflecting {publishedDates.length} submissions in the past year.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-aura-foreground/5 px-6 py-3 rounded-2xl border border-aura-foreground/10 backdrop-blur-md">
          <Flame className={`w-6 h-6 ${currentStreak > 0 ? "text-aura-pink fill-aura-pink/20 animate-pulse" : "text-aura-foreground/20"}`} />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black tracking-widest text-aura-foreground/40 leading-none mb-1">Current Streak</span>
            <span className="font-serif text-2xl font-black text-aura-foreground leading-none">{currentStreak} Days</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto pb-4 custom-scrollbar">
        <div className="min-w-[800px]">
          {/* Month Labels row */}
          <div className="flex mb-2 ml-10 text-[10px] font-black uppercase tracking-widest text-aura-foreground/30 relative h-4">
            {monthLabels.map((l, i) => (
              <span 
                key={i} 
                className="absolute"
                style={{ left: `${(l.index * 14) + (l.index * 4)}px` }}
              >
                {l.label}
              </span>
            ))}
          </div>

          <div className="flex gap-1">
            {/* Day Labels column */}
            <div className="flex flex-col gap-1 pr-2 text-[10px] font-black uppercase tracking-widest text-aura-foreground/20 justify-between py-1 h-[122px] w-8">
              {dayLabels.map((label, i) => (
                <span key={i} className="h-4 flex items-center">{label}</span>
              ))}
            </div>

            {/* The Grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-1">
              {grid.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.001 }}
                  className={`w-4 h-4 rounded-[2px] ${day.isFuture ? "opacity-10" : ""} ${getColor(day.intensity)} transition-all duration-300 relative group/tile`}
                >
                  {/* Tooltip */}
                  {!day.isFuture && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/tile:opacity-100 transition-all duration-200 pointer-events-none z-50">
                      <div className="bg-aura-dark text-aura-cream text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-2xl border border-white/10 flex flex-col items-center">
                        <span className="font-black text-aura-blue mb-0.5">{day.intensity} Submissions</span>
                        <span className="opacity-60">{day.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-aura-dark" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-aura-foreground/5">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-aura-foreground/20">
          Expression is the currency of freedom.
        </p>
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-aura-foreground/30">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div key={lvl} className={`w-3 h-3 rounded-[2px] ${getColor(lvl)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

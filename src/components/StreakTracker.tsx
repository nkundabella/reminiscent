"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ArrowUpRight, Calendar } from "lucide-react";
import Confetti from "react-confetti";
import Link from "next/link";

interface Post {
  _id: string;
  publishedAt: string;
  title: string;
  slug: string;
  excerpt: string;
}

interface StreakTrackerProps {
  posts?: Post[];
}

export function StreakTracker({ posts = [] }: StreakTrackerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger confetti when a date is selected
  useEffect(() => {
    if (selectedDate) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedDate]);

  const { grid, monthLabels, currentStreak, totalWeeks, postsByDate } = useMemo(() => {
    const today = new Date();
    const dateMap = new Map<string, number>();
    const postsMap = new Map<string, Post[]>();

    posts.forEach(post => {
      const d = new Date(post.publishedAt).toDateString();
      dateMap.set(d, (dateMap.get(d) || 0) + 1);
      
      if (!postsMap.has(d)) postsMap.set(d, []);
      postsMap.get(d)!.push(post);
    });

    const years = posts.map(p => new Date(p.publishedAt).getFullYear());
    const startYear = years.length > 0 ? Math.min(...years, today.getFullYear()) : today.getFullYear();
    const endYear = today.getFullYear();

    const startDate = new Date(startYear, 0, 1);
    const startDayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDayOfWeek);

    const endDate = new Date(endYear, 11, 31);
    const endDayOfWeek = endDate.getDay();
    endDate.setDate(endDate.getDate() + (6 - endDayOfWeek));

    const data = [];
    const labels: { label: string; index: number }[] = [];
    let lastMonth = -1;

    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    for (let i = 0; i < totalDays; i++) {
      const current = new Date(startDate);
      current.setDate(startDate.getDate() + i);
      
      const dateStr = current.toDateString();
      const intensity = dateMap.get(dateStr) || 0;
      
      data.push({
        date: current,
        dateString: dateStr,
        intensity,
        isFuture: current > today
      });

      if (i % 7 === 0) {
        const month = current.getMonth();
        if (month !== lastMonth) {
          const monthName = current.toLocaleString('default', { month: 'short' });
          const label = month === 0 ? `${monthName} ${current.getFullYear()}` : monthName;
          labels.push({ label, index: Math.floor(i / 7) });
          lastMonth = month;
        }
      }
    }

    let streak = 0;
    const checkDate = new Date(today);
    while (dateMap.has(checkDate.toDateString())) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return { 
      grid: data, 
      monthLabels: labels, 
      currentStreak: streak,
      totalWeeks: Math.ceil(totalDays / 7),
      postsByDate: postsMap
    };
  }, [posts]);

  // Scroll to the end on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [totalWeeks]);

  const getColor = (intensity: number) => {
    if (intensity === 0) return "bg-aura-foreground/[0.03] border border-aura-foreground/5 hover:bg-aura-foreground/10";
    if (intensity === 1) return "bg-[#ff6bb3]/20 border border-[#ff6bb3]/10 hover:bg-[#ff6bb3]/30";
    if (intensity === 2) return "bg-[#ff6bb3]/45 border border-[#ff6bb3]/20 hover:bg-[#ff6bb3]/55";
    if (intensity === 3) return "bg-[#ff6bb3]/70 border border-[#ff6bb3]/30 hover:bg-[#ff6bb3]/80";
    return "bg-[#ff6bb3] border border-[#ff6bb3] shadow-[0_0_15px_rgba(255,107,179,0.4)] hover:scale-110";
  };

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
  
  const selectedPosts = selectedDate ? postsByDate.get(selectedDate) || [] : [];

  return (
    <div className="flex flex-col gap-12">
      <div className="w-full bg-aura-background/50 backdrop-blur-sm border-2 border-aura-foreground/10 p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-aura-pink/5 rounded-full blur-[80px] -z-10 group-hover:bg-aura-pink/10 transition-colors duration-1000" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="font-serif text-4xl font-bold text-aura-foreground tracking-tight flex items-center gap-3">
              Creative Momentum
            </h2>
            <p className="font-sans text-aura-foreground/50 text-sm mt-1">
              Tracking contributions across {totalWeeks} weeks of expression.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-aura-foreground/5 px-6 py-3 rounded-2xl border border-aura-foreground/10 backdrop-blur-md">
            <Flame className={`w-6 h-6 ${currentStreak > 0 ? "text-aura-pink fill-aura-pink/20 animate-pulse" : "text-aura-foreground/20"}`} />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black tracking-widest text-aura-foreground/40 leading-none mb-1">Current Streak</span>
              <span className="font-serif text-2xl font-black text-aura-foreground leading-none">{currentStreak} Days</span>
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="relative overflow-x-auto pb-6 scroll-smooth custom-scrollbar"
        >
          <div style={{ width: `${(totalWeeks * 18)}px` }} className="min-w-full">
            {/* Month Labels row */}
            <div className="flex mb-4 ml-10 text-[10px] font-black uppercase tracking-widest text-aura-foreground/30 relative h-4">
              {monthLabels.map((l, i) => (
                <span 
                  key={i} 
                  className="absolute whitespace-nowrap"
                  style={{ left: `${(l.index * 14) + (l.index * 4)}px` }}
                >
                  {l.label}
                </span>
              ))}
            </div>

            <div className="flex gap-1">
              {/* Day Labels column */}
              <div className="flex flex-col gap-1 pr-4 text-[10px] font-black uppercase tracking-widest text-aura-foreground/20 justify-between py-1 h-[122px] w-8 sticky left-0 bg-aura-background/80 backdrop-blur-sm z-10">
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
                    transition={{ delay: Math.max(0, (i - (grid.length - 100)) * 0.001) }}
                    onClick={() => !day.isFuture && setSelectedDate(day.dateString)}
                    className={`w-4 h-4 rounded-[2px] cursor-pointer ${day.isFuture ? "opacity-10 pointer-events-none" : ""} ${getColor(day.intensity)} ${selectedDate === day.dateString ? "ring-2 ring-aura-pink ring-offset-2 ring-offset-aura-background" : ""} transition-all duration-300 relative group/tile`}
                  >
                    {!day.isFuture && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/tile:opacity-100 transition-all duration-200 pointer-events-none z-50">
                        <div className="bg-aura-dark text-aura-cream text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-2xl border border-white/10 flex flex-col items-center">
                          <span className="font-black text-aura-pink mb-0.5">{day.intensity} Submissions</span>
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

      {/* Activity Log Section */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-aura-foreground/5 border-2 border-aura-foreground/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-aura-pink text-aura-background rounded-2xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-3xl font-bold text-aura-foreground leading-none">
                    Day Record
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-aura-foreground/40 mt-2">
                    {new Date(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDate(null)}
                className="text-[10px] font-black uppercase tracking-widest text-aura-foreground/30 hover:text-aura-pink transition-colors"
              >
                Clear Selection
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {selectedPosts.length > 0 ? (
                selectedPosts.map((post, idx) => (
                  <Link key={post._id || `post-${idx}`} href={`/blog/${post.slug}`} className="group">
                    <div className="bg-aura-background/40 hover:bg-aura-background p-6 rounded-2xl border border-aura-foreground/10 transition-all hover:scale-[1.01] hover:shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <h4 className="font-serif text-2xl font-bold text-aura-foreground group-hover:text-aura-pink transition-colors mb-2">
                          {post.title}
                        </h4>
                        <p className="font-sans text-sm text-aura-foreground/60 line-clamp-2 max-w-2xl">
                          {post.excerpt}
                        </p>
                      </div>
                      <ArrowUpRight className="w-6 h-6 text-aura-foreground/20 group-hover:text-aura-pink group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="font-serif italic text-2xl text-aura-foreground/30">
                    No records found for this day.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

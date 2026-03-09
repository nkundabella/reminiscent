import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

// Mock data for the last 60 days
const generateMockData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 59; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Join day (60 days ago) and Today (index 0) get activity
    let intensity = 0;
    if (i === 59 || i === 0) {
      intensity = 3;
    }
    
    data.push({ date, intensity });
  }
  return data;
};

export function StreakTracker() {
  const [streakData, setStreakData] = useState<{date: Date, intensity: number}[]>([]);
  const [mounted, setMounted] = useState(false);
  const currentStreak = 12; // MOCK value
  
  useEffect(() => {
    setStreakData(generateMockData());
    setMounted(true);
  }, []);

  // Helper to determine color based on intensity
  const getColor = (intensity: number) => {
    if (intensity === 0) return "bg-aura-background/50 border border-aura-foreground/10";
    if (intensity === 1) return "bg-aura-pink/40 border border-aura-pink";
    if (intensity === 2) return "bg-aura-pink/70 border border-aura-pink";
    if (intensity === 3) return "bg-aura-pink border border-aura-pink shadow-sm";
    return "bg-[var(--aura-green)] border border-[var(--aura-green)] shadow-sm"; // Max intensity gets the green accent
  };

  if (!mounted) return <div className="h-[300px] w-full bg-aura-background/20 animate-pulse border-2 border-aura-foreground/10" />;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-aura-background p-8 border-2 border-aura-foreground shadow-[4px_4px_0px_#1e1e24] w-full h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif text-3xl font-bold flex items-center gap-2 text-aura-foreground">
          Creative Output
        </h2>
        <div className="flex items-center gap-2 bg-aura-pink/10 px-4 py-2 rounded-full border border-aura-pink/30">
          <Flame className="w-5 h-5 text-aura-pink fill-aura-pink/20" />
          <span className="font-sans font-bold text-aura-pink">{currentStreak} Day Streak</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-flow-col grid-rows-7 gap-[6px] justify-between">
          {streakData.map((day, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.2, delay: i * 0.005 }}
               className={`w-4 h-4 rounded-sm ${getColor(day.intensity)} hover:scale-125 transition-transform origin-center cursor-pointer relative group`}
             >
                {/* Tooltip on hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-aura-dark text-aura-cream text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-50">
                  {day.intensity} entries on {day.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
             </motion.div>
          ))}
        </div>
        
        <div className="mt-8 flex items-center justify-end gap-2 text-sm font-sans text-aura-foreground/60">
           <span>Less</span>
           <div className={`w-3 h-3 rounded-sm ${getColor(0)}`} />
           <div className={`w-3 h-3 rounded-sm ${getColor(1)}`} />
           <div className={`w-3 h-3 rounded-sm ${getColor(2)}`} />
           <div className={`w-3 h-3 rounded-sm ${getColor(3)}`} />
           <div className={`w-3 h-3 rounded-sm ${getColor(4)}`} />
           <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}

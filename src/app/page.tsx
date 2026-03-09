import { motion } from "framer-motion";
import { ArrowUpRight, PenTool, Bookmark, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";
import { StreakTracker } from "@/components/StreakTracker";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col items-center bg-aura-background">
      {/* Editorial Textures & Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      {/* Subtle Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-aura-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-aura-pink/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content Container - Scrapbook Style */}
      <div className="relative z-10 w-full max-w-6xl md:h-screen flex flex-col md:flex-row items-center justify-between pt-32 pb-20 px-8 gap-12">
        
        {/* Left Column: Branding & Intro */}
        <div className="relative z-20 flex-1 flex flex-col items-start gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-aura-background border-4 border-aura-foreground p-10 shadow-[12px_12px_0px_var(--aura-foreground)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-aura-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h1 className="font-serif text-7xl md:text-9xl font-black tracking-tighter text-aura-foreground leading-[0.85] mb-6">
                THE<br/>
                <span className="text-aura-blue italic">IZZY</span><br/>
                CHRONICLES
              </h1>
              <p className="font-sans text-xl md:text-2xl font-bold max-w-md text-aura-foreground/80 leading-snug">
                A curated digital scrapbook of scattered thoughts & vivid expressions.
              </p>
            </div>

            {/* Pinned "Current Focus" Memo */}
            <motion.div
              initial={{ rotate: 15, opacity: 0, x: 20 }}
              animate={{ rotate: 5, opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -top-12 -right-8 w-48 bg-aura-cream p-4 shadow-xl border border-black/5 flex flex-col gap-2 z-30"
            >
              <div className="w-10 h-0.5 bg-aura-blue/30 mx-auto" />
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-aura-blue">
                <MapPin className="w-3 h-3" /> Reading Now
              </div>
              <p className="font-serif text-sm italic leading-tight">"Steal Like An Artist" by Austin Kleon</p>
            </motion.div>
          </motion.div>

          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.02, rotate: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-aura-dark text-aura-cream font-bold text-xl border-2 border-aura-dark overflow-hidden transition-all shadow-[6px_6px_0px_var(--aura-blue)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Enter the Archive <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-aura-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </Link>
        </div>

        {/* Right Column: Interactive Desk Elements */}
        <div className="relative flex-1 h-full min-h-[500px] w-full mt-20 md:mt-0">
          
          {/* Draggable Polaroid */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            initial={{ opacity: 0, x: 100, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 8 }}
            transition={{ duration: 1, delay: 0.2 }}
            whileDrag={{ zIndex: 100, scale: 1.1 }}
            className="absolute top-0 right-10 w-64 h-80 bg-aura-cream p-4 pb-14 shadow-[20px_20px_60px_rgba(0,0,0,0.1)] border border-black/5 cursor-grab active:cursor-grabbing transform"
          >
            {/* Washi Tape */}
            <div className="absolute top-[-10px] left-1/4 w-16 h-8 bg-aura-blue/20 backdrop-blur-sm -rotate-6 border-x border-black/5" />
            
            <div className="w-full h-full bg-[#1a1c24] flex items-center justify-center overflow-hidden border border-black/5 relative group">
              <div className="w-full h-full bg-gradient-to-br from-aura-blue/20 to-transparent mix-blend-overlay" />
              <Sparkles className="w-12 h-12 text-aura-blue/30 group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute bottom-2 right-2 opacity-30 font-serif italic text-white text-[10px]">#0024</div>
            </div>
            <p className="font-serif italic font-black text-2xl mt-4 text-center text-aura-dark tracking-tighter">Current Aura.</p>
          </motion.div>

          {/* Draggable Post-it */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ duration: 1, delay: 0.5 }}
            whileDrag={{ zIndex: 100, scale: 1.1 }}
            className="absolute bottom-10 left-0 w-60 h-60 bg-aura-cream p-8 shadow-xl border border-black/5 cursor-grab active:cursor-grabbing flex flex-col justify-between"
          >
             <div className="w-8 h-8 rounded-full bg-aura-blue/10 absolute -top-4 -left-4 border border-black/5 flex items-center justify-center text-aura-blue">
                <Bookmark className="w-4 h-4" />
             </div>
             <div>
               <p className="font-serif text-2xl text-aura-dark italic leading-none font-medium mb-4">
                 "Creativity is the greatest expression of freedom."
               </p>
               <div className="h-[1px] w-full bg-aura-dark/10" />
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-aura-dark/40">
                <PenTool className="w-3 h-3" /> Izzy's Jotting
             </div>
          </motion.div>

          {/* Desktop Streak Tracker Integration */}
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] hidden lg:block rotate-1">
             <StreakTracker />
          </div>

        </div>
      </div>
    </main>
  );
}

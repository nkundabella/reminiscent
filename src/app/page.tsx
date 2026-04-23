"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, PenTool, Bookmark, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const WaveTop = ({ className = "" }: { className?: string }) => (
  <svg className={`w-full absolute top-0 left-0 transform -translate-y-[99%] z-10 block pointer-events-none ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: '120px' }}>
    <path fill="currentColor" d="M0,64L80,74.7C160,85,320,107,480,101.3C640,96,800,64,960,53.3C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
  </svg>
);

const WaveBottom = ({ className = "" }: { className?: string }) => (
  <svg className={`w-full absolute bottom-0 left-0 transform translate-y-[99%] z-10 block pointer-events-none ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: '120px' }}>
    <path fill="currentColor" d="M0,64L80,58.7C160,53,320,43,480,53.3C640,64,800,96,960,101.3C1120,107,1280,85,1360,74.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
  </svg>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative z-10 flex flex-col items-center w-full overflow-x-hidden bg-essence-background pb-32">
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-20 px-8 bg-essence-background z-20">
        
        {/* Halftone background elements */}
        <div className="absolute top-[10%] right-[10%] w-64 h-64 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, var(--essence-foreground) 4px, transparent 4px)', backgroundSize: '16px 16px', maskImage: 'radial-gradient(circle, black, transparent 70%)' }} />
          
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative text-center w-full max-w-5xl"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[120%] h-[150%] bg-essence-blue/5 rounded-full blur-[100px] -z-10" />
          
          {/* Animated wavy title effect (subtle float) */}
          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative inline-block py-10 px-6 md:px-20"
          >
            <h1 className="font-serif text-6xl md:text-[10rem] font-black tracking-[-0.05em] text-essence-foreground leading-[0.8] mb-8 uppercase">
              THE<br />
              CHRONICLES<br />
              OF <span className="text-essence-blue italic">IZZY</span>
            </h1>
            <p className="font-sans text-lg md:text-2xl font-bold max-w-2xl text-essence-foreground/60 leading-snug mx-auto">
              A curated digital archive of scattered thoughts, <br className="hidden md:block" />
              vivid expressions, and <span className="text-essence-foreground italic underline decoration-essence-blue">profound traces</span>.
            </p>
          </motion.div>

          {/* Floating Element */}
          <motion.div
            initial={{ rotate: -15, opacity: 0, x: -100 }}
            animate={{ rotate: -12, opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 1, type: "spring" }}
            className="absolute top-[10%] right-[80%] hidden xl:flex flex-col gap-2 w-56 bg-white p-6 shadow-2xl border border-black/5 z-30 transform hover:scale-110 transition-transform cursor-pointer rounded-2xl"
          >
            <div className="absolute -top-4 right-4 w-12 h-6 bg-essence-blue/20 backdrop-blur-sm rotate-3 rounded-full" />
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-essence-blue">
              <MapPin className="w-3 h-3" /> Listening To
            </div>
            <p className="font-serif text-sm italic leading-tight text-essence-dark">"The Story I'll Tell" by Naomi Raine</p>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: CALL TO ACTION (Wavy Band) */}
      <section className="relative w-full py-40 bg-essence-foreground/5 flex flex-col items-center justify-center z-10 mt-32 mb-32">
        <WaveTop className="text-essence-foreground/5" />
        <WaveBottom className="text-essence-foreground/5" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 flex flex-col items-center text-center gap-10 px-6"
        >
          <h2 className="font-serif text-4xl md:text-6xl italic text-essence-foreground font-black">Ready to explore?</h2>
          
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-14 py-7 bg-essence-dark text-essence-cream font-black text-2xl uppercase tracking-widest rounded-full overflow-hidden transition-all shadow-[0_10px_40px_rgba(14,165,233,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-4">
                Explore The Archive <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-essence-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1]" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* SECTION 3: DESK ITEMS / ORGANIC SHAPES */}
      <section className="relative w-full max-w-6xl min-h-[600px] mt-10 mb-32 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-8 z-20">
        
        {/* Flower Frame 1 */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1 }}
          animate={{ y: [-10, 10, -10] }}
          className="relative w-72 h-72 md:w-80 md:h-80"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        >
           <div className="w-full h-full flower-clip bg-essence-blue flex flex-col items-center justify-center p-8 text-center relative group overflow-hidden">
             <div className="absolute inset-0 bg-[#1a1c24] mix-blend-multiply opacity-50" />
             <Sparkles className="w-12 h-12 text-essence-cream mb-4 relative z-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700" />
             <p className="font-serif italic font-black text-2xl text-essence-cream relative z-10">Stay Inspired.</p>
           </div>
        </motion.div>

        {/* Flower Frame 2 - Offset */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
          animate={{ y: [15, -15, 15] }}
          className="relative w-64 h-64 md:w-72 md:h-72 mt-0 md:mt-40"
          style={{ animation: 'float 8s ease-in-out infinite' }}
        >
           <div className="w-full h-full flower-clip bg-[#fef08a] flex flex-col items-center justify-center p-8 text-center relative group overflow-hidden">
             <div className="w-full h-full opacity-20 absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
             <Bookmark className="w-10 h-10 text-essence-dark mb-4 relative z-10 group-hover:-translate-y-2 transition-transform duration-500" />
             <p className="font-serif italic font-black text-xl text-essence-dark relative z-10">Fragment #09.</p>
           </div>
        </motion.div>

        {/* Floating Wavy Blob 3 */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.5 }}
          animate={{ y: [-5, 20, -5] }}
          className="relative w-80 h-80 md:w-96 md:h-96"
          style={{ animation: 'float 7s ease-in-out infinite' }}
        >
           <div className="w-full h-full rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-essence-dark flex flex-col justify-center p-12 text-center shadow-2xl relative group overflow-hidden transition-all duration-1000 hover:rounded-[60%_40%_30%_70%/60%_30%_70%_40%] hover:scale-105">
             <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-essence-cream/60 mb-6 relative z-10">
               <PenTool className="w-4 h-4" /> Izzy's Jotting
             </div>
             <p className="font-serif text-3xl md:text-4xl text-essence-cream italic leading-[1.1] font-black relative z-10">
               "Creativity is the greatest expression of freedom."
             </p>
           </div>
        </motion.div>
      </section>

    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, PenTool, Bookmark, Sparkles, MapPin, Moon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col items-center bg-aura-background">
      {/* Editorial Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col justify-center pt-32 pb-20 px-8 bg-aura-cream z-20 overflow-hidden">
        
        {/* Clean Layered Background Elements - NO Grain/Noise */}
        
        {/* Subtle Grid Lines */}
        <div className="absolute inset-0 pointer-events-none z-10"
             style={{
               backgroundImage: `linear-gradient(to right, rgba(30, 30, 36, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 30, 36, 0.04) 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
             }}
        />

        {/* Faint dot pattern accents in corners */}
        <div className="absolute top-10 left-10 w-48 h-48 pointer-events-none opacity-30"
             style={{
               backgroundImage: 'radial-gradient(circle, rgba(30, 30, 36, 0.15) 1.5px, transparent 1.5px)',
               backgroundSize: '16px 16px',
               maskImage: 'radial-gradient(circle, black, transparent 70%)',
               WebkitMaskImage: 'radial-gradient(circle, black, transparent 70%)'
             }}
        />
        <div className="absolute bottom-10 right-10 w-64 h-64 pointer-events-none opacity-30"
             style={{
               backgroundImage: 'radial-gradient(circle, rgba(30, 30, 36, 0.15) 1.5px, transparent 1.5px)',
               backgroundSize: '16px 16px',
               maskImage: 'radial-gradient(circle, black, transparent 70%)',
               WebkitMaskImage: 'radial-gradient(circle, black, transparent 70%)'
             }}
        />

        {/* Blurred abstract shapes (floating blobs) */}
        <motion.div
          animate={{ 
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[10%] w-[450px] h-[450px] bg-aura-pink/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"
        />
        
        <motion.div
          animate={{ 
            x: [0, -40, 30, 0],
            y: [0, 40, -40, 0],
            scale: [1, 0.85, 1.1, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] left-[5%] w-[550px] h-[550px] bg-aura-blue/30 rounded-full blur-[140px] pointer-events-none mix-blend-multiply"
        />

        <motion.div
          animate={{ 
            x: [0, 30, -20, 0],
            y: [0, 30, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[35%] left-[30%] w-[350px] h-[350px] bg-aura-green/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
        />

        {/* Content */}
        <div className="relative z-20 max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left max-w-3xl pt-10"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-8 h-[2px] bg-aura-pink rounded-full"></span>
              <span className="font-sans text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-aura-dark/60">
                The Chronicles of Izzy
              </span>
            </motion.div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-aura-dark font-medium tracking-tight text-balance">
              Thoughts that <br />
              <span className="italic text-aura-pink font-light pr-2">refused</span> 
              to stay quiet.
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="font-sans text-lg md:text-2xl text-aura-dark/70 max-w-xl text-balance mt-6 mb-12 leading-relaxed font-light"
            >
              A digital journal exploring art, life, and curiosity. An archive of creative experiments and fragments worth keeping.
            </motion.p>

            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(255, 107, 179, 0.25)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-aura-dark text-aura-cream rounded-full overflow-hidden shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 bg-aura-pink translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1]" />
                <span className="relative z-10 flex items-center gap-3 font-sans text-sm md:text-base font-medium tracking-wide">
                  Enter the archive <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Visual Balance Element for Asymmetry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            className="hidden md:flex relative w-72 h-72 lg:w-96 lg:h-96 shrink-0"
          >
            {/* Spinning decorative borders */}
            <div className="absolute inset-0 border border-aura-dark/10 rounded-full animate-[spin_60s_linear_infinite] border-dashed" />
            <div className="absolute inset-6 border border-aura-pink/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute inset-12 border border-aura-blue/20 rounded-full animate-[spin_50s_linear_infinite]" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-aura-pink/40 animate-pulse" />
            </div>
            
            {/* Floating element 1 */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-4 w-20 h-20 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl flex items-center justify-center"
            >
              <PenTool className="w-8 h-8 text-aura-blue" />
            </motion.div>

            {/* Floating element 2 */}
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-12 left-0 w-24 h-24 bg-white/40 backdrop-blur-md border border-white/50 rounded-full shadow-lg flex items-center justify-center"
            >
              <Bookmark className="w-8 h-8 text-aura-green" />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Scattered Notes Section (Echoes to the Reader) */}
      <section className="relative w-full min-h-screen bg-[#f5efe6] py-32 flex flex-col items-center overflow-hidden border-t border-black/5">
        <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />
        
        <h2 className="font-serif text-5xl md:text-7xl italic text-aura-dark/20 font-black mb-20 relative z-10 text-center px-4">
          Echoes to the reader.
        </h2>

        <div className="relative w-full max-w-6xl min-h-[600px]">
          {/* Note 1 - Top Left */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="absolute top-10 left-[5%] md:left-[15%] w-64 md:w-80 scattered-note z-10"
          >
            <div className="note-pin bg-red-500 top-3 left-1/2 -translate-x-1/2" />
            <p className="font-sans text-sm md:text-base text-aura-dark/80 leading-relaxed font-medium mt-2">
              "Placeholder note 1: A little thought left behind for anyone wandering through these digital halls."
            </p>
          </motion.div>

          {/* Note 2 - Middle Right */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 3 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-48 right-[5%] md:right-[15%] w-72 md:w-96 scattered-note z-20"
          >
            <div className="note-pin bg-red-500 top-4 left-4" />
            <p className="font-sans text-sm md:text-base text-aura-dark/80 leading-relaxed font-medium">
              "Placeholder note 2: Sometimes the quietest echoes hold the most resonance. Keep exploring."
            </p>
          </motion.div>

          {/* Note 3 - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: -4 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-10 left-[10%] md:left-[30%] w-64 md:w-80 scattered-note z-30"
          >
            <div className="note-pin bg-red-500 top-3 right-5" />
            <p className="font-sans text-sm md:text-base text-aura-dark/80 leading-relaxed font-medium">
              "Placeholder note 3: These traces are as much yours as they are mine now."
            </p>
          </motion.div>

          {/* Decorative Element - Moon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -10 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="absolute top-20 right-[40%] text-aura-dark/10 pointer-events-none"
          >
            <Moon className="w-32 h-32 fill-current" strokeWidth={0.5} />
          </motion.div>
        </div>
      </section>

    </main>
  );
}

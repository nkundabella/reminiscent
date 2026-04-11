"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, PenTool, Bookmark, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";
import { StreakTracker } from "@/components/StreakTracker";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col items-center bg-aura-background">
      {/* Halftone / Grid Background Elements */}
      <div className="absolute top-[20%] right-[15%] w-64 h-64 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--aura-foreground) 4px, transparent 4px)',
          backgroundSize: '16px 16px',
          maskImage: 'radial-gradient(circle, black, transparent 70%)'
        }} />

      <div className="absolute bottom-[10%] left-[5%] w-96 h-96 opacity-10 pointer-events-none rotate-12"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--aura-blue) 2px, transparent 2px)',
          backgroundSize: '10px 10px',
          maskImage: 'linear-gradient(to top right, black, transparent)'
        }} />

      {/* Main Content Container - Balanced & Editorial */}
      <div className="relative z-10 w-full max-w-7xl min-h-screen flex flex-col pt-32 pb-40 px-8 gap-24 items-center">

        {/* Top Section: Branding (Centred & Clean) */}
        <div className="relative z-20 w-full flex flex-col items-center gap-12 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative text-center"
          >
            {/* Background Accent for Header */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-aura-blue/5 rounded-full blur-[100px] -z-10" />

            <div className="relative inline-block border-y-4 border-aura-foreground py-10 px-6 md:px-20 group">
              <div className="absolute top-0 right-0 w-4 h-4 bg-aura-foreground" />
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-aura-foreground" />

              <h1 className="font-serif text-6xl md:text-[10rem] font-black tracking-[-0.05em] text-aura-foreground leading-[0.8] mb-8">
                THE<br />
                <span className="text-aura-blue italic">IZZY</span><br />
                CHRONICLES
              </h1>
              <p className="font-sans text-lg md:text-2xl font-bold max-w-2xl text-aura-foreground/60 leading-snug mx-auto">
                A curated digital archive of scattered thoughts, <br className="hidden md:block" />
                vivid expressions, and <span className="text-aura-foreground italic underline decoration-aura-blue">singular echoes</span>.
              </p>
            </div>

            {/* Pinned Memo - Cleanly positioned */}
            <motion.div
              initial={{ rotate: -15, opacity: 0, x: -100 }}
              animate={{ rotate: -5, opacity: 1, x: -280, y: -80 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute hidden xl:flex flex-col gap-2 w-52 bg-white p-6 shadow-2xl border border-black/5 z-30 transform hover:scale-110 transition-transform cursor-pointer"
            >
              <div className="absolute -top-4 right-4 w-12 h-6 bg-aura-blue/20 backdrop-blur-sm rotate-3" />
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-aura-blue">
                <MapPin className="w-3 h-3" /> Reading Now
              </div>
              <p className="font-serif text-sm italic leading-tight text-aura-dark">"Steal Like An Artist" by Austin Kleon</p>
            </motion.div>
          </motion.div>

          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-14 py-7 bg-aura-dark text-aura-cream font-black text-2xl uppercase tracking-widest border-2 border-aura-dark overflow-hidden transition-all shadow-[10px_10px_0px_var(--aura-blue)]"
            >
              <span className="relative z-10 flex items-center gap-4">
                Explore The Archive <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-aura-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1]" />
            </motion.button>
          </Link>
        </div>

        {/* Floating Interactive Desk Section - Spaced out & Balanced */}
        <div className="relative w-full max-w-6xl h-[500px] mt-20 flex items-center justify-center">

          {/* Polaroid 01 - Far Left */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            initial={{ opacity: 0, x: -300, rotate: -8 }}
            animate={{ opacity: 1, x: -350, y: -40, rotate: -12 }}
            transition={{ duration: 1, delay: 0.5 }}
            whileDrag={{ zIndex: 100, scale: 1.1 }}
            className="absolute w-64 h-80 bg-aura-cream p-4 pb-14 shadow-2xl border border-black/5 cursor-grab active:cursor-grabbing transform z-10"
          >
            <div className="absolute top-[-15px] left-1/3 w-20 h-8 bg-aura-blue/20 backdrop-blur-sm -rotate-3 border-x border-black/5" />
            <div className="w-full h-full bg-[#1a1c24] flex items-center justify-center overflow-hidden border border-black/5 relative group">
              <div className="w-full h-full bg-gradient-to-br from-aura-blue/20 to-transparent mix-blend-overlay" />
              <Sparkles className="w-12 h-12 text-aura-blue/30 group-hover:scale-125 transition-transform duration-700" />
            </div>
            <p className="font-serif italic font-black text-2xl mt-4 text-center text-aura-dark tracking-tighter">Stay Inspired.</p>
          </motion.div>

          {/* Polaroid 02 - Far Right */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            initial={{ opacity: 0, x: 300, rotate: 12 }}
            animate={{ opacity: 1, x: 350, y: 60, rotate: 15 }}
            transition={{ duration: 1, delay: 0.7 }}
            whileDrag={{ zIndex: 100, scale: 1.1 }}
            className="absolute w-64 h-80 bg-aura-cream p-4 pb-14 shadow-2xl border border-black/5 cursor-grab active:cursor-grabbing transform z-10"
          >
            <div className="absolute top-[-10px] left-1/4 w-16 h-10 bg-aura-blue/10 backdrop-blur-sm rotate-6 border-x border-black/5" />
            <div className="w-full h-full bg-aura-dark/10 flex items-center justify-center border border-black/5">
              <div className="w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
            </div>
            <p className="font-serif italic font-black text-2xl mt-4 text-center text-aura-dark/40 tracking-tighter">Fragment #09.</p>
          </motion.div>

          {/* Post-it - Centered bottom */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 150, rotate: -2 }}
            transition={{ duration: 1, delay: 0.9 }}
            whileDrag={{ zIndex: 100, scale: 1.1 }}
            className="absolute w-72 h-72 bg-[#fef08a] p-10 shadow-xl border border-black/5 cursor-grab active:cursor-grabbing flex flex-col justify-between z-20"
          >
            <div className="w-10 h-10 rounded-full bg-aura-blue/10 absolute -top-5 -left-5 border border-black/5 flex items-center justify-center text-aura-blue">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <p className="font-serif text-3xl text-aura-dark italic leading-[0.95] font-black mb-4">
              "Creativity is the greatest expression of freedom."
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-aura-dark/40 border-t border-black/5 pt-4">
              <PenTool className="w-3 h-3" /> Izzy's Jotting
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-width Activity Archive Section */}
      <section className="w-full border-y-2 border-aura-foreground/10 bg-aura-background/50 py-24 px-4 md:px-8 mt-10 z-10 relative flex flex-col items-center">
        <div className="max-w-6xl w-full flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-5xl font-black text-aura-foreground tracking-tighter uppercase relative inline-block">
              Activity Archive
              <div className="absolute -bottom-4 left-0 w-24 h-2 bg-aura-blue/80 rounded-full" />
            </h2>
            <p className="font-sans text-lg text-aura-foreground/60 font-medium mt-2">Tracking echoes and digital footprints left behind.</p>
          </div>
          
          <div className="w-full h-96">
            <StreakTracker />
          </div>
        </div>
      </section>
    </main>
  );
}

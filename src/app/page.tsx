"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { StreakTracker } from "@/components/StreakTracker";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col items-center">
      {/* Background blobs for extra aura */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--aura-pink)] rounded-full blur-[100px] pointer-events-none opacity-30" />

      {/* Main Content Container - Scrapbook Style */}
      <div className="relative z-10 w-full max-w-5xl md:h-screen flex flex-col md:flex-row items-center justify-center pt-32 pb-20 px-8 gap-12">
        
        {/* Central Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 text-center"
        >
          <div className="bg-aura-background border-4 border-aura-foreground p-8 shadow-[8px_8px_0px_#1e1e24] inline-block relative">
            <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tight text-aura-foreground">
              IZZY'S <br/>
              <span className="text-aura-pink relative inline-block">
                ALTER EGO
              </span>
            </h1>
            <p className="mt-4 font-sans text-xl md:text-2xl font-medium max-w-sm mx-auto">
              A digital playground for scattered thoughts & vivid expressions.
            </p>
          </div>
        </motion.div>

        {/* Scrapbook Element 1: Draggable Polaroid */}
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
          initial={{ opacity: 0, x: -50, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: -12 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05, rotate: -8, zIndex: 30 }}
          whileDrag={{ zIndex: 40, scale: 1.1 }}
          className="relative md:absolute md:left-[5%] md:top-[15%] w-64 h-80 bg-aura-cream p-4 pb-14 shadow-2xl border border-black/10 hidden md:block cursor-grab active:cursor-grabbing"
        >
          {/* Washi Tape */}
          <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-24 h-8 bg-blue-300/40 backdrop-blur-sm -rotate-2 z-10 border-l border-r border-black/5" />
          
          <div className="w-full h-full bg-aura-blue flex items-center justify-center overflow-hidden border border-black/5 relative grayscale hover:grayscale-0 transition-all duration-700">
             <div className="absolute inset-0 bg-gradient-to-br from-aura-blue/20 to-purple-400/20 mix-blend-multiply" />
             <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
             <span className="font-serif text-4xl opacity-50 italic">MEMORIES</span>
          </div>
          <p className="font-serif font-black text-2xl mt-4 text-center transform -rotate-2 text-aura-dark tracking-tighter italic">Vibes.</p>
        </motion.div>

        {/* Scrapbook Element 2: Draggable Sticky Note */}
        <motion.div
          drag
          dragConstraints={{ left: -50, right: 150, top: -100, bottom: 100 }}
          initial={{ opacity: 0, x: 50, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 15 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.1, rotate: 5, zIndex: 30 }}
          whileDrag={{ zIndex: 40 }}
          className="relative md:absolute md:right-[5%] md:top-[40%] w-60 h-60 bg-[var(--aura-green)] p-8 shadow-lg md:flex flex-col justify-center hidden cursor-grab active:cursor-grabbing"
        >
          {/* Adhesive Tape */}
          <div className="w-10 h-3 bg-red-400/40 absolute top-2 left-1/2 -translate-x-1/2 rotate-3 border-b border-black/5" />
          
          <p className="font-serif text-2xl text-aura-dark leading-tight mt-2 italic font-medium">
            "Creativity is allowing yourself to make mistakes."
          </p>
          <div className="mt-4 h-0.5 bg-aura-dark/10 w-full" />
          <p className="mt-4 font-sans text-xs font-black uppercase tracking-widest text-aura-dark/40">Mood: Inspired</p>
        </motion.div>

      </div>

      {/* Below the Fold Content */}
      <div className="w-full max-w-5xl px-8 flex flex-col md:flex-row gap-12 pb-32">
        {/* Left Column: Explore */}
        <div className="flex-1 flex flex-col justify-center gap-12">
          {/* Call to action button */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-start"
          >
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-aura-pink text-aura-dark font-sans font-bold text-xl px-8 py-4 border-2 border-aura-foreground shadow-[4px_4px_0px_#1e1e24] flex items-center gap-2 hover:bg-aura-blue transition-colors duration-300 "
              >
                Explore the Archive <ArrowUpRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Streak Tracker */}
        <div className="flex-1">
          <StreakTracker />
        </div>
      </div>
    </main>
  );
}

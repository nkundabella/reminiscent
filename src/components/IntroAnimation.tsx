"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total animation duration before calling onComplete
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1200); // Wait for exit animation
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-aura-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Grainy Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay noise-overlay" />

          {/* Background Grid - subtle and precise */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ 
              backgroundImage: 'radial-gradient(circle, var(--aura-foreground) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          <div className="relative flex flex-col items-center">
            {/* "MY" - Small, elegant, visible */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "1em", y: 20 }}
              animate={{ opacity: 1, letterSpacing: "0.5em", y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-[10px] md:text-sm uppercase font-black text-aura-foreground/60 mb-8 border-y border-aura-foreground/10 py-1"
            >
              MY
            </motion.div>

            {/* "ALTER EGO" - Stenciled/Layered Style like the reference */}
            <div className="relative flex flex-col items-center">
              {/* Main Text Layer */}
              <div className="relative scale-110 md:scale-[1.8] flex flex-col items-center">
                
                {/* ALTER */}
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  <h1 className="font-serif text-[10rem] md:text-[14rem] font-black tracking-[-0.08em] text-aura-foreground leading-none select-none relative z-10">
                    ALTE
                    <span className="text-aura-blue">R</span>
                  </h1>
                  {/* Stenciled Cut-out Effect Simulation */}
                  <motion.div 
                    className="absolute inset-0 bg-aura-background z-20 mix-blend-difference"
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: 1.5, delay: 1, ease: [0.76, 0, 0.24, 1] }}
                    style={{ originX: 0 }}
                  />
                </motion.div>

                {/* EGO */}
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative -mt-12 md:-mt-24"
                >
                   <h1 className="font-serif text-[10rem] md:text-[14rem] font-black tracking-[-0.1em] text-aura-foreground leading-none select-none italic flex">
                      E
                      <span className="relative">
                        G
                        <motion.div 
                          className="absolute bottom-4 left-0 w-full h-2 bg-aura-blue/40 -z-10"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 2.5, duration: 1 }}
                        />
                      </span>
                      O
                   </h1>
                   {/* Ghost Shadow Layer */}
                   <motion.h1 
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 0.05, x: 0 }}
                     transition={{ delay: 2, duration: 2 }}
                     className="absolute inset-0 font-serif text-[10rem] md:text-[14rem] font-black tracking-[-0.1em] text-aura-foreground leading-none pointer-events-none -z-10 translate-x-4 translate-y-4"
                   >
                     EGO
                   </motion.h1>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.8em] text-aura-foreground/80 mt-12 mb-4"
              >
                S I N G U L A R &nbsp; A U R A
              </motion.div>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ delay: 2.4, duration: 1 }}
                className="h-[2px] bg-aura-foreground"
              />
            </div>
          </div>

          {/* Master Shrink Transition: Move directly to Fixed Logo position (top-8 left-8) */}
          <motion.div
            initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
            animate={{ 
               scale: 0.05, 
               x: "-42vw", 
               y: "-42vh", 
               opacity: 0 
            }}
            transition={{ 
               duration: 1.2, 
               delay: 3.8, 
               ease: [0.76, 0, 0.24, 1] 
            }}
            className="absolute inset-0 pointer-events-none border-[40px] border-aura-foreground/5 p-40"
          >
            {/* Mirroring the center content for the shrink effect */}
            <div className="w-full h-full flex flex-col items-center justify-center">
               <div className="font-serif text-[15rem] font-black tracking-tighter">ALTER EGO</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

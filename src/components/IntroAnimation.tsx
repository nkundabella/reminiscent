"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800", "900"],
});

gsap.registerPlugin(ScrollTrigger);

const PaperCutLetter = ({ char }: { char: string }) => {
  return (
    <span className="paper-cut-letter">
      <span className="paper-cut-top">{char}</span>
      <span className="paper-cut-bottom">{char}</span>
    </span>
  );
};

const PaperCutWord = ({ word, isBlue = false }: { word: string; isBlue?: boolean }) => {
  return (
    <div className={`paper-cut-word ${isBlue ? 'text-aura-blue' : ''}`}>
      {word.split("").map((char, i) => (char === " " ? <span key={i} className="w-4 md:w-8" /> : <PaperCutLetter key={i} char={char} />))}
      <div className="paper-cut-line-overlay" />
    </div>
  );
};

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const unfilteredRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(containerRef.current, {
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 1, // Start at 1, maybe scale up in entry
        zIndex: 1000,
        force3D: true,
      });

      gsap.set([unfilteredRef.current, ".paper-cut-word"], {
        opacity: 0,
        y: 60,
      });

      // 2. Entry Animation
      const entryTl = gsap.timeline();
      entryTl.to(containerRef.current, { scale: 1.5, duration: 1.5, ease: "expo.out" })
      .to([unfilteredRef.current, ".paper-cut-word"], {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "expo.out",
      }, 0)
      .to(".paper-cut-word", {
        className: "+=paper-cut-active",
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.inOut",
      }, "-=0.5")
      .to(scrollPromptRef.current, {
        opacity: 0.6,
        duration: 1,
      });

      // 3. Scroll Controlled Migration
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "+=500",
        scrub: 1,
        onUpdate: (self) => {
          // Calculate values manually for maximum control
          const p = self.progress;
          
          gsap.set(containerRef.current, {
            top: `${50 - p * 44}%`,
            left: `${50 - p * 44}%`,
            scale: 1.5 - p * 1.05,
            xPercent: -50 + p * 50,
            yPercent: -50 + p * 50,
          });

          gsap.set(unfilteredRef.current, { opacity: 1 - p * 2 });
          gsap.set(scrollPromptRef.current, { opacity: 0.6 - p * 2 });

          // Background fade
          gsap.set(bgRef.current, { opacity: 1 - p * 1.5 });

          // Interlock threshold
          if (p > 0.8) {
            containerRef.current?.classList.add("logo-mode", "branding-interlock");
          } else {
            containerRef.current?.classList.remove("logo-mode", "branding-interlock");
          }

          // Complete signal
          if (p >= 1) {
             onComplete();
          }
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [mounted, onComplete]);

  if (!mounted) return null;

  return (
    <>
      <div 
        ref={bgRef}
        className="fixed inset-0 bg-aura-background z-[998] pointer-events-none"
      />
      
      <div 
        ref={containerRef} 
        className={`pointer-events-none select-none flex flex-col items-center justify-center ${montserrat.className}`}
        style={{ willChange: "transform, opacity, top, left" }}
      >
        <div 
          ref={unfilteredRef}
          className="text-[10px] md:text-sm uppercase tracking-[1.5em] text-aura-foreground/60 mb-16 font-black"
        >
          UNFILTERED
        </div>
        
        <div ref={mainTextRef} className="flex paper-cut-container items-center gap-8 md:gap-16">
          <PaperCutWord word="MY" />
          <div className="flex flex-col md:flex-row items-center gap-0 md:gap-4 paper-cut-interlock-group">
            <PaperCutWord word="ALTER" />
            <PaperCutWord word="EGO" isBlue />
          </div>
        </div>

        <div 
          ref={scrollPromptRef}
          className="absolute -bottom-48 opacity-0 text-[10px] tracking-[0.8em] uppercase text-aura-foreground font-bold"
        >
          Scroll to explore
        </div>
      </div>
      
      {/* Spacer to allow scrolling */}
      <div className="h-[200vh] pointer-events-none z-0" />
    </>
  );
}

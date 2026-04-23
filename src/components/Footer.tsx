"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/pulse", label: "Pulse" },
  { href: "/studio", label: "Studio" },
];

export function Footer() {
  const pathname = usePathname();

  // Route-based conditional rendering
  if (pathname === "/studio") {
    return <BasicFooter />;
  }

  if (pathname === "/blog" || pathname?.startsWith("/blog/")) {
    return <ReceiptFooter />;
  }

  if (pathname === "/pulse") {
    return <PulseFooter />;
  }

  // Default to Desktop Reveal for Home and others
  return <DesktopRevealFooter />;
}

// --- SUB-COMPONENTS ---

function BasicFooter() {
  return (
    <footer className="w-full py-12 text-center border-t border-essence-foreground/5 mt-20 relative z-20 bg-essence-background">
      <p className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-essence-foreground/30">
        © {new Date().getFullYear()} Izzy. Built with expressive chaos.
      </p>
    </footer>
  );
}

function ReceiptFooter() {
  const pathname = usePathname();
  const [today, setToday] = useState(new Date());
  const [transId, setTransId] = useState("");

  useEffect(() => {
    setToday(new Date());
    setTransId(Math.random().toString(36).substring(2, 10).toUpperCase());
  }, []);

  const filteredLinks = links.filter(link => link.href !== pathname);

  return (
    <footer className="w-full pt-40 pb-20 px-4 flex flex-col items-center overflow-hidden relative z-20">
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.15 }}
        viewport={{ once: true }}
        className="w-full max-w-[450px] bg-[#fbf8f1] receipt-jagged relative shadow-[0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden text-[#0d0d0f] p-10 md:p-14 font-mono-receipt"
      >
        <div className="absolute inset-0 receipt-texture pointer-events-none opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.02)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black tracking-tighter uppercase mb-2">Izzy's Alter-Ego</h2>
            <div className="flex justify-between text-[11px] font-black border-y-2 border-dashed border-[#0d0d0f]/20 py-3 uppercase tracking-wider">
              <span>TRNS: #{transId || "82XJ9L0"}</span>
              <span>{today.toLocaleDateString()} {today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-[#0d0d0f]/40">
              <span>Expressive Dir.</span>
              <span>Qty: 01</span>
            </div>
            
            <div className="flex flex-col gap-3">
              {filteredLinks.map((link) => (
                <Link key={link.href} href={link.href} className="group flex justify-between items-baseline hover:bg-[#0d0d0f]/5 px-2 -mx-2 py-1 transition-all rounded-sm">
                  <span className="uppercase font-black text-sm tracking-tight group-hover:pl-1 transition-all">{link.label}</span>
                  <div className="flex-1 border-b border-dotted border-[#0d0d0f]/30 mx-3 mb-1" />
                  <span className="font-black text-sm">$FREE</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t-2 border-dashed border-[#0d0d0f]/20">
            <div className="flex justify-between items-center text-lg font-black tracking-tighter uppercase">
              <span>Total Expression</span>
              <span className="text-essence-pink">100.00%</span>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-widest text-[#0d0d0f]/50">
              <div className="flex justify-between"><span>Start:</span><span className="text-[#0d0d0f]">AESTHETIC_INIT</span></div>
              <div className="flex justify-between"><span>Mode:</span><span className="text-[#0d0d0f]">CHAOS_ONLY</span></div>
              <div className="flex justify-between"><span>Loc:</span><span className="text-[#0d0d0f]">DIGITAL_ETHER</span></div>
              <div className="flex justify-between"><span>Ver:</span><span className="text-[#0d0d0f]">ESSENCE.v1</span></div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 mt-6">
            <div className="w-full flex flex-col items-center gap-2 overflow-hidden">
                 <div className="flex h-14 w-full max-w-[320px] justify-between items-stretch gap-[1.5px] opacity-90 transition-opacity hover:opacity-100">
                    {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9, 5, 0, 2, 8, 8, 4, 1, 9, 7].map((w, i) => (
                        <div key={i} style={{ flexGrow: w }} className={`bg-[#0d0d0f] h-full ${i % 7 === 0 ? 'opacity-30' : 'opacity-100'}`} />
                    ))}
                 </div>
                 <span className="text-[10px] font-black tracking-[0.5em] opacity-40 ml-2">ALTER-EGO-PRIME</span>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-[10px] font-black tracking-[0.25em] uppercase opacity-40 italic leading-relaxed max-w-[200px] mx-auto">
                No rights reserved. Build with reckless intent and expressive chaos.
              </p>
              <div className="w-8 h-[2px] bg-[#0d0d0f]/20 mx-auto" />
              <p className="font-sans text-[9px] font-bold opacity-30 tracking-widest uppercase">
                © {today.getFullYear()} IZ.SYS
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
function PulseFooter() {
  const [isHovered, setIsHovered] = useState(false);
  const today = new Date();

  // Non-cringe, minimalist affirmations with wide intentional spacing
  const wordsOfPower = [
    "YOU ARE STRONG",
    "                          ",
    "AMBITIOUS",
    "                          ",
    "LOVED",
    "                          ",
    "ALTER EGO",
    "                          ",
    "SEEN",
    "                          ",
    "INTENTIONAL",
    "                          ",
    "ABSOLUTE",
    "                          ",
    "ALTER EGO",
    "                          ",
  ];

  return (
    <footer 
      className="w-full bg-essence-background text-essence-foreground relative h-32 md:h-40 overflow-hidden flex items-center justify-center group border-t border-essence-foreground/5 shadow-[0_-1px_0_rgba(0,0,0,0.02)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="ticker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <ActivityTicker words={wordsOfPower} />
          </motion.div>
        ) : (
          <motion.div
            key="navigation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 z-10"
          >
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="font-serif text-sm md:text-xl font-bold tracking-tight text-essence-foreground/40 hover:text-essence-pink hover:scale-105 transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono opacity-20 uppercase tracking-[0.3em] whitespace-nowrap">
              © {today.getFullYear()} IZ.SYS / ABSOLUTE_ESSENCE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-essence-foreground/5" />
    </footer>
  );
}

function ActivityTicker({ words }: { words: string[] }) {
  return (
    <div className="flex overflow-hidden whitespace-nowrap opacity-20 hover:opacity-40 transition-opacity">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 60, // Slower, more inevitable scroll
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex">
            {words.map((word, index) => (
              <span 
                key={index} 
                className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] flex items-center whitespace-pre ${word === "ALTER EGO" ? "text-essence-pink opacity-100" : ""}`}
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function IntentionalArrow({ start, end, isVisible }: { start: { x: number, y: number }, end: { x: number, y: number }, isVisible: boolean }) {
  // Graceful cubic curve
  const path = `M ${start.x} ${start.y} C ${start.x} ${(start.y + end.y) / 2}, ${end.x} ${(start.y + end.y) / 2.5}, ${end.x} ${end.y}`;

  return (
    <svg 
      className="fixed inset-0 pointer-events-none z-[200]" 
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <motion.path
        d={path}
        fill="none"
        stroke="#ec4899"
        strokeWidth="3.5"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isVisible ? 1 : 0, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ 
          duration: 0.875,
          ease: [0.16, 1, 0.3, 1] // Custom intentional ease
        }}
      />
      
      {/* Arrow Head - Precise & Clean */}
      <motion.path
        d={`M ${end.x - 8} ${end.y - 14} L ${end.x} ${end.y} L ${end.x + 8} ${end.y - 14}`}
        fill="none"
        stroke="#ec4899"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5
        }}
        transition={{ delay: 0.8, duration: 0.2, ease: "easeOut" }}
      />
    </svg>
  );
}

function DesktopRevealFooter() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const noteRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const filteredLinks = links.filter(link => link.href !== pathname);

  // Nav icon positions (estimated relative to viewport center)
  const getNavPos = (label: string) => {
    if (typeof window === "undefined" || !mounted) return { x: 0, y: 0 };
    const centerX = window.innerWidth / 2;
    const bottomY = window.innerHeight - 80; 
    
    // Normalized indices: Home(0), Blog(1), Pulse(2), Studio(3)
    const offsets: { [key: string]: number } = {
      "Home": -96,
      "Blog": -32,
      "Pulse": 32,
      "Studio": 96
    };
    
    return { x: centerX + (offsets[label] || 0), y: bottomY };
  };

  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (label: string) => {
    const rect = noteRefs.current[label]?.getBoundingClientRect();
    if (rect) {
      setStartPos({ x: rect.left + rect.width / 2, y: rect.bottom - 20 });
      setHoveredLabel(label);
    }
  };

  return (
    <div className="relative mt-40">
      <AnimatePresence>
        {mounted && hoveredLabel && (
          <IntentionalArrow 
            start={startPos} 
            end={getNavPos(hoveredLabel)} 
            isVisible={!!hoveredLabel} 
          />
        )}
      </AnimatePresence>

      {/* The sticky container that sits behind the content */}
      <div className="sticky bottom-0 h-auto md:h-[700px] w-full overflow-hidden desk-surface flex items-center justify-center p-8 md:p-10 z-0 bg-[#0d0d0f]">
          <div className="absolute inset-0 receipt-texture opacity-10 pointer-events-none" />
          
          <div className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center gap-12 md:gap-24 py-20">
            {/* Header / Intro */}
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-essence-background/20 block mb-4">Final Perspective</span>
              <h3 className="font-serif text-4xl md:text-7xl text-essence-background tracking-tighter">Stay a while.</h3>
            </div>

            {/* Scattered Notes (Links) */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-16 relative w-full px-4">
              {filteredLinks.map((link, i) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="block group"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <motion.div
                    ref={el => { noteRefs.current[link.label] = el; }}
                    initial={{ rotate: i % 2 === 0 ? -3 : 3, y: 0 }}
                    whileHover={{ y: -15, rotate: 0, scale: 1.05, zIndex: 50 }}
                    className="scattered-note w-36 h-36 md:w-52 md:h-52 flex flex-col items-center justify-center text-center cursor-pointer group-hover:bg-[#fef9c3] transition-colors shrink-0"
                  >
                    <div className="note-pin" />
                    <div className="flex flex-col items-center px-4">
                      <span className="font-serif text-xl md:text-3xl font-black mb-1 group-hover:text-essence-pink transition-colors leading-tight">
                        {link.label}
                      </span>
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] opacity-30">Navigate to</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
              
              {/* Artistic Scribble/Note */}
              <div className="absolute -top-10 -right-10 w-64 h-64 opacity-[0.03] pointer-events-none hidden lg:block">
                <svg viewBox="0 0 200 200" className="fill-essence-background">
                  <path d="M10,10 Q50,90 190,10 T100,190 Q10,10 10,10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>
            </div>

            {/* Live Status Widget */}
            <div className="flex flex-col items-center gap-6">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="flex items-center gap-4 bg-white/[0.03] backdrop-blur-xl px-6 md:px-8 py-3 md:py-4 rounded-3xl border border-white/5 shadow-2xl"
               >
                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-essence-pink rounded-full animate-ping absolute inset-0" />
                    <div className="w-2.5 h-2.5 bg-essence-pink rounded-full relative shadow-[0_0_15px_#ff6bb3]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-essence-background/40 leading-none mb-1">Current State</span>
                    <span className="text-[10px] md:text-[11px] font-bold text-essence-background uppercase tracking-wider whitespace-nowrap">Navigating the Void</span>
                  </div>
               </motion.div>
               
               <p className="font-sans text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] text-essence-background/10 text-center">
                 © {new Date().getFullYear()} IZ.SYS / EXPRESSIVE CHAOS
               </p>
            </div>
          </div>
      </div>
    </div>
  );
}

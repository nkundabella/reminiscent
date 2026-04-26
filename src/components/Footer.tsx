"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  // Default to Desktop Reveal for Home, Pulse, and others
  return <DesktopRevealFooter />;
}

// --- SUB-COMPONENTS ---

function BasicFooter() {
  return (
    <footer className="w-full py-12 text-center border-t border-aura-foreground/5 mt-20 relative z-20 bg-aura-background">
      <p className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-aura-foreground/30">
        © {new Date().getFullYear()} Izzy. Built with expressive chaos.
      </p>
    </footer>
  );
}

function ReceiptFooter() {
  const [today, setToday] = useState(new Date());
  const [transId, setTransId] = useState("");

  useEffect(() => {
    setToday(new Date());
    setTransId(Math.random().toString(36).substring(2, 10).toUpperCase());
  }, []);

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
              {links.map((link) => (
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
              <span className="text-aura-pink">100.00%</span>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-widest text-[#0d0d0f]/50">
              <div className="flex justify-between"><span>Start:</span><span className="text-[#0d0d0f]">AESTHETIC_INIT</span></div>
              <div className="flex justify-between"><span>Mode:</span><span className="text-[#0d0d0f]">CHAOS_ONLY</span></div>
              <div className="flex justify-between"><span>Loc:</span><span className="text-[#0d0d0f]">DIGITAL_ETHER</span></div>
              <div className="flex justify-between"><span>Ver:</span><span className="text-[#0d0d0f]">AURA.v1</span></div>
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

function DesktopRevealFooter() {
  return (
    <div className="relative mt-40">
      {/* The sticky container that sits behind the content */}
      <div className="sticky bottom-0 h-auto md:h-[700px] w-full overflow-hidden desk-surface flex items-center justify-center p-8 md:p-10 z-10 bg-[#0d0d0f]">
          <div className="absolute inset-0 receipt-texture opacity-10 pointer-events-none" />
          
          <div className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center gap-12 md:gap-24 py-20">
            {/* Header / Intro */}
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-aura-background/20 block mb-4">Final Perspective</span>
              <h3 className="font-serif text-4xl md:text-7xl text-aura-background tracking-tighter">Stay a while.</h3>
            </div>

            {/* Scattered Notes (Links) */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-16 relative w-full px-4">
              {links.map((link, i) => (
                <Link key={link.href} href={link.href} className="shrink-0">
                  <motion.div
                    initial={{ rotate: i % 2 === 0 ? -3 : 3, y: 0 }}
                    whileHover={{ y: -15, rotate: 0, scale: 1.05, zIndex: 50 }}
                    className="scattered-note w-36 h-36 md:w-52 md:h-52 flex flex-col items-center justify-center text-center cursor-pointer group"
                  >
                    <div className="note-pin" />
                    <div className="flex flex-col items-center px-4">
                      <span className="font-serif text-xl md:text-3xl font-black mb-2 group-hover:text-aura-pink transition-colors leading-tight">
                        {link.label}
                      </span>
                      <div className="flex items-center gap-1.5 text-aura-pink opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">Navigate</span>
                        <ArrowDown className="w-3 h-3 animate-bounce" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
              
              {/* Artistic Scribble/Note */}
              <div className="absolute -top-10 -right-10 w-64 h-64 opacity-[0.03] pointer-events-none hidden lg:block">
                <svg viewBox="0 0 200 200" className="fill-aura-background">
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
                    <div className="w-2.5 h-2.5 bg-aura-pink rounded-full animate-ping absolute inset-0" />
                    <div className="w-2.5 h-2.5 bg-aura-pink rounded-full relative shadow-[0_0_15px_#ff6bb3]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-aura-background/40 leading-none mb-1">Current State</span>
                    <span className="text-[10px] md:text-[11px] font-bold text-aura-background uppercase tracking-wider whitespace-nowrap">Navigating the Void</span>
                  </div>
               </motion.div>
               
               <p className="font-sans text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] text-aura-background/10 text-center">
                 © {new Date().getFullYear()} IZ.SYS / EXPRESSIVE CHAOS
               </p>
            </div>
          </div>
      </div>
    </div>
  );
}

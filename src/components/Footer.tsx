"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/pulse", label: "Pulse" },
  { href: "/studio", label: "Studio" },
];

export function Footer() {
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
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 receipt-texture pointer-events-none opacity-20" />
        
        {/* Subtle Horizontal Grain */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.02)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black tracking-tighter uppercase mb-2">Izzy's Alter-Ego</h2>
            <div className="flex justify-between text-[11px] font-black border-y-2 border-dashed border-[#0d0d0f]/20 py-3 uppercase tracking-wider">
              <span>TRNS: #{transId || "82XJ9L0"}</span>
              <span>{today.toLocaleDateString()} {today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-[#0d0d0f]/40">
              <span>Expressive Dir.</span>
              <span>Qty: 01</span>
            </div>
            
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="group flex justify-between items-baseline hover:bg-[#0d0d0f]/5 px-2 -mx-2 py-1 transition-all rounded-sm"
                >
                  <span className="uppercase font-black text-sm tracking-tight group-hover:pl-1 transition-all">
                    {link.label}
                  </span>
                  <div className="flex-1 border-b border-dotted border-[#0d0d0f]/30 mx-3 mb-1" />
                  <span className="font-black text-sm">$FREE</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Metadata Section */}
          <div className="space-y-6 pt-6 border-t-2 border-dashed border-[#0d0d0f]/20">
            <div className="flex justify-between items-center text-lg font-black tracking-tighter uppercase">
              <span>Total Expression</span>
              <span className="text-aura-pink">100.00%</span>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-widest text-[#0d0d0f]/50">
              <div className="flex justify-between">
                <span>Start:</span>
                <span className="text-[#0d0d0f]">AESTHETIC_INIT</span>
              </div>
              <div className="flex justify-between">
                <span>Mode:</span>
                <span className="text-[#0d0d0f]">CHAOS_ONLY</span>
              </div>
              <div className="flex justify-between">
                <span>Loc:</span>
                <span className="text-[#0d0d0f]">DIGITAL_ETHER</span>
              </div>
              <div className="flex justify-between">
                <span>Ver:</span>
                <span className="text-[#0d0d0f]">AURA.v1</span>
              </div>
            </div>
          </div>

          {/* Barcode & Footer */}
          <div className="flex flex-col items-center gap-8 mt-6">
            <div className="w-full flex flex-col items-center gap-2 overflow-hidden">
                 <div className="flex h-14 w-full max-w-[320px] justify-between items-stretch gap-[1.5px] opacity-90 transition-opacity hover:opacity-100">
                    {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9, 5, 0, 2, 8, 8, 4, 1, 9, 7].map((w, i) => (
                        <div 
                            key={i} 
                            style={{ flexGrow: w }} 
                            className={`bg-[#0d0d0f] h-full ${i % 7 === 0 ? 'opacity-30' : 'opacity-100'}`} 
                        />
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
        
        {/* Subtle Bottom Glow Area */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0d0d0f]/5" />
      </motion.div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Notebook, BookHeart, User, Bell } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Blog", icon: Notebook },
  { href: "/guestbook", label: "Guestbook", icon: BookHeart },
  { href: "/studio", label: "Studio", icon: User },
];

export function Navbar({ showLogo = true }: { showLogo?: boolean }) {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <>
      <AnimatePresence>
        {showLogo && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 left-8 z-50 mix-blend-difference pointer-events-auto"
          >
            <Link href="/" className="group block relative">
              <motion.div
                className="flex flex-col items-start"
              >
                <span className="font-serif text-5xl font-black tracking-tighter text-aura-cream leading-[0.8] mb-1">
                  IZZY.
                </span>
                <div className="flex items-center gap-2">
                  <div className="h-[1px] w-8 bg-aura-cream/30" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-aura-cream/50">
                    Alter Ego
                  </span>
                </div>
                
                {/* Signature Underline */}
                <motion.div 
                  className="absolute -bottom-2 -left-1 h-3 w-0 bg-[var(--aura-blue)]/20 -skew-x-12 -z-10"
                  whileHover={{ width: "110%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
        <div className="relative bg-[#0d0d0f]/95 rounded-2xl px-5 py-3.5 flex items-center gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 backdrop-blur-2xl">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            
            const isHovered = hoveredPath === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative p-2 rounded-xl transition-all duration-300 group"
                onMouseEnter={() => setHoveredPath(link.href)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {isActive && (
                    <motion.div
                      key={`spotlight-${link.href}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      {/* The "Laser" Line at the Top */}
                      <motion.div
                        layoutId="nav-spotlight-line"
                        className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-10 h-[3px] bg-aura-blue rounded-full shadow-[0_0_25px_#7dd3fc,0_0_10px_#7dd3fc]"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />

                      {/* The Spotlight Cone (Light Beam) */}
                      <motion.div
                        layoutId="nav-spotlight-cone"
                        className="absolute top-[-14px] left-1/2 -translate-x-1/2 w-28 h-40 origin-top z-0"
                        style={{
                          background: `linear-gradient(to bottom, rgba(125, 211, 252, 0.15) 0%, rgba(125, 211, 252, 0.05) 50%, transparent 100%)`,
                          clipPath: 'polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)',
                          filter: 'blur(8px)',
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <link.icon 
                  className={`w-6 h-6 relative z-10 transition-all duration-500 ${
                    isActive 
                      ? "text-aura-blue scale-110 drop-shadow-[0_0_10px_rgba(125,211,252,0.6)]" 
                      : isHovered 
                        ? "text-aura-blue/60 scale-110 drop-shadow-[0_0_5px_rgba(125,211,252,0.3)]" 
                        : "text-white/20"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

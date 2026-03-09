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

export function Navbar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <>
      {/* Editorial Logo - Fixed Top Left */}
      <div className="fixed top-8 left-8 z-50 mix-blend-difference pointer-events-auto">
        <Link href="/" className="group block">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl font-bold tracking-tighter text-aura-cream leading-none group-hover:text-aura-pink transition-colors">
              I Z <br/> Z Y
            </h2>
            <motion.div 
              className="h-0.5 bg-aura-pink mt-1"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </Link>
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
        <div className="relative bg-[#1a1a1a]/90 rounded-2xl px-4 py-3 flex items-center gap-8 shadow-2xl border border-white/5 backdrop-blur-xl">
          {links.map((link) => {
            // Match exactly for home, or start with for others (e.g. /studio/...)
            const isActive = link.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(link.href);
            
            const isHovered = hoveredPath === link.href;
            const showSpotlight = isActive || isHovered;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative p-2 rounded-xl transition-colors duration-300 group"
                onMouseEnter={() => setHoveredPath(link.href)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {/* Spotlight Beam - Locked to Active Page */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      {/* The "Laser" Line at the Top */}
                      <motion.div
                        layoutId="spotlight-line"
                        className="absolute top-[-14px] left-1/2 -translate-x-1/2 w-10 h-[3px] bg-aura-pink rounded-full shadow-[0_0_20px_#ff6bb3,0_0_10px_#ff6bb3]"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />

                      {/* The Spotlight Cone (Light Beam) */}
                      <motion.div
                        layoutId="spotlight-cone"
                        className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-24 h-40 origin-top z-0"
                        style={{
                          background: `linear-gradient(to bottom, rgba(255, 107, 179, 0.15) 0%, rgba(255, 107, 179, 0.05) 40%, transparent 100%)`,
                          clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
                          filter: 'blur(8px)',
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />

                      {/* Targeted Icon Glow */}
                      <motion.div
                        layoutId="icon-glow"
                        className="absolute inset-0 bg-aura-pink/10 blur-xl rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <link.icon 
                  className={`w-6 h-6 relative z-10 transition-all duration-500 ${
                    isActive 
                      ? "text-aura-pink scale-110 drop-shadow-[0_0_8px_rgba(255,107,179,0.8)]" 
                      : isHovered 
                        ? "text-aura-pink/80 scale-110 drop-shadow-[0_0_5px_rgba(255,107,179,0.4)]" 
                        : "text-white/30"
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

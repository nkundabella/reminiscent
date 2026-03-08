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
                {/* Spotlight Beam - Persistent on Active or visible on Hover */}
                {showSpotlight && (
                  <>
                    {/* The Spotlight Glow */}
                    <motion.div
                      layoutId="spotlight-beam"
                      className="absolute inset-x-0 bottom-[-12px] h-32 pointer-events-none z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div 
                        className="w-full h-full"
                        style={{
                          background: `conic-gradient(from 180deg at 50% 0%, transparent 42%, rgba(255, 107, 179, 0.2) 50%, transparent 58%)`,
                          filter: 'blur(12px)',
                          transform: 'perspective(100px) rotateX(45deg)'
                        }}
                      />
                    </motion.div>

                    {/* The "Laser" Line at the Top */}
                    <motion.div
                      layoutId="spotlight-line"
                      className="absolute top-[-14px] left-1/2 -translate-x-1/2 w-8 h-[3px] bg-aura-pink rounded-full shadow-[0_0_15px_#ff6bb3]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </>
                )}

                <link.icon 
                  className={`w-6 h-6 relative z-10 transition-all duration-300 ${
                    isActive ? "text-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]" : "text-white/40 group-hover:text-white/80"
                  }`}
                />
                
                {/* Active Underglow */}
                {isActive && (
                  <motion.div 
                    layoutId="active-glow"
                    className="absolute inset-0 bg-aura-pink/20 blur-lg rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

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
            className={`fixed top-8 left-8 z-50 transition-colors duration-500 pointer-events-auto`}
          >
            <Link href="/" className="group block relative hover:opacity-80 transition-opacity p-2 md:p-4 scale-[0.45] md:scale-50 origin-top-left">
              <div className="flex flex-col relative w-fit">
                {/* The cursive text, positioned top-left, slightly angled */}
                <span className="absolute -top-3 -left-3 font-[family-name:var(--font-great-vibes)] text-4xl text-aura-foreground rotate-[-12deg] z-10 leading-none">
                  My
                </span>

                {/* The bold serif text, stacked neatly with tight line-height */}
                <div className="font-[family-name:var(--font-instrument)] font-serif text-[4.5rem] font-bold leading-[0.85] text-aura-foreground tracking-[-0.03em] flex flex-col pt-2">
                  <span>Alter</span>
                  {/* Indented to align under the stem of 'l' in 'Alter' (much like 'Club' under 'Girls') */}
                  <span className="ml-[0.9em]">Ego</span>
                </div>
              </div>
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
                className="relative p-2 rounded-xl transition-all duration-300 group z-10"
                onMouseEnter={() => setHoveredPath(link.href)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {/* Spotlight Beam - Shared layoutId for absolute precision */}
                {isActive && (
                  <motion.div
                    layoutId="nav-spotlight-main"
                    className="absolute inset-0 pointer-events-none z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  >
                    {/* The "Laser" Line at the Top */}
                    <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-10 h-[3px] bg-aura-blue rounded-full shadow-[0_0_25px_#7dd3fc,0_0_10px_#7dd3fc] z-50" />

                    {/* The Spotlight Cone (Light Beam) */}
                    <div
                      className="absolute top-[-14px] left-1/2 -translate-x-1/2 w-28 h-40 origin-top z-0"
                      style={{
                        background: `linear-gradient(to bottom, rgba(125, 211, 252, 0.2) 0%, rgba(125, 211, 252, 0.05) 50%, transparent 100%)`,
                        clipPath: 'polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)',
                        filter: 'blur(10px)',
                      }}
                    />
                  </motion.div>
                )}

                <link.icon
                  className={`w-6 h-6 relative z-10 transition-all duration-500 ${isActive
                    ? "text-aura-blue scale-110 drop-shadow-[0_0_15px_rgba(125,211,252,0.8)]"
                    : isHovered
                      ? "text-aura-blue/60 scale-110"
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

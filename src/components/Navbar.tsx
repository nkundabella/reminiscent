"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "HME" },
  { href: "/blog", label: "LOG" },
  { href: "/guestbook", label: "GBK" },
];

export function Navbar() {
  const pathname = usePathname();

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

      {/* Sophisticated Side Menu - Fixed Top Right */}
      <nav className="fixed top-8 right-8 z-50">
        <ul className="flex flex-col items-end gap-3">
          {links.map((link, i) => (
            <motion.li 
              key={link.href}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="group relative pr-4"
            >
              <Link
                href={link.href}
                className={`font-sans font-black text-[10px] tracking-[0.3em] transition-all duration-300 hover:text-aura-pink flex items-center gap-2 ${
                  pathname === link.href ? "text-aura-pink" : "text-aura-foreground"
                }`}
              >
                {link.label}
              </Link>
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-aura-pink rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.li>
          ))}
        </ul>
      </nav>
    </>
  );
}

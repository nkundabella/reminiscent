"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Log" },
  { href: "/now", label: "Now" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-aura-background/80 backdrop-blur-md border-2 border-aura-foreground rounded-full px-8 py-3 shadow-[4px_4px_0px_#1e1e24] flex gap-2">
      <ul className="flex items-center gap-8">
        {links.map((link) => (
          <li key={link.href} className="relative">
            <Link
              href={link.href}
              className={`font-sans font-bold text-lg hover:text-aura-pink transition-colors relative z-10 ${
                pathname === link.href ? "text-aura-foreground" : "text-aura-foreground/70"
              }`}
            >
              {link.label}
            </Link>
            {pathname === link.href && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -bottom-2 -left-2 -right-2 h-2 bg-aura-green transform -rotate-2 z-0 mix-blend-multiply opacity-50"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

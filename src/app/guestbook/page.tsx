"use client";

import { motion } from "framer-motion";
import { StreakTracker } from "@/components/StreakTracker";

export default function GuestbookPage() {
  return (
    <main className="min-h-screen pt-40 pb-20 px-8 relative overflow-hidden bg-aura-background">
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 text-aura-foreground tracking-tighter">
            Activity Log.
          </h1>
          <p className="font-sans text-xl text-aura-foreground/70">
            A real-time heatmap of creative output, thoughts logged, and updates pushed.
          </p>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-4xl mx-auto"
        >
          <StreakTracker />
        </motion.div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-aura-blue/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-aura-blue/5 rounded-full blur-[100px] pointer-events-none" />
    </main>
  );
}

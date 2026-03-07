"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export function NowSnippet() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-aura-cream p-8 border-2 border-aura-foreground shadow-[4px_4px_0px_#1e1e24] w-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-aura-blue rounded-full border border-aura-foreground">
          <Coffee className="w-5 h-5 text-aura-dark" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-aura-dark">Right Now.</h2>
      </div>
      
      <div className="space-y-6 font-sans text-aura-dark/80">
        <div>
           <h3 className="font-bold text-aura-dark uppercase text-sm tracking-wider mb-2 text-aura-pink">Building</h3>
           <p>This very digital garden you are looking at.</p>
        </div>
        <div>
           <h3 className="font-bold text-aura-dark uppercase text-sm tracking-wider mb-2 text-aura-pink">Reading</h3>
           <p className="italic">"The Creative Act: A Way of Being"</p>
        </div>
        <div>
           <h3 className="font-bold text-aura-dark uppercase text-sm tracking-wider mb-2 text-aura-pink">Listening</h3>
           <p>Jazz Hop cafe vibes on infinite loop.</p>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-aura-foreground/10 text-sm font-medium">
        Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>
    </motion.div>
  );
}

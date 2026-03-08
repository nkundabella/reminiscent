"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

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
            Guestbook.
          </h1>
          <p className="font-sans text-xl text-aura-foreground/70">
            Leave a mark, a vibe, or just a hello. This is the collective digital aura of everyone who's been here.
          </p>
        </motion.div>

        {/* Message Input Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-aura-cream p-8 border-2 border-aura-foreground shadow-[8px_8px_0px_#1e1e24] mb-20"
        >
          <textarea 
            placeholder="Type something iconic..."
            className="w-full h-32 bg-transparent border-b-2 border-aura-foreground/10 focus:border-aura-pink outline-none font-sans text-xl py-4 resize-none transition-colors"
          />
          <div className="flex justify-between items-center mt-8">
             <span className="text-xs font-black tracking-widest uppercase opacity-30">Stay creative.</span>
             <button className="bg-aura-foreground text-aura-cream px-8 py-3 font-bold hover:bg-aura-pink hover:text-aura-dark transition-all duration-300 flex items-center gap-2 group">
               SIGN <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </button>
          </div>
        </motion.div>

        {/* Mock Messages */}
        <div className="space-y-12">
           {[1, 2, 3].map((i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className={`p-6 border-l-4 border-aura-pink bg-aura-foreground/5 max-w-md ${i % 2 === 0 ? "ml-auto" : ""}`}
             >
                <p className="font-sans text-lg mb-2 italic">"Loving the vibe here! Looking forward to more posts."</p>
                <span className="text-xs font-black uppercase tracking-widest opacity-50">— Anonymous Visitor</span>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-aura-blue/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-aura-pink/10 rounded-full blur-[100px] pointer-events-none" />
    </main>
  );
}

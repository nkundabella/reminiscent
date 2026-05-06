"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function CommentForm({ postId }: { postId: string }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, message }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      setStatus("success");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="mt-12 bg-aura-blue/5 p-8 border border-aura-foreground/10 rounded-2xl relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-aura-blue/10 rounded-full blur-3xl pointer-events-none" />
      
      <h3 className="font-serif text-2xl font-bold mb-6 text-aura-foreground">Leave a Note (Anonymous)</h3>
      
      {status === "success" ? (
        <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-4 rounded-lg font-bold">
          Your thought has been cast into the void successfully! Refresh to see it.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind? Keep it chaotic but kind..."
            className="w-full bg-transparent border-2 border-aura-foreground/20 rounded-xl p-4 min-h-[120px] resize-none focus:outline-none focus:border-aura-blue transition-colors placeholder:text-aura-foreground/30 font-sans"
            required
          />
          
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs font-black uppercase tracking-widest opacity-40">
              No account required.
            </p>
            
            <button
              type="submit"
              disabled={status === "submitting" || !message.trim()}
              className="group flex items-center gap-2 bg-aura-foreground text-aura-background px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm disabled:opacity-50 hover:scale-105 transition-all"
            >
              {status === "submitting" ? "Sending..." : "Submit"}
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {status === "error" && (
            <p className="text-red-500 text-sm mt-2 font-bold">Something went wrong. The void rejected your message.</p>
          )}
        </form>
      )}
    </div>
  );
}

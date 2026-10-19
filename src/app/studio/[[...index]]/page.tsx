"use client";

import { useEffect, useState } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "@/../sanity.config";
import { Lock, ArrowLeft, KeyRound, Loader2, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function StudioPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if owner is already authenticated
  useEffect(() => {
    fetch("/api/auth/unlock")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(Boolean(data.authenticated));
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setError(data.message || "Incorrect passcode");
      }
    } catch {
      setError("Failed to authenticate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. Initial Checking State
  if (isAuthenticated === null) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#101114] text-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#7dd3fc] mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-white/50">
          Verifying creator credentials...
        </p>
      </main>
    );
  }

  // 2. Authenticated Creator -> Mount Sanity Studio
  if (isAuthenticated) {
    return <NextStudio config={config} />;
  }

  // 3. Unauthorized Visitor -> Security Gate
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[#0f1013] text-[#fbf8f1] relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full bg-[#16181d] border-2 border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lock className="w-6 h-6" />
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-xs font-bold text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </Link>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3 tracking-tight">
          Creator Studio
        </h1>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          This writing and editing suite is reserved for the site creator. Enter your author passcode to access your drafts and publishing tools.
        </p>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter creator passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                className="w-full bg-[#0d0e11] border-2 border-white/15 focus:border-[#7dd3fc] rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors text-white placeholder:text-white/30"
              />
              <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold mt-2.5 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !passcode.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-sky-500 text-[#0d0e11] rounded-xl text-xs font-black uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-500/20 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
              </>
            ) : (
              "Unlock Studio"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] text-white/40">
            Looking to explore? You can read and leave anonymous notes on the{" "}
            <Link href="/blog" className="text-sky-400 hover:underline">
              public archive
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowLeft, KeyRound, Loader2 } from "lucide-react";
import Link from "next/link";

interface PrivatePostGateProps {
  postTitle?: string;
}

export function PrivatePostGate({ postTitle }: PrivatePostGateProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Refresh the server component so the post renders
        router.refresh();
      } else {
        setError(data.message || "Incorrect passcode");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-40 pb-20 px-8 relative bg-aura-background flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-aura-background border-2 border-aura-foreground shadow-[8px_8px_0px_var(--aura-foreground)] p-8 md:p-10 relative">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-aura-foreground/60 hover:text-aura-blue transition-colors mb-8 text-xs font-black uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Archive
        </Link>

        <div className="w-14 h-14 rounded-full bg-aura-blue/10 border border-aura-blue flex items-center justify-center mb-6 text-aura-blue">
          <Lock className="w-6 h-6" />
        </div>

        <span className="font-sans text-[11px] font-black uppercase tracking-widest px-2.5 py-1 bg-amber-500/10 text-amber-600 border border-amber-500/30 rounded-full inline-block mb-3">
          Private Entry
        </span>

        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-aura-foreground leading-tight">
          {postTitle ? `"${postTitle}"` : "Author Access Required"}
        </h1>

        <p className="font-sans text-aura-foreground/70 text-sm mb-8 leading-relaxed">
          This post is marked as private. Enter your personal passcode to read this entry.
        </p>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                className="w-full bg-aura-background border-2 border-aura-foreground px-4 py-3 pl-11 text-sm font-sans focus:outline-none focus:border-aura-blue transition-colors placeholder:text-aura-foreground/40 text-aura-foreground"
              />
              <KeyRound className="w-4 h-4 text-aura-foreground/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {error && (
              <p className="text-red-500 text-xs font-bold mt-2 animate-shake">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !passcode.trim()}
            className="w-full bg-aura-foreground text-aura-background font-black text-xs uppercase tracking-widest py-3.5 hover:bg-aura-blue transition-colors disabled:opacity-50 flex items-center justify-center gap-2 border-2 border-aura-foreground"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Unlocking...
              </>
            ) : (
              "Unlock & View Entry"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

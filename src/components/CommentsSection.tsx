"use client";

import { useState, useEffect } from "react";
import { Send, Trash2, Sparkles, User, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const RANDOM_ALIASES = [
  "Curious Wanderer",
  "Midnight Observer",
  "Solar Nomad",
  "Velvet Thinker",
  "Digital Pilgrim",
  "Echo Seeker",
  "Stargazing Owl",
  "Coffee Philosopher",
  "Gentle Rebel",
  "Neon Dreamer",
  "Silent Cartographer",
  "Shadow Weaver",
  "Ink & Solitude",
  "Wandering Poet",
  "Quiet Traveler"
];

function getRandomAlias() {
  const index = Math.floor(Math.random() * RANDOM_ALIASES.length);
  return RANDOM_ALIASES[index];
}

// Utility to get or create a session ID
function getSessionId() {
  if (typeof window === "undefined") return null;
  let sessionId = localStorage.getItem("authorSessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("authorSessionId", sessionId);
  }
  return sessionId;
}

export function CommentsSection({ 
  postId, 
  comments,
  isOwner = false
}: { 
  postId: string;
  comments: any[];
  isOwner?: boolean;
}) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  const handleDelete = async (commentId: string) => {
    if (!sessionId && !isOwner) return;
    
    const confirmMsg = isOwner 
      ? "Delete this comment as admin?" 
      : "Are you sure you want to delete your comment?";
      
    if (!window.confirm(confirmMsg)) return;

    setDeletingId(commentId);

    try {
      const res = await fetch(`/api/comment?commentId=${commentId}&authorSessionId=${sessionId || ""}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");
      
      // Refresh the page data
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-32 pt-20 border-t border-aura-foreground/10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <h2 className="font-serif text-4xl font-black text-aura-foreground">Notes & Additions</h2>
        {isOwner && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-aura-blue/10 text-aura-blue px-3 py-1 rounded-full border border-aura-blue/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin Moderation Active
          </span>
        )}
      </div>
      
      <div className="space-y-6">
        {comments && comments.length > 0 ? (
          comments.map((comment) => {
            const isMyComment = sessionId === comment.authorSessionId;
            const canDelete = isOwner || isMyComment;

            return (
              <div 
                key={comment._id} 
                className="bg-aura-foreground/5 p-6 border border-aura-foreground/10 group relative transition-all hover:border-aura-foreground/20 rounded-xl"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-aura-foreground/10 border border-aura-foreground/20 flex items-center justify-center text-xs font-bold text-aura-foreground">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-sm font-bold tracking-wide text-aura-foreground">
                        {comment.authorName || "Anonymous Explorer"}
                      </span>
                      {isMyComment && (
                        <span className="text-[10px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded bg-aura-blue/15 text-aura-blue">
                          You
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] font-sans font-medium opacity-40">
                    {new Date(comment._createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                </div>

                <p className="font-sans text-base leading-relaxed opacity-90 pl-9 whitespace-pre-wrap">
                  {comment.message}
                </p>

                {/* Delete Button: Available to comment author OR admin */}
                {canDelete && (
                  <button
                    onClick={() => handleDelete(comment._id)}
                    disabled={deletingId === comment._id}
                    className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:bg-red-500/10 rounded-full disabled:opacity-50 cursor-pointer"
                    title={isOwner && !isMyComment ? "Delete comment (Admin)" : "Delete your comment"}
                    aria-label="Delete comment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-aura-foreground/40 italic font-serif text-lg">No thoughts yet. Leave one below.</p>
        )}
      </div>

      <CommentForm postId={postId} sessionId={sessionId} isOwner={isOwner} />
    </div>
  );
}

function CommentForm({ 
  postId, 
  sessionId, 
  isOwner 
}: { 
  postId: string; 
  sessionId: string | null; 
  isOwner: boolean;
}) {
  const [alias, setAlias] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("authorAlias");
    if (saved) {
      setAlias(saved);
    } else if (isOwner) {
      setAlias("Izzy (Creator)");
    } else {
      const generated = getRandomAlias();
      setAlias(generated);
      try {
        localStorage.setItem("authorAlias", generated);
      } catch {}
    }
  }, [isOwner]);

  const handleShuffleAlias = () => {
    const generated = getRandomAlias();
    setAlias(generated);
    try {
      localStorage.setItem("authorAlias", generated);
    } catch {}
  };

  const handleAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAlias(val);
    try {
      localStorage.setItem("authorAlias", val);
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !sessionId) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          postId, 
          message,
          authorSessionId: sessionId,
          authorName: alias.trim() || "Anonymous Explorer"
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      setStatus("success");
      setMessage("");
      router.refresh(); // Automatically show the new comment
      
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="mt-12 bg-aura-blue/5 p-8 border border-aura-foreground/10 rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-aura-blue/10 rounded-full blur-3xl pointer-events-none" />
      
      <h3 className="font-serif text-2xl font-bold mb-4 text-aura-foreground">Add a Thought</h3>
      
      {status === "success" ? (
        <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-4 rounded-lg font-bold">
          Your comment has been added successfully.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
          {/* Persona / Alias selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Posting as:</span>
            <div className="inline-flex items-center gap-1.5 bg-aura-background border border-aura-foreground/20 rounded-lg px-3 py-1.5 text-xs font-bold">
              <input 
                type="text" 
                value={alias}
                onChange={handleAliasChange}
                placeholder="Your alias / name"
                maxLength={40}
                className="bg-transparent text-aura-foreground focus:outline-none w-36 md:w-48 text-xs font-bold"
              />
              <button
                type="button"
                onClick={handleShuffleAlias}
                title="Shuffle anonymous alias"
                className="text-aura-blue hover:text-aura-blue/80 transition-colors cursor-pointer flex items-center gap-1 pl-1 border-l border-aura-foreground/10"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">Shuffle</span>
              </button>
            </div>
            <span className="text-[11px] opacity-40 ml-1">
              (Anonymous &bull; no login needed)
            </span>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your perspective or thoughts..."
            className="w-full bg-aura-background/50 border-2 border-aura-foreground/20 rounded-xl p-4 min-h-[110px] resize-none focus:outline-none focus:border-aura-blue transition-colors placeholder:text-aura-foreground/30 font-sans"
            required
          />
          
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs font-black uppercase tracking-widest opacity-40">
              Safe & Anonymous
            </p>
            
            <button
              type="submit"
              disabled={status === "submitting" || !message.trim()}
              className="group flex items-center gap-2 bg-aura-foreground text-aura-background px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm disabled:opacity-50 hover:scale-105 transition-all cursor-pointer"
            >
              {status === "submitting" ? "Sending..." : "Submit"}
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {status === "error" && (
            <p className="text-red-500 text-sm mt-2 font-bold">Something went wrong. Could not save your note.</p>
          )}
        </form>
      )}
    </div>
  );
}


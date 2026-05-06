"use client";

import { useState, useEffect } from "react";
import { Send, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
  comments 
}: { 
  postId: string;
  comments: any[];
}) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  const handleDelete = async (commentId: string) => {
    if (!sessionId) return;
    
    // Optimistic UI update could go here, but for simplicity we'll just show loading
    setDeletingId(commentId);

    try {
      const res = await fetch(`/api/comment?commentId=${commentId}&authorSessionId=${sessionId}`, {
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
      <h2 className="font-serif text-4xl font-black mb-12 text-aura-foreground">Notes & Additions</h2>
      
      <div className="space-y-8">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="bg-aura-foreground/5 p-6 border border-aura-foreground/10 group relative">
              <p className="font-sans text-lg mb-4 opacity-90">{comment.message}</p>
              <div className="flex justify-between items-center opacity-40">
                <span className="text-xs font-black uppercase tracking-widest">Reader</span>
                <span className="text-xs font-black uppercase tracking-widest">
                  {new Date(comment._createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Delete Button for Owner */}
              {sessionId === comment.authorSessionId && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  disabled={deletingId === comment._id}
                  className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:bg-red-500/10 rounded-full disabled:opacity-50"
                  aria-label="Delete comment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-aura-foreground/40 italic font-serif text-lg">No thoughts yet. Leave one below.</p>
        )}
      </div>

      <CommentForm postId={postId} sessionId={sessionId} />
    </div>
  );
}

// Inline CommentForm since they are tightly coupled now
function CommentForm({ postId, sessionId }: { postId: string, sessionId: string | null }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const router = useRouter();

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
          authorSessionId: sessionId
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
      
      <h3 className="font-serif text-2xl font-bold mb-6 text-aura-foreground">Add a Thought</h3>
      
      {status === "success" ? (
        <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-4 rounded-lg font-bold">
          Your comment has been added successfully.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your perspective..."
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
            <p className="text-red-500 text-sm mt-2 font-bold">Something went wrong. Could not save your note.</p>
          )}
        </form>
      )}
    </div>
  );
}

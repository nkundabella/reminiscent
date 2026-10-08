// src/app/blog/page.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Edit3, Lock, Unlock, KeyRound, X, Loader2, ShieldCheck } from "lucide-react";
import { client } from "@/sanity/client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Post {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImageUrl?: string;
  tags?: string[];
  isPrivate?: boolean;
}

const PUBLIC_POSTS_QUERY = `*[_type == "post" && isPrivate != true] | order(publishedAt desc) {
  _id,
  _updatedAt,
  title,
  slug,
  publishedAt,
  "mainImageUrl": mainImage.asset->url,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..150], "") + "...",
  tags,
  isPrivate
}`;

const ALL_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  _updatedAt,
  title,
  slug,
  publishedAt,
  "mainImageUrl": mainImage.asset->url,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..150], "") + "...",
  tags,
  isPrivate
}`;

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [privacyFilter, setPrivacyFilter] = useState<'all' | 'public' | 'private'>('all');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Author authentication state
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check initial owner status from server cookie
  useEffect(() => {
    fetch("/api/auth/unlock")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsOwner(true);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch posts whenever owner status changes
  useEffect(() => {
    const query = isOwner ? ALL_POSTS_QUERY : PUBLIC_POSTS_QUERY;
    client.fetch<Post[]>(query).then(setAllPosts);
  }, [isOwner]);

  // Derive list of unique tags for filter UI
  const tags = Array.from(new Set(allPosts.flatMap((p) => p.tags ?? [])));

  // Apply tag and privacy filters
  const filteredPosts = allPosts.filter((p) => {
    if (filterTag && !p.tags?.includes(filterTag)) return false;
    if (isOwner) {
      if (privacyFilter === 'public' && p.isPrivate) return false;
      if (privacyFilter === 'private' && !p.isPrivate) return false;
    }
    return true;
  });

  // Slice for infinite scroll
  const displayedPosts = filteredPosts.slice(0, visibleCount);

  // Load more when scrolling near bottom
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setVisibleCount((prev) => Math.min(prev + 6, filteredPosts.length));
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [filteredPosts]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/auth/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsOwner(true);
        setShowAuthModal(false);
        setPasscode("");
      } else {
        setAuthError(data.message || "Incorrect passcode");
      }
    } catch {
      setAuthError("Failed to authenticate. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLock = async () => {
    try {
      await fetch("/api/auth/unlock", { method: "DELETE" });
      setIsOwner(false);
      setPrivacyFilter('all');
    } catch {}
  };

  return (
    <main className="min-h-screen pt-40 pb-20 px-8 relative overflow-hidden bg-aura-background">
      <div className="max-w-4xl mx-auto relative">
        <h1 className="font-serif text-[8rem] md:text-[12rem] font-bold text-aura-foreground/5 absolute -top-60 -left-10 pointer-events-none select-none uppercase tracking-tighter z-0">
          Archive
        </h1>

        {/* Top Controls: Owner Mode Status + Filters */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-aura-foreground/10">
          {/* Owner Mode Toggle / Status */}
          <div className="flex items-center gap-3">
            {isOwner ? (
              <div className="flex items-center gap-2 bg-aura-blue/10 border border-aura-blue px-3.5 py-1.5 rounded-full text-xs font-bold text-aura-blue">
                <ShieldCheck className="w-4 h-4 text-aura-blue" />
                <span>Owner Mode Active (Viewing All)</span>
                <button
                  onClick={handleLock}
                  className="ml-2 underline text-[11px] opacity-70 hover:opacity-100 flex items-center gap-1 cursor-pointer"
                  title="Lock Private Entries"
                >
                  <Lock className="w-3 h-3" /> Lock
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-aura-foreground/60 border border-aura-foreground/20 hover:text-aura-blue hover:border-aura-blue transition-colors cursor-pointer"
                title="Unlock private entries"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Author Access</span>
              </button>
            )}
          </div>

          {/* Privacy filter tabs for owner */}
          {isOwner && (
            <div className="flex items-center gap-1 bg-aura-foreground/5 p-1 rounded-full text-xs font-medium">
              <button
                onClick={() => setPrivacyFilter('all')}
                className={`px-3 py-1 rounded-full transition-all ${privacyFilter === 'all' ? 'bg-aura-foreground text-aura-background font-bold' : 'text-aura-foreground/60'}`}
              >
                All
              </button>
              <button
                onClick={() => setPrivacyFilter('public')}
                className={`px-3 py-1 rounded-full transition-all ${privacyFilter === 'public' ? 'bg-aura-foreground text-aura-background font-bold' : 'text-aura-foreground/60'}`}
              >
                Public Only
              </button>
              <button
                onClick={() => setPrivacyFilter('private')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${privacyFilter === 'private' ? 'bg-amber-600 text-cream font-bold' : 'text-amber-600'}`}
              >
                <Lock className="w-3 h-3" /> Private Only
              </button>
            </div>
          )}
        </div>

        {/* Tag Cloud */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 relative z-10">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag === filterTag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  tag === filterTag
                    ? 'bg-aura-blue text-cream'
                    : 'bg-cream text-aura-blue border border-aura-blue hover:bg-aura-blue/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Winding Timeline SVG Path - static */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-full pointer-events-none z-0 overflow-visible hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
            <path
              d="M50,0 C80,100 20,200 50,300 C80,400 20,500 50,600 C80,700 20,800 50,900 C80,1000 20,1100 50,1200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="10 10"
              className="text-aura-foreground opacity-20"
            />
          </svg>
        </div>

        <div className="relative z-10 space-y-32 flex flex-col items-center mt-36">
          {displayedPosts.map((post, index) => (
            <div
              key={post._id}
              className={`w-full max-w-lg ${index % 2 === 0 ? "md:self-start md:ml-[5%]" : "md:self-end md:mr-[5%]"}`}
            >
              <motion.div
                whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02, boxShadow: "0px 12px 20px rgba(0,0,0,0.2)" }}
                className="relative group"
              >
                <Link href={`/blog/${post.slug.current}`} className="block">
                  <div
                    className={`bg-aura-background border-2 border-aura-foreground shadow-[8px_8px_0px_var(--aura-foreground)] group-hover:shadow-[12px_12px_0px_var(--aura-blue)] transition-all duration-300 relative flex flex-col ${
                      post.isPrivate ? "border-amber-600/70" : ""
                    }`}
                  >
                    {post.mainImageUrl && (
                      <div className="w-full h-64 md:h-72 relative border-b-2 border-aura-foreground overflow-hidden">
                        <Image
                          src={post.mainImageUrl}
                          alt={post.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-sans text-xs font-black tracking-widest text-aura-blue uppercase">
                            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>

                          {/* Private Post Badge */}
                          {post.isPrivate && (
                            <span className="font-sans text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 border border-amber-500/40 flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> private
                            </span>
                          )}

                          {new Date(post._updatedAt).getTime() - new Date(post.publishedAt).getTime() > 5 * 60 * 1000 && (
                            <span className="font-sans text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded-sm bg-aura-foreground/10 text-aura-foreground/40 border border-aura-foreground/10">
                              edited
                            </span>
                          )}

                          {/* New badge */}
                          {new Date(post.publishedAt).getTime() > Date.now() - 48 * 60 * 60 * 1000 && (
                            <span className="animate-pulse bg-aura-blue text-cream px-2 py-0.5 rounded-full text-xs">
                              new
                            </span>
                          )}
                        </div>
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                      <h2 className="font-serif text-4xl font-bold mb-4 leading-tight group-hover:text-aura-blue transition-colors">
                        {post.title}
                      </h2>
                      <p className="font-sans text-lg text-aura-foreground/70 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Edit button for dev mode */}
                <Link
                  href={`/studio/intent/edit/id=${post._id};type=post`}
                  className="absolute -top-4 -right-4 bg-aura-dark text-aura-cream p-2 rounded-full border border-aura-foreground/20 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-20 shadow-xl"
                  title="Edit in Studio"
                >
                  <Edit3 className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          ))}

          {/* Empty state when no posts match filter */}
          {displayedPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-serif text-2xl italic opacity-50">
                {privacyFilter === 'private'
                  ? "No private posts found."
                  : "No posts match the selected filter..."}
              </p>
              <Link href="/studio" className="text-aura-blue underline mt-4 block">
                Go to Studio to add or manage posts
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Author Unlock Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-sm bg-aura-background border-2 border-aura-foreground shadow-[10px_10px_0px_var(--aura-foreground)] p-6 relative"
            >
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  setAuthError(null);
                }}
                className="absolute top-4 right-4 text-aura-foreground/60 hover:text-aura-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-aura-blue/10 border border-aura-blue flex items-center justify-center text-aura-blue">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-aura-foreground">Author Access</h3>
                  <p className="text-xs text-aura-foreground/60">Unlock your private blog entries</p>
                </div>
              </div>

              <form onSubmit={handleUnlock} className="space-y-4 mt-6">
                <div>
                  <input
                    type="password"
                    placeholder="Enter author passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    autoFocus
                    className="w-full bg-aura-background border-2 border-aura-foreground px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-aura-blue transition-colors text-aura-foreground placeholder:text-aura-foreground/40"
                  />
                  {authError && (
                    <p className="text-red-500 text-xs font-bold mt-2">
                      {authError}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAuthModal(false);
                      setAuthError(null);
                    }}
                    className="flex-1 py-2.5 border-2 border-aura-foreground/30 text-xs font-bold uppercase tracking-wider hover:border-aura-foreground transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !passcode.trim()}
                    className="flex-1 py-2.5 bg-aura-foreground text-aura-background text-xs font-bold uppercase tracking-wider hover:bg-aura-blue transition-colors disabled:opacity-50 flex items-center justify-center gap-2 border-2 border-aura-foreground"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Unlocking...
                      </>
                    ) : (
                      "Unlock"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

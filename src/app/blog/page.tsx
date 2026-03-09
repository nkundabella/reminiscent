"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
}

const posts: Post[] = [
  {
    title: "The Art of Creative Chaos",
    slug: "creative-chaos",
    publishedAt: "2024-03-08",
    excerpt: "Embracing the mess to find the magic in digital design.",
  },
  {
    title: "Vivid Expressions in Code",
    slug: "vivid-expressions",
    publishedAt: "2024-03-05",
    excerpt: "How I use Framer Motion to bring my static layouts to life.",
  },
  {
    title: "Scrapbooking the Future",
    slug: "scrapbooking-future",
    publishedAt: "2024-03-01",
    excerpt: "Why the editorial aesthetic is making a comeback in web design.",
  },
  {
    title: "The Quietness of Midnight",
    slug: "quiet-midnight",
    publishedAt: "2024-02-15",
    excerpt: "Reflecting on late-night sessions and the flow of creativity.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-40 pb-20 px-8 relative overflow-hidden bg-aura-background">
      <div className="max-w-4xl mx-auto relative">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-serif text-7xl md:text-9xl font-bold mb-20 text-aura-foreground/10 absolute -top-10 -left-10 pointer-events-none select-none uppercase tracking-tighter"
        >
          Archive
        </motion.h1>

        {/* Winding Timeline SVG Path */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-full pointer-events-none z-0 overflow-visible hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M50,0 C80,100 20,200 50,300 C80,400 20,500 50,600 C80,700 20,800 50,900 C80,1000 20,1100 50,1200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="10 10"
              className="text-aura-foreground"
            />
          </svg>
        </div>

        {/* Blog Posts List */}
        <div className="relative z-10 space-y-32 flex flex-col items-center">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`w-full max-w-lg ${
                index % 2 === 0 ? "md:self-start md:ml-[5%]" : "md:self-end md:mr-[5%]"
              }`}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="bg-aura-background border-2 border-aura-foreground p-8 shadow-[8px_8px_0px_var(--aura-foreground)] group-hover:shadow-[12px_12px_0px_var(--aura-blue)] transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-sans text-xs font-black tracking-widest text-aura-blue uppercase">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h2 className="font-serif text-4xl font-bold mb-4 leading-tight group-hover:text-aura-blue transition-colors">
                    {post.title}
                  </h2>
                  <p className="font-sans text-lg text-aura-foreground/70 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

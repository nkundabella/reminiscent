"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/client";

export default function Home() {
  const [polaroids, setPolaroids] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...4] {
        _id,
        title,
        slug,
        publishedAt,
        "image": mainImage.asset->url
      }`);

      const layouts = [
        { rotate: -4, x: -20, y: 10 },
        { rotate: 3, x: 10, y: -10 },
        { rotate: -2, x: 30, y: 20 },
        { rotate: 5, x: -10, y: -20 },
      ];

      const mappedPosts = posts.map((post: any, i: number) => ({
        id: post._id,
        title: post.title,
        slug: post.slug.current,
        date: new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        image: post.image || "https://images.unsplash.com/photo-1518998053401-a41c1eb9133b?w=800&q=80",
        ...layouts[i % layouts.length]
      }));

      setPolaroids(mappedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col bg-aura-cream font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center pt-32 pb-40 px-8 z-20 bg-aura-cream overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none mix-blend-overlay z-10" />
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 pointer-events-none z-0"
             style={{
               backgroundImage: `linear-gradient(to right, rgba(30, 30, 36, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 30, 36, 0.03) 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
             }}
        />

        {/* Floating Blurred Blobs */}
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -50, 30, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[15%] w-[400px] h-[400px] bg-aura-blue/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply translate-z-0"
        />
        <motion.div
          animate={{ x: [0, -40, 30, 0], y: [0, 40, -40, 0], scale: [1, 0.85, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-aura-blue/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply translate-z-0"
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 max-w-4xl w-full mx-auto text-center flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-8"
          >
            <Sparkles className="w-8 h-8 text-aura-blue/60 animate-pulse" />
          </motion.div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] leading-[1.05] text-aura-dark font-medium tracking-tight text-balance">
            The art of <br/>
            <span className="italic text-aura-blue font-light pr-2">noticing</span>
            everything.
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="font-sans text-lg md:text-xl text-aura-dark/60 max-w-lg text-balance mt-8 leading-relaxed font-light"
          >
            A curated digital archive of thoughts, reflections, and fragments worth keeping.
          </motion.p>
        </motion.div>
        
        {/* Organic Divider 1 (Wave) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px] z-20">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" shapeRendering="geometricPrecision">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.42,126.38,200.71,114.49,240.89,107.72,281.33,85.61,321.39,56.44Z" fill="#f0eae0"></path>
          </svg>
        </div>
      </section>

      {/* 2. ABOUT THE BLOG */}
      <section className="relative w-full py-20 px-8 bg-[#f0eae0] z-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-aura-dark/30"></span>
              <span className="text-sm font-medium tracking-widest uppercase text-aura-dark/60">Introduction</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-aura-dark leading-tight">
              Capturing the <span className="italic text-aura-blue">ephemeral</span> moments of daily life.
            </h2>
            <p className="text-aura-dark/70 text-lg leading-relaxed max-w-md">
              This space serves as a living document. A place where structured ideas meet chaotic inspiration. It’s not about having it all figured out, but rather documenting the journey of trying to.
            </p>
          </div>
          <div className="flex-1 relative">
             <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700 border-4 border-[#faf8f5]/50">
               <div className="absolute inset-0 bg-gradient-to-br from-aura-blue/20 to-aura-blue/5 mix-blend-multiply z-10" />
               <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80" alt="Abstract mood" className="w-full h-full object-cover grayscale opacity-90 mix-blend-luminosity" />
             </div>
             {/* Decorative star */}
             <Star className="absolute -top-6 -right-6 w-12 h-12 text-aura-blue fill-aura-blue/20 animate-[spin_10s_linear_infinite]" />
          </div>
        </div>
      </section>

      {/* Organic Divider 2 */}
      <div className="relative w-full bg-[#e6ddcf] z-20 transform -translate-y-[1px]">
         <svg className="block w-full h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" shapeRendering="geometricPrecision">
            <path fill="#f0eae0" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,165.3C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
         </svg>
      </div>

      {/* 3. POLAROID FEATURED SECTION */}
      <section className="relative w-full py-24 px-4 overflow-hidden bg-[#e6ddcf] z-10 flex flex-col items-center">
        <div className="text-center mb-24 z-20 relative">
          <h2 className="font-serif text-5xl md:text-6xl text-aura-dark mb-4">Fragments</h2>
          <p className="text-aura-dark/60 text-lg uppercase tracking-widest text-sm font-medium">Selected thoughts from the archive</p>
        </div>

        <div className="relative w-full max-w-7xl min-h-[500px] flex flex-wrap justify-center items-center gap-8 md:gap-12 z-20 px-4">
          {polaroids.map((item) => (
            <Link key={item.id} href={`/blog/${item.slug}`} className="block">
              <motion.div
                initial={{ rotate: item.rotate, y: item.y, x: item.x }}
                whileHover={{ 
                  rotate: 0, 
                  scale: 1.05, 
                  y: item.y - 15,
                  zIndex: 30,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="relative bg-[#faf8f5] p-3 pb-14 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.25)] border border-black/5 cursor-pointer w-[260px] md:w-[280px] shrink-0"
              >
                <div className="relative w-full aspect-square bg-gray-200 overflow-hidden rounded-sm">
                  <div className="absolute inset-0 bg-aura-blue/10 mix-blend-overlay z-10" />
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale-[30%]" />
                </div>
                <div className="absolute bottom-4 left-0 w-full text-center px-4 flex flex-col items-center justify-center">
                  <p className="font-serif italic text-xl text-aura-dark leading-tight">{item.title}</p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-aura-dark/40 mt-2">{item.date}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Organic Divider 3 (Into the Dark) */}
      <div className="relative w-full bg-aura-dark z-20 transform -translate-y-[1px]">
         <svg className="block w-full h-[80px] md:h-[150px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" shapeRendering="geometricPrecision">
            <path fill="#e6ddcf" fillOpacity="1" d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
         </svg>
      </div>

      {/* 4. ARCHIVE PREVIEW */}
      <section className="relative w-full py-32 px-8 bg-aura-dark text-aura-cream z-20 flex flex-col items-center min-h-[60vh] justify-center">
        {/* Noise overlay for dark section */}
        <div className="absolute inset-0 noise-overlay opacity-10 pointer-events-none mix-blend-overlay" />
        
        <div className="max-w-4xl w-full text-center flex flex-col items-center space-y-10 z-10">
          <h2 className="font-serif text-5xl md:text-7xl leading-tight">
            Dive into the <span className="italic text-aura-blue">complete</span> collection.
          </h2>
          <p className="text-aura-cream/60 text-lg md:text-xl max-w-xl font-light">
            Years of documentation, experiments, and journal entries. Organized by date and theme.
          </p>

          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#fbf8f1", color: "#1e1e24" }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 border border-aura-cream/30 text-aura-cream rounded-full overflow-hidden transition-all duration-300 flex items-center gap-3 font-sans text-sm tracking-widest uppercase mt-8 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]"
            >
              Explore the archive 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Edit3 } from "lucide-react";
import { client } from "@/sanity/client";

interface Post {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImageUrl?: string;
}

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  _updatedAt,
  title,
  slug,
  publishedAt,
  "mainImageUrl": mainImage.asset->url,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..150], "") + "..."
}`;

export default async function BlogPage() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY);

  return (
    <main className="min-h-screen pt-40 pb-20 px-8 relative overflow-hidden bg-aura-background">
      <div className="max-w-4xl mx-auto relative">
        <h1 className="font-serif text-[8rem] md:text-[12rem] font-bold text-aura-foreground/5 absolute -top-60 -left-10 pointer-events-none select-none uppercase tracking-tighter z-0">
          Archive
        </h1>

        {/* Winding Timeline SVG Path - Keep static or move to client if needed */}
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

        
        <div className="relative z-10 space-y-32 flex flex-col items-center mt-48">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className={`w-full max-w-lg ${
                index % 2 === 0 ? "md:self-start md:ml-[5%]" : "md:self-end md:mr-[5%]"
              }`}
            >
              <div className="relative group">
                <Link href={`/blog/${post.slug.current}`} className="block">
                  <div className="bg-aura-background border-2 border-aura-foreground shadow-[8px_8px_0px_var(--aura-foreground)] group-hover:shadow-[12px_12px_0px_var(--aura-blue)] transition-all duration-300 relative flex flex-col">
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
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-xs font-black tracking-widest text-aura-blue uppercase">
                            {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          {/* Show "edited" if _updatedAt is more than 5 minutes after publishedAt */}
                          {(new Date(post._updatedAt).getTime() - new Date(post.publishedAt).getTime() > 5 * 60 * 1000) && (
                            <span className="font-sans text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded-sm bg-aura-foreground/10 text-aura-foreground/40 border border-aura-foreground/10">
                              edited
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
                
                {/* IZ Edit Button - Only visible in Dev/Izzy mode */}
                <Link 
                  href={`/studio/intent/edit/id=${post._id};type=post`}
                  className="absolute -top-4 -right-4 bg-aura-dark text-aura-cream p-2 rounded-full border border-aura-foreground/20 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-20 shadow-xl"
                  title="Edit in Studio"
                >
                  <Edit3 className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-serif text-2xl italic opacity-50">The archive is currently empty...</p>
              <Link href="/studio" className="text-aura-blue underline mt-4 block">Go to Studio to add a post</Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

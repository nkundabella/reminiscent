import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft, Edit3, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { CommentForm } from "@/components/CommentForm";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface Post {
  _id: string;
  title: string;
  publishedAt: string;
  body: any[];
  mainImage?: {
    asset: {
      metadata: {
        dimensions: {
          aspectRatio: number;
          width: number;
          height: number;
        };
      };
    };
  };
  comments?: {
    _id: string;
    message: string;
    _createdAt: string;
  }[];
  similarPosts?: {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    mainImage?: any;
  }[];
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  publishedAt,
  body,
  mainImage {
    ...,
    asset->{
      ...,
      metadata {
        dimensions
      }
    }
  },
  "comments": *[_type == "comment" && post._ref == ^._id && approved == true] | order(_createdAt asc) {
    _id,
    message,
    _createdAt
  },
  "similarPosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      ...,
      asset->{
        ...,
        metadata {
          dimensions
        }
      }
    }
  }
}`;

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = await client.fetch<Post>(POST_QUERY, { slug });

  if (!post) {
    notFound();
  }

  const components = {
    block: {
      h1: ({ children }: any) => <h1 className="text-4xl font-serif font-black mt-12 mb-6">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-3xl font-serif font-bold mt-10 mb-5">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-serif font-bold mt-8 mb-4">{children}</h3>,
      normal: ({ children }: any) => <p className="text-lg leading-relaxed mb-6 opacity-80">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-aura-blue pl-6 py-2 my-8 italic text-xl opacity-90 bg-aura-blue/5">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 opacity-80">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 opacity-80">{children}</ol>,
    },
  };

  const isPortrait = post.mainImage?.asset?.metadata?.dimensions?.aspectRatio && post.mainImage.asset.metadata.dimensions.aspectRatio < 1;

  return (
    <main className="min-h-screen pt-40 pb-20 px-8 relative bg-aura-background">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-aura-blue/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="group flex items-center gap-2 text-aura-foreground/50 hover:text-aura-blue transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-sans font-black uppercase tracking-widest text-xs">Back to Archive</span>
        </Link>

        {isPortrait ? (
          <div className="relative">
            {/* Portrait Layout: Floating Image with words on the right */}
            <div className="mb-8">
              <Link 
                href={`/studio/intent/edit/id=${post._id};type=post`}
                className="inline-flex items-center gap-2 bg-aura-dark text-aura-cream px-6 py-3 rounded-full border border-aura-foreground/20 hover:scale-105 transition-all shadow-xl font-bold text-sm mb-12"
              >
                <Edit3 className="w-4 h-4" /> EDIT THIS POST
              </Link>
            </div>

            <div className="flow-root">
              <div className="md:float-left md:mr-12 mb-8 w-full md:w-[45%] relative aspect-[3/4] shadow-2xl overflow-hidden border-2 border-aura-foreground/10">
                <Image
                  src={urlFor(post.mainImage).width(800).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* metadata and title wrapped */}
              <div className="flex items-center gap-6 mb-6 opacity-60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <div className="h-1 w-1 rounded-full bg-aura-foreground/20" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">5 min read</span>
                </div>
              </div>

              <h1 className="font-serif text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-8 text-aura-foreground">
                {post.title}
              </h1>

              <article className="prose prose-lg max-w-none text-aura-foreground font-sans">
                <PortableText value={post.body} components={components} />
              </article>
            </div>
          </div>
        ) : (
          <>
            {/* Standard Landscape Layout */}
            <header className="mb-16 relative">
              <div className="flex items-center gap-6 mb-6 opacity-60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <div className="h-1 w-1 rounded-full bg-aura-foreground/20" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">5 min read</span>
                </div>
              </div>
              
              <h1 className="font-serif text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 text-aura-foreground">
                {post.title}
              </h1>

              {/* Edit Button for the post */}
              <Link 
                href={`/studio/intent/edit/id=${post._id};type=post`}
                className="inline-flex items-center gap-2 bg-aura-dark text-aura-cream px-6 py-3 rounded-full border border-aura-foreground/20 hover:scale-105 transition-all shadow-xl font-bold text-sm mb-12"
              >
                <Edit3 className="w-4 h-4" /> EDIT THIS POST
              </Link>

              {post.mainImage && (
                <div className="relative w-full aspect-[16/9] mb-16 shadow-2xl overflow-hidden border-2 border-aura-foreground/10">
                  <Image
                    src={urlFor(post.mainImage).width(1200).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </header>

            <article className="prose prose-lg max-w-none text-aura-foreground font-sans">
              <PortableText value={post.body} components={components} />
            </article>
          </>
        )}

        {/* Footer separator */}
        <div className="mt-20 pt-10 border-t border-aura-foreground/10 flex flex-col items-center gap-6">
           <p className="font-serif italic text-xl opacity-40">End of Entry.</p>
           <Link 
            href="/blog" 
            className="group flex items-center gap-2 text-aura-blue font-bold px-8 py-4 border-2 border-aura-blue shadow-[6px_6px_0px_var(--aura-blue)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
           >
             Return to the Archive
           </Link>
        </div>

        {/* Similar Posts Section */}
        {post.similarPosts && post.similarPosts.length > 0 && (
          <div className="mt-32">
            <h2 className="font-serif text-4xl font-black mb-12 text-aura-foreground text-center">Similar Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {post.similarPosts.map((similarPost) => (
                <Link key={similarPost._id} href={`/blog/${similarPost.slug.current}`} className="group block">
                  <div className="relative aspect-[4/3] mb-4 overflow-hidden border border-aura-foreground/10">
                    {similarPost.mainImage ? (
                      <Image
                        src={urlFor(similarPost.mainImage).width(600).url()}
                        alt={similarPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-aura-foreground/5" />
                    )}
                  </div>
                  <h3 className="font-serif text-2xl font-bold group-hover:text-aura-blue transition-colors line-clamp-2">
                    {similarPost.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 opacity-50">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {new Date(similarPost.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-32 pt-20 border-t border-aura-foreground/10">
          <h2 className="font-serif text-4xl font-black mb-12 text-aura-foreground">The Void Speaks</h2>
          
          <div className="space-y-8">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment._id} className="bg-aura-foreground/5 p-6 border border-aura-foreground/10">
                  <p className="font-sans text-lg mb-4 opacity-90">{comment.message}</p>
                  <div className="flex justify-between items-center opacity-40">
                    <span className="text-xs font-black uppercase tracking-widest">Anonymous Entity</span>
                    <span className="text-xs font-black uppercase tracking-widest">
                      {new Date(comment._createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-aura-foreground/40 italic font-serif text-lg">It's quiet in the void... Be the first to speak.</p>
            )}
          </div>

          <CommentForm postId={post._id} />
        </div>
      </div>
    </main>
  );
}

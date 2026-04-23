import { client } from "@/sanity/client";
import { StreakTracker } from "@/components/StreakTracker";
import { Activity } from "lucide-react";

export const revalidate = 60; // revalidate every minute

async function getActivityData() {
  const query = `*[_type == "post"] { publishedAt }`;
  const posts = await client.fetch<{ publishedAt: string }[]>(query);
  return posts.map(p => p.publishedAt);
}

export default async function PulsePage() {
  const publishedDates = await getActivityData();

  return (
    <main className="min-h-screen pt-40 pb-20 px-8 relative overflow-hidden bg-essence-background z-10">
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-essence-pink/10 rounded-2xl border border-essence-pink/20">
              <Activity className="w-8 h-8 text-essence-pink" />
            </div>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-essence-foreground tracking-tighter">
              Pulse.
            </h1>
          </div>
          <p className="font-sans text-xl text-essence-foreground/70 max-w-2xl">
            A high-accuracy heatmap of creative output and digital footprints left in the archive.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="w-full">
          <StreakTracker publishedDates={publishedDates} />
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-essence-blue/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-essence-blue/5 rounded-full blur-[100px] pointer-events-none" />
    </main>
  );
}

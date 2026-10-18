import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const isOwner = cookieStore.get("alter_ego_owner")?.value === "authenticated";
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");

    if (limit) {
      const num = parseInt(limit, 10) || 4;
      const query = `*[_type == "post" && isPrivate != true] | order(publishedAt desc)[0...${num}] {
        _id,
        title,
        slug,
        publishedAt,
        polaroidCaption,
        "image": mainImage.asset->url
      }`;
      const posts = await client.fetch(query);
      return NextResponse.json({ posts });
    }

    const query = isOwner
      ? `*[_type == "post"] | order(publishedAt desc) {
          _id,
          _updatedAt,
          title,
          slug,
          publishedAt,
          "mainImageUrl": mainImage.asset->url,
          "excerpt": array::join(string::split((pt::text(body)), "")[0..150], "") + "...",
          tags,
          isPrivate
        }`
      : `*[_type == "post" && isPrivate != true] | order(publishedAt desc) {
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

    const posts = await client.fetch(query);
    return NextResponse.json({ posts, isOwner });
  } catch (error: any) {
    console.error("Error fetching posts from Sanity API, loading local fallback:", error?.message || error);

    // Fallback to local backup if Sanity is down or unreachable
    try {
      const backupPath = path.join(process.cwd(), "sanity-posts-backup.json");
      if (fs.existsSync(backupPath)) {
        const fileData = JSON.parse(fs.readFileSync(backupPath, "utf8"));
        const rawPosts = fileData.posts || [];
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit");

        if (limit) {
          const num = parseInt(limit, 10) || 4;
          const mapped = rawPosts
            .filter((p: any) => !p.isPrivate)
            .slice(0, num)
            .map((p: any) => ({
              _id: p._id,
              title: p.title,
              slug: p.slug,
              publishedAt: p.publishedAt,
              polaroidCaption: p.polaroidCaption,
              image: p.mainImage?.asset?.url || null,
            }));
          return NextResponse.json({ posts: mapped, fallback: true });
        }

        const mapped = rawPosts.map((p: any) => ({
          _id: p._id,
          _updatedAt: p._updatedAt,
          title: p.title,
          slug: p.slug,
          publishedAt: p.publishedAt,
          mainImageUrl: p.mainImage?.asset?.url || null,
          excerpt: p.body ? "Archived excerpt from local backup..." : "",
          tags: p.tags || [],
          isPrivate: p.isPrivate || false,
        }));
        return NextResponse.json({ posts: mapped, fallback: true });
      }
    } catch (fallbackError) {
      console.error("Local backup fallback also failed:", fallbackError);
    }

    return NextResponse.json({ posts: [], error: "Failed to fetch posts" }, { status: 500 });
  }
}

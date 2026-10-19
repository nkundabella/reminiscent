import { client } from "@/sanity/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const writeClient = client.withConfig({
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { postId, message, authorSessionId, authorName } = await req.json();

    if (!postId || !message || !authorSessionId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const cleanAuthorName =
      authorName && typeof authorName === "string" && authorName.trim().length > 0
        ? authorName.trim().slice(0, 50)
        : "Anonymous Explorer";

    const result = await writeClient.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: postId,
      },
      authorName: cleanAuthorName,
      message: message.trim(),
      authorSessionId,
      approved: true, // Auto-approved for frictionless reader engagement
    });

    return NextResponse.json({ message: "Comment created", result }, { status: 200 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ message: "Could not submit comment" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("commentId");
    const authorSessionId = searchParams.get("authorSessionId");

    if (!commentId) {
      return NextResponse.json({ message: "Missing commentId" }, { status: 400 });
    }

    // Check if the current requester is the site owner / admin
    const cookieStore = await cookies();
    const isOwner = cookieStore.get("alter_ego_owner")?.value === "authenticated";

    // Verify comment exists
    const comment = await client.fetch(`*[_type == "comment" && _id == $commentId][0]`, { commentId });

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    // Owner can delete ANY comment. Anonymous readers can only delete their own.
    if (!isOwner && comment.authorSessionId !== authorSessionId) {
      return NextResponse.json({ message: "Unauthorized to delete this comment" }, { status: 403 });
    }

    // Delete comment
    await writeClient.delete(commentId);

    return NextResponse.json({ message: "Comment deleted", byOwner: isOwner }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ message: "Could not delete comment" }, { status: 500 });
  }
}


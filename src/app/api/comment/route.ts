import { client } from "@/sanity/client";
import { NextResponse } from "next/server";

const writeClient = client.withConfig({
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { postId, message, authorSessionId } = await req.json();

    if (!postId || !message || !authorSessionId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const result = await writeClient.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: postId,
      },
      message,
      authorSessionId,
      approved: true, // We will approve by default based on the schema and simplified flow
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

    if (!commentId || !authorSessionId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Verify ownership
    const comment = await client.fetch(`*[_type == "comment" && _id == $commentId][0]`, { commentId });

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    if (comment.authorSessionId !== authorSessionId) {
      return NextResponse.json({ message: "Unauthorized to delete this comment" }, { status: 403 });
    }

    // Delete comment
    await writeClient.delete(commentId);

    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ message: "Could not delete comment" }, { status: 500 });
  }
}

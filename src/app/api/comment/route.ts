import { client } from "@/sanity/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId, message } = await req.json();

    if (!postId || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // We use the existing client. Since this is an anonymous comment
    // and if the default client doesn't have a token, we might need a write token.
    // Let's create a client with token specifically for writing if available.
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_TOKEN,
    });

    const result = await writeClient.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: postId,
      },
      message,
      approved: true, // We will approve by default based on the schema and simplified flow
    });

    return NextResponse.json({ message: "Comment created", result }, { status: 200 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ message: "Could not submit comment" }, { status: 500 });
  }
}

import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing post ID." }, { status: 400 });
    }

    // Define file paths
    const postsPath = path.join(process.cwd(), "data", "posts.json");

    // Read and parse posts
    const postsData = await fs.readFile(postsPath, "utf8");
    const posts = postsData ? JSON.parse(postsData) : [];

    // Find post by ID
    const postIndex = posts.findIndex((p: any) => p.id === id);

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    // Remove post
    const [deletedPost] = posts.splice(postIndex, 1);

    // Write updated list back to file
    await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));

    return NextResponse.json({
      success: true,
      message: `Post '${deletedPost.title}' deleted successfully.`,
    });
  } catch (error) {
    console.error("Delete API error:", error);
    return NextResponse.json(
      { error: "Failed to delete post." },
      { status: 500 }
    );
  }
}

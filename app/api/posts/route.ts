import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), "data", "posts.json");

    // Check if file exists
    let posts = [];
    try {
      const fileData = await fs.readFile(dataPath, "utf8");
      posts = JSON.parse(fileData || "[]");
    } catch (err) {
      console.warn("No posts.json found, creating one...");
      posts = [];
    }

    // Return all approved posts
    const approvedPosts = posts.filter((post) => post.approved);

    return NextResponse.json(approvedPosts, { status: 200 });
  } catch (error) {
    console.error("❌ Error reading posts:", error);
    return NextResponse.json(
      { error: "Failed to load posts." },
      { status: 500 }
    );
  }
}

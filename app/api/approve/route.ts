import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing story ID." },
        { status: 400 }
      );
    }

    // Define file paths
    const submissionsPath = path.join(process.cwd(), "data", "submissions.json");
    const postsPath = path.join(process.cwd(), "data", "posts.json");

    // Read existing submissions and posts
    const submissionsData = await fs.readFile(submissionsPath, "utf8");
    const postsData = await fs.readFile(postsPath, "utf8").catch(() => "[]");

    const submissions = submissionsData ? JSON.parse(submissionsData) : [];
    const posts = postsData ? JSON.parse(postsData) : [];

    // Find the story by ID
    const storyIndex = submissions.findIndex((s: any) => s.id === id);

    if (storyIndex === -1) {
      return NextResponse.json(
        { error: "Story not found in submissions." },
        { status: 404 }
      );
    }

    const story = submissions[storyIndex];

    // Validate story fields
    if (!story.title || !story.author || !story.content) {
      return NextResponse.json(
        { error: "Missing story fields (title, author, or content)." },
        { status: 400 }
      );
    }

    // Approve story and move it to posts.json
    const approvedStory = {
      ...story,
      approved: true,
      dateApproved: new Date().toISOString(),
    };

    posts.push(approvedStory);
    submissions.splice(storyIndex, 1);

    // Save updated files
    await fs.writeFile(submissionsPath, JSON.stringify(submissions, null, 2));
    await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));

    return NextResponse.json({
      success: true,
      message: "Story approved and published!",
      approvedStory,
    });
  } catch (error) {
    console.error("Approve API error:", error);
    return NextResponse.json(
      { error: "Failed to approve story." },
      { status: 500 }
    );
  }
}

import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, author, content, image } = await req.json();

    if (!title || !author || !content) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Image is optional, so we won’t fail if missing
    const story = {
      id: Date.now(),
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      author,
      content,
      image: image || null, // default to null if not provided
      date: new Date().toISOString(),
      approved: false,
    };

    // Path to your submissions data file
    const submissionsPath = path.join(process.cwd(), "data", "submissions.json");

    // Ensure file exists
    try {
      await fs.access(submissionsPath);
    } catch {
      await fs.writeFile(submissionsPath, "[]");
    }

    // Read existing submissions
    const existingData = await fs.readFile(submissionsPath, "utf8");
    const submissions = existingData ? JSON.parse(existingData) : [];

    // Add new story
    submissions.push(story);

    // Save file
    await fs.writeFile(submissionsPath, JSON.stringify(submissions, null, 2));

    return NextResponse.json({
      success: true,
      message: "Story saved successfully!",
      story,
    });
  } catch (error) {
    console.error("Save submission error:", error);
    return NextResponse.json(
      { error: "Failed to save submission." },
      { status: 500 }
    );
  }
}

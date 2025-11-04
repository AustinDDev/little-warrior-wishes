import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "stories.json");
    const data = await fs.readFile(filePath, "utf8").catch(() => "[]");
    const stories = JSON.parse(data);
    return NextResponse.json(stories);
  } catch (error) {
    console.error("Error loading stories:", error);
    return NextResponse.json({ error: "Failed to load stories" }, { status: 500 });
  }
}

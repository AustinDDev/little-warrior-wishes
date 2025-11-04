import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, story, name, email } = await req.json();

    if (!title || !story) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "submissions.json");

    await fs.mkdir(dataDir, { recursive: true });

    const fileData = await fs.readFile(filePath, "utf8").catch(() => "[]");
    const submissions = JSON.parse(fileData);

    const newSubmission = {
      id: Date.now(),
      title,
      story,
      name: name || "Anonymous",
      email: email || "N/A",
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString(),
      status: "pending",
    };

    submissions.push(newSubmission);
    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2));

    return NextResponse.json({ success: true, submission: newSubmission });
  } catch (error) {
    console.error("Submit API error:", error);
    return NextResponse.json({ error: "Failed to save story" }, { status: 500 });
  }
}

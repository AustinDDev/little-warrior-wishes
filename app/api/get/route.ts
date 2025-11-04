import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "Missing file parameter" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", file);

    // Create empty file if it doesn't exist
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, "[]");
    }

    const data = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(data);

    return NextResponse.json(json);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

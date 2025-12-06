
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { iconsDirectory } = await req.json();
  try {
    const dirPath = path.join(process.cwd(), iconsDirectory);
    const files = fs.readdirSync(dirPath); // Read directory contents
    // Filter for .tsx files and dynamically import them
   // Return an array of icon names (file names without extensions)
   const iconNames = files
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => file.replace(".tsx", ""));

    return NextResponse.json({ icons: iconNames });

  } catch (error) {
    console.error("Error reading icons:", error);
    return NextResponse.json({ error: "Failed to load icons" }, { status: 500 });
  } 
}

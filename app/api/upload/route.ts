import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/gif"];

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file format. Please upload JPG, PNG, WEBP, or GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit. Please choose a smaller image." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `blog-${Date.now()}-${cleanFileName}`;

    // 1. If Vercel Blob token is available, use @vercel/blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`thumbnails/${uniqueFileName}`, file, {
          access: "public",
        });
        return NextResponse.json({
          url: blob.url,
          name: file.name,
          size: file.size,
          type: file.type,
        });
      } catch (blobError) {
        console.warn("[Vercel Blob Upload Fallback]:", blobError);
      }
    }

    // 2. Local public folder fallback
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, uniqueFileName);
      await writeFile(filePath, buffer);

      return NextResponse.json({
        url: `/uploads/${uniqueFileName}`,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    } catch (fsError) {
      console.warn("[Disk write failed, falling back to data URL]:", fsError);

      // 3. Fallback to Data URL
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${file.type};base64,${base64}`;
      return NextResponse.json({
        url: dataUrl,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }
  } catch (error) {
    console.error("[Upload API Error]:", error);
    return NextResponse.json({ error: "Failed to process image upload." }, { status: 500 });
  }
}

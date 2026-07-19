import { NextRequest, NextResponse } from "next/server";
import { uploadToBackblaze } from "@/lib/backblaze";

export const runtime = "nodejs";

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/**
 * POST /api/upload
 * Accepts multipart/form-data with a "file" field (and optional "folder" field,
 * e.g. "logo" | "gallery" | "hero-background") and returns the public URL.
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { success: false, message: "No file provided under 'file' field" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: `Unsupported file type: ${file.type}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, message: "File exceeds 8MB limit" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = (file as File).name || "upload";

    const result = await uploadToBackblaze(buffer, filename, file.type, folder);

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    console.error("[upload] error:", message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

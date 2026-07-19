import { AwsClient } from "aws4fetch";
import { Buffer } from 'buffer';

// Backblaze B2 exposes an S3-compatible API. We sign requests with aws4fetch
// (lightweight, no AWS SDK) using the B2 "Application Key" as access/secret.
// Env vars required:
//   B2_ENDPOINT        e.g. https://s3.us-west-004.backblazeb2.com
//   B2_REGION           e.g. us-west-004
//   B2_BUCKET_NAME       your bucket name
//   B2_KEY_ID            application key ID
//   B2_APPLICATION_KEY   application key secret
//   B2_PUBLIC_BASE_URL   e.g. https://f004.backblazeb2.com/file/your-bucket (or a CDN in front of it)

function getB2Client() {
  const keyId = process.env.B2_KEY_ID;
  const appKey = process.env.B2_APPLICATION_KEY;
  const region = process.env.B2_REGION;

  if (!keyId || !appKey || !region) {
    throw new Error("Backblaze B2 credentials are not configured (B2_KEY_ID/B2_APPLICATION_KEY/B2_REGION)");
  }

  return new AwsClient({
    accessKeyId: keyId,
    secretAccessKey: appKey,
    region,
    service: "s3",
  });
}

export interface UploadResult {
  key: string;
  url: string;
}

/**
 * Uploads a file buffer to Backblaze B2 and returns its public URL.
 */
export async function uploadToBackblaze(
  buffer: Buffer,
  filename: string,
  contentType: string,
  folder = "uploads"
): Promise<UploadResult> {
  const endpoint = process.env.B2_ENDPOINT;
  const bucket = process.env.B2_BUCKET_NAME;
  const publicBaseUrl = process.env.B2_PUBLIC_BASE_URL;

  if (!endpoint || !bucket || !publicBaseUrl) {
    throw new Error("Backblaze B2 bucket config is not set (B2_ENDPOINT/B2_BUCKET_NAME/B2_PUBLIC_BASE_URL)");
  }

  const client = getB2Client();

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;

  const putUrl = `${endpoint}/${bucket}/${key}`;

  const res = await client.fetch(putUrl, {
    method: "PUT",
    body: new Uint8Array(buffer),
    headers: {
      "Content-Type": contentType,
      "Content-Length": buffer.length.toString(),
      // B2's S3-compatible API defaults new objects to private; this ACL
      // header makes the object publicly readable via the public base URL.
      // "x-amz-acl": "public-read",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Backblaze upload failed (${res.status}): ${text}`);
  }

  return {
    key,
    url: `${publicBaseUrl}/${key}`,
  };
}

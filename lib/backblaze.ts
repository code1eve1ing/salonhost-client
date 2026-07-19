import { Buffer } from "buffer";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const endpoint = process.env.B2_ENDPOINT!;
const region = process.env.B2_REGION!;
const bucket = process.env.B2_BUCKET_NAME!;
const keyId = process.env.B2_KEY_ID!;
const applicationKey = process.env.B2_APPLICATION_KEY!;

const s3 = new S3Client({
  region,
  endpoint,
  forcePathStyle: true,
  credentials: {
    accessKeyId: keyId,
    secretAccessKey: applicationKey,
  },
});

export interface UploadResult {
  key: string;
  url: string;
}

export async function uploadToBackblaze(
  buffer: Buffer,
  filename: string,
  contentType: string,
  folder = "uploads"
): Promise<UploadResult> {
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");

  const key = `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
    {
      expiresIn:  60 * 60 * 24 * 7, // 7 days
    }
  );
 
  return {
    key,
    url,
  };
}

export async function getFileUrl(
  key: string,
  expiresIn =  60 * 60 * 24 * 7, // 7 days
) {
  return getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
    {
      expiresIn,
    }
  );
}
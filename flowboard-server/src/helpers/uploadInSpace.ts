import {
  DeleteObjectCommand,
  ObjectCannedACL,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import config from "../config";
import ApiError from "../errors/ApiErrors";

const DO_CONFIG = {
  endpoint: config.bucket.endpoint!,
  region: config.bucket.region!,
  credentials: {
    accessKeyId: config.bucket.access_key!,
    secretAccessKey: config.bucket.secret_key!,
  },
  spaceName: config.bucket.name!,
};

const s3 = new S3Client({
  endpoint: DO_CONFIG.endpoint,
  region: DO_CONFIG.region,
  credentials: DO_CONFIG.credentials,
  forcePathStyle: true,
});

export const uploadInSpace = async (
  file: Express.Multer.File,
  folder: string,
): Promise<string> => {
  if (!file) {
    throw new ApiError(400, "No file provided");
  }

  const extension = path.extname(file.originalname);

  const key = `vertical_city/${folder}/${crypto.randomUUID()}${extension}`;

  try {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: DO_CONFIG.spaceName,
        Key: key,
        Body: fs.createReadStream(file.path),
        ACL: "public-read" as ObjectCannedACL,
        ContentType: file.mimetype,
      },
    });

    const result = await upload.done();

    return (
      result.Location ?? `${DO_CONFIG.endpoint}/${DO_CONFIG.spaceName}/${key}`
    );
  } finally {
    if (file.path) {
      await fs.promises.unlink(file.path).catch(() => {});
    }
  }
};

export const deleteFromSpace = async (fileUrl: string): Promise<boolean> => {
  try {
    const url = new URL(fileUrl);
    const key = decodeURIComponent(url.pathname.replace(/^\/+/, ""));

    await s3.send(
      new DeleteObjectCommand({
        Bucket: DO_CONFIG.spaceName,
        Key: key,
      }),
    );

    return true;
  } catch {
    return false;
  }
};

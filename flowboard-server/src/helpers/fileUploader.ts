import crypto from "crypto";
import fs from "fs";
import multer from "multer";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
];

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, UPLOAD_DIR);
  },

  filename(req, file, cb) {
    cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },

  fileFilter(req, file, cb) {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error("Unsupported file type"));
    }
    cb(null, true);
  },
});

const profileImage = upload.single("profileImage");

const uploadMultiple = upload.fields([
  {
    name: "profileImage",
    maxCount: 1,
  },
  {
    name: "imageUrls",
    maxCount: 20,
  },
]);

export const fileUploader = {
  upload,
  uploadMultiple,
  profileImage,
};

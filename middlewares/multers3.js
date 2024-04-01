import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

import path from "path";


import dotenv from "dotenv"
dotenv.config();

console.log(process.env.FILEBASE_REGION)

export const s3 = new S3Client({
    endpoint: "https://s3.filebase.com",
    region: process.env.FILEBASE_REGION || "",
    credentials: {
      accessKeyId: process.env.FILEBASE_ACCESS_KEY || "",
      secretAccessKey: process.env.FILEBASE_SECRET_KEY || "",
    },
  });

const storage = multerS3({
    s3: s3,
    bucket: "2bucket",
    metadata: (_req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (_req, file, cb) => {
      cb(null, file.originalname);
    },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size if needed
}).single("file");



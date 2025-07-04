const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const s3 = new S3Client({
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

const uploadDocs = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
}).array("docs", 5);

const uploadWillDocs = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
}).array("willDocs", 4);


const uploadOCR = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Allow 5MB, adjust as needed
}).single("document"); // single file named 'document'

module.exports = { s3, uploadOCR, uploadDocs, uploadWillDocs };

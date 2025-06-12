const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("../middlewares/multers3.js");
const axios = require("axios");
const FormData = require("form-data");
const stream = require("stream");
const { debug } = require("util");

const performOCR = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("No file uploaded");
  console.log("File is here");
  try {
    const getObjectParams = {
      Bucket: file.bucket,
      Key: file.key,
    };

    const s3Response = await s3.send(new GetObjectCommand(getObjectParams));
    const fileStream = s3Response.Body; 

    const formData = new FormData();
    formData.append("apikey", process.env.OCR_API_KEY || "K87291856088957");
    formData.append("language", "eng");
    formData.append("isOverlayRequired", "false");
    formData.append("file", fileStream, file.originalname); 
    console.log("Performing OCR on file:", file.originalname);
    const ocrResponse = await axios.post(
      "https://api.ocr.space/parse/image",
      formData,
      {                                                                                                                                                                                                                         
        headers: formData.getHeaders(),
      }
    );

    const text = ocrResponse.data?.ParsedResults?.[0]?.ParsedText || "";
    return res.json({ text });
  } catch (error) {
    console.error("OCR API error", error?.response?.data || error.message);
    return res.status(500).json({ message: "Failed to perform OCR" });
  }
};

module.exports = { performOCR };
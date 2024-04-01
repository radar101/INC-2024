import express from "express";
import connectDb from "./db/dbConnection.js"
import cors from "cors";
import cookieparser from 'cookie-parser';
import dotenv from "dotenv"; 
dotenv.config();
import  rateLimiterUsingThirdParty  from './middlewares/rateLimit.js';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import {s3,upload} from "./middlewares/multers3.js"
import userRouter from "./router/userRoutes.js";
connectDb();

const app = express();

const port = process.env.PORT || 8080;

app.use(cookieparser())
app.use(express.json());
app.use(rateLimiterUsingThirdParty);

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("from express server ")

})


app.use("/user",userRouter)
app.post("/upload", upload, async (req, res) => {
  try {
    const responseData = {
      file: req.file?.originalname,
      url: `${process.env.FILE_SERVER_URL}/${req.file?.originalname}`,
    };

    // If production retrieve file data to get the ipfs CID
    const commandGetObject = new GetObjectCommand({
      Bucket: "2bucket",
      Key: req.file?.originalname,
    });
    const response = await s3.send(commandGetObject);
    responseData.url = `ipfs://${response.Metadata?.cid}`;
    return res.json({ data: responseData });
  } catch (error) {
    console.log(error);
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

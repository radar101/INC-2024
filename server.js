import express from "express";
import connectDb from "./db/dbConnection.js"
import cors from "cors";
import cookieparser from 'cookie-parser';
import dotenv from "dotenv"; 
dotenv.config();
import  rateLimiterUsingThirdParty  from './middlewares/rateLimit.js';
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

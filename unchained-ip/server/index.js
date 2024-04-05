const express = require("express");
const connectDb = require("./db/dbConnection.js");
const cookieparser = require('cookie-parser');
const dotenv = require("dotenv"); 
const cors = require('cors')
dotenv.config();
const rateLimiterUsingThirdParty = require('./middlewares/rateLimit.js');
const userRouter = require("./router/userRoutes.js");

connectDb();

const app = express();

const port = process.env.PORT || 8000;

app.use(cookieparser())
app.use(express.json());
// app.use(rateLimiterUsingThirdParty);
app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("from express server ")
})


app.use("/user",userRouter)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

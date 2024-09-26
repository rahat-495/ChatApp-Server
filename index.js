
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5555;
const app = express();

const connectDB = require('./Config/connectDB') ;
const router = require('./Routes/index') ;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json()) ;
app.use(cookieParser()) ;
require("dotenv").config() ;

connectDB() ;

app.use('/api' , router) ;

app.get("/", (req, res) => {
  res.send("Chat App server is running !");
});

app.listen(port, () => {
  console.log(`the server is running at port ${port}`);
});


const { app , server } = require('./socket/index')
const connectDB = require('./Config/connectDB') ;
const cookieParser = require("cookie-parser");
const router = require('./Routes/index') ;
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5555;

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

server.listen(port, () => {
  console.log(`the server is running at port ${port}`);
});

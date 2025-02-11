require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const ConnectDB = require('./config/db');
const authRoutes = require("./routes/authRoute.js");

 

const app=express();
const PORT=process.env.PORT || 8000

//database connection
ConnectDB();

//middlewares

app.use(
    cors({
      origin: "http://localhost:8080", // Change this to your frontend URL
      credentials: true,
    })
  );
  
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("uploads"));


//routes

app.use("/api/v1",require("./routes/routes"))
//routes
app.use("/api/v1/auth", authRoutes);

// Serve static files from dist directory in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + "/dist/"));
    
    app.get("*", (req, res) => {
        res.sendFile(__dirname + "/dist/index.html");
    });
}

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});
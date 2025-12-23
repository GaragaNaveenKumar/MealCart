import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import dotenv from "dotenv";
dotenv.config();


//app config

const app=express();




// middleware

app.use(express.json());
app.use(cors());

//db connection

connectDB();

// api endpoints
app.use("/api/food",foodRouter);

app.get("/",(req,res)=>{
    res.send("API WORKING");
});

app.listen(process.env.PORT,()=>{
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});


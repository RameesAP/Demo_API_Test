import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//Middleware
app.use(cors());
app.use(express.json());


//db connection
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("connect to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });


  app.use("/api/auth")


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on ${process.env.PORT || 5000}`);
});

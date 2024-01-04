import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
// var mongoose = require("mongoose");
import Book from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

// var cors = require("cors");

const app = express();

// !!!!! IMPORTANT :  Ensure that the CORS middleware is placed before your routes.
// CORS middleware to allow requests from all origins
// ==Option 1 (for CORS)==
app.use(cors());

// ==Option 2 (for CORS) : with customization==
// app.use(
//   cors({
//     origin: "http://localhost:5555",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// middleware to parse JSON data from request body
app.use(express.json());

// middleware for EXPRESS to handle routes starting with prefix "/books"
app.use("/books", booksRoute);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Successfully connected to database");
    // run Express server only after successfully connecting to database
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Error connecting to database");
  });

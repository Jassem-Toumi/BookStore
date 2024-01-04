import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields which are used to track changes to a document
  }
);
const Book = mongoose.model("Book", bookSchema); //

export default Book;

/*
model is a class with which we construct documents
Book is a model ; essentially a class defined with a schema
the schema of a model defines the structure of documents within that collection; the attributes and their types
*/

import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

// HTTP POST request USED to send data to a server
// save a new book to the database
router.post("/", async (request, response) => {

  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedDate
    ) {
      return response
        .status(400)
        .send({ message: "Required field(s) missing" });
    }
    // create a book object
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishedDate: request.body.publishedDate,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    // console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// HTTP GET request USED to get data from a server
// Get all books from the database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// Get books by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById({
      _id: id,
    });
    return response.status(200).send(book);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// HTTP route for UPDATING A BOOK
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedDate
    ) {
      return response
        .status(404)
        .send({ message: "Required Filed(s) Missing" });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response
        .status(404)
        .send({ message: "No book found with the given id" });
    } else {
      return response
        .status(200)
        .send({ message: " Book updated successfully" });
    }
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// HTTP route for DELETING A BOOK
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response
        .status(404)
        .send({ message: "No book found with the given id" });
    } else {
      return response
        .status(200)
        .send({ message: "Book deleted successfully" });
    }
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// export the router
export default router;

import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";

const CreateBooks = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedDate: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = () => {
    console.log(book);
    if (book.title === "" || book.author === "" || book.publishedDate === "") {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    axios
      .post("http://localhost:5555/books", book)
      .then((response) => {
        setLoading(false);
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
      // navigate to home page at /books
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title: </label>
            <input
              type="text"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
              className="border-2 border-gray-300 py-2 px-4 rounded-lg w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author: </label>
            <input
              type="text"
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
              className="border-2 border-gray-300 py-2 px-4 rounded-lg w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">PublishedDate: </label>
            <input
              type="Date"
              value={book.publishedDate}
              onChange={(e) =>
                setBook({ ...book, publishedDate: e.target.value })
              }
              className="border-2 border-gray-300 py-2 px-4 rounded-lg w-full"
            />
          </div>
          <button
            className="p-2 bg-sky-600 m-8 text-white"
            onClick={handleSaveBook}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBooks;

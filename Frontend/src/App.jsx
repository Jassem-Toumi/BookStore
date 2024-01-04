import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, CreateBooks, EditBooks, DeleteBooks, ShowBooks } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/books/create" element={<CreateBooks />} />
      <Route path="/books/details/:id" element={<ShowBooks />} />
      <Route path="/books/edit/:id" element={<EditBooks />} />
      <Route path="/books/delete/:id" element={<DeleteBooks />} />
    </Routes>
  );
}

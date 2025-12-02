import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPostComponent from "./components/ListPostComponent";
import PostForm from "./components/PostForm"; // Ensure you point to your existing form file
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <BrowserRouter>
        <Header />

        <Routes>
          {/* Home Page -> List Posts */}
          <Route path="/" element={<ListPostComponent />}></Route>

          {/* /posts -> List Posts */}
          <Route path="/posts" element={<ListPostComponent />}></Route>

          {/* /add-post -> Create Form */}
          <Route path="/add-post" element={<PostForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { createPost } from "../services/PostService";

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = { title, author, content };

    // call the service
    createPost(post)
      .then((response) => {
        console.log("Create: ", response.data);

        // clear the form
        setTitle("");
        setAuthor("");
        setContent("");

        // Notify parent (App.jsx) to refresh the list
        onPostCreated();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-red-900/30 mb-10 shadow-lg">
      <h3 className="text-xl font-bold text-red-500 mb-4 uppercase tracking-widest">
        New Transmission
      </h3>

      <form onSubmit={handleSubmit} action="">
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-red-500 transition"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Author
          </label>
          <input
            type="text"
            className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-red-500 transition"
            placeholder="Your name..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Message
          </label>
          <textarea
            className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-red-500 transition h-24"
            placeholder="What is happening in Hawkins? (Min 10 chars)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full uppercase tracking-wider transition duration-300"
        >
          Send Data
        </button>
      </form>
    </div>
  );
};

export default PostForm;

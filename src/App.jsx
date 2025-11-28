import React, { useEffect, useState } from "react";
import "./App.css";
import { listPosts } from "./services/PostService";

function App() {
  // 1. State to hold the list of posts
  const [posts, setPosts] = useState([]);

  // 2. Effect to fetch data on load
  useEffect(() => {
    listPosts()
      .then((response) => {
        // SUCCESS: The backend sent data!
        // Remember: Your backend sends a page object, so the list is in 'content'
        console.log("DATA:", response.data);
        setPosts(response.data.content);
      })
      .catch((error) => {
        // ERROR: Backend is down CORS failed
        console.error(error);
      });
  }, []);

  return (
    // Main Container - Dark theme (Stranger things style)
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* HEADER */}
      <div className="container mx-auto p-4">
        <h1 className="text-5xl font-extrabold text-center text-red-600 mb-10 tracking-widest uppercase drop-shadow-md">
          Stranger Blogs
        </h1>

        {/* Grid Layout for Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-xl hover:shadow-red-900/40 transition duration-300 transform hover:-translate-y-1"
            >
              {/* Post Title */}
              <h2 className="text-2xl font-bold text-gray-100 mb-2">
                {post.title}
              </h2>

              {/* Author Badge */}
              <div className="mb-4">
                <span className="bg-red-900 text-red-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {post.author}
                </span>
              </div>

              {/* Post Content (Truncated) */}
              <p className="text-gray-400">
                {post.content.substring(0, 100)}...
              </p>

              {/* Read More Button */}
              <button className="mt-4 text-red-500 hover:text-red-400 font-semibold text-sm uppercase tracking-wider">
                Read More &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

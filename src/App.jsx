import React from "react";
import { useEffect, useState } from "react";
import { listPosts } from "./services/PostService";
import PostForm from "./components/PostForm"; // Import the new component

function App() {
  const [posts, setPosts] = useState([]);

  // Move fetch logic to a separate function so we can reuse it!
  const getAllPosts = () => {
    listPosts()
      .then((response) => {
        setPosts(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Load initial data
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Limited width for better look */}
        <h1 className="text-5xl font-extrabold text-center text-red-600 mb-10 tracking-widest uppercase drop-shadow-md">
          Stranger Blogs
        </h1>
        {/* The Form - Pass the refresh function as a prop! */}
        <PostForm onPostCreated={getAllPosts} />
        {/* The List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-xl hover:shadow-red-900/40 transition duration-300 transform hover:-translate-y-1"
            >
              <h2 className="text-2xl font-bold text-gray-100 mb-2">
                {post.title}
              </h2>
              <div className="mb-4">
                <span className="bg-red-900 text-red-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {post.author}
                </span>
              </div>
              <p className="text-gray-400">
                {post.content.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

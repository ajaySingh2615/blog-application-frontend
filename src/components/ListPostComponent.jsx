import React from "react";
import { useEffect, useState } from "react";
import { listPosts, deletePost } from "../services/PostService.js";
import CommentSection from "./CommentSection.jsx";
import { useNavigate } from "react-router-dom";

const ListPostComponent = () => {
  const [posts, setPosts] = useState([]);
  const navigator = useNavigate(); // To change pages programmatically

  const getAllPosts = () => {
    listPosts()
      .then((response) => {
        // handle java pagination structure
        const data = response.data.content
          ? response.data.content
          : response.data;
        setPosts(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const removePost = (id) => {
    deletePost(id)
      .then(() => {
        getAllPosts(); // Refresh list
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6 uppercase tracking-widest">
        Transmissions
      </h2>

      {/* Add Post Button */}
      <div className="mb-6 text-center">
        <button
          onClick={() => navigator("/add-post")}
          className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-6 rounded uppercase tracking-wider shadow-lg transition"
        >
          + New Transmission
        </button>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-red-900/20 shadow-lg transition"
          >
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              {post.title}
            </h2>
            <div className="mb-4">
              <span className="bg-red-900 text-red-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                {post.author}
              </span>
            </div>
            <p className="text-gray-400">{post.content}</p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => removePost(post.id)}
                className="text-gray-500 hover:text-red-600 text-sm font-bold"
              >
                Delete
              </button>
            </div>

            <CommentSection postId={post.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPostComponent;

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
      <h2 className="text-4xl font-retro-serif font-bold text-center text-stranger-red mb-12 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,0,0,0.6)] animate-flicker">
        Incoming Transmissions
      </h2>

      {/* Add Post Button */}
      <div className="mb-10 text-center">
        <button
          onClick={() => navigator("/add-post")}
          className="bg-void-black border border-stranger-red text-stranger-red hover:bg-stranger-red hover:text-void-black font-bold py-3 px-8 rounded-sm uppercase tracking-widest shadow-[0_0_15px_rgba(255,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] transition-all duration-300"
        >
          Initiate Signal
        </button>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative bg-black/40 border border-stranger-red-dim/50 p-6 hover:border-stranger-red hover:bg-black/60 transition-all duration-300 shadow-[0_0_0_rgba(255,0,0,0)] hover:shadow-[0_0_20px_rgba(255,0,0,0.2)]"
          >
            {/* "Top Secret" Stamp Effect */}
            <div className="absolute -top-3 -right-3 border-2 border-stranger-red/30 text-stranger-red/30 px-2 py-1 text-xs font-black uppercase -rotate-12 group-hover:border-stranger-red group-hover:text-stranger-red transition-colors duration-300">
              Top Secret
            </div>

            <h2 className="text-2xl font-retro-serif font-bold text-gray-100 mb-3 group-hover:text-stranger-red transition-colors duration-300">
              {post.title}
            </h2>
            <div className="mb-4 flex items-center space-x-2">
              <span className="text-stranger-red text-xs uppercase tracking-widest">
                Source:
              </span>
              <span className="bg-stranger-red/10 text-stranger-red border border-stranger-red/20 text-xs font-mono px-2 py-0.5 rounded-sm">
                {post.author}
              </span>
            </div>
            <p className="text-gray-400 font-terminal-mono leading-relaxed border-l-2 border-gray-800 pl-4 mb-6 group-hover:border-stranger-red/50 transition-colors duration-300">
              {post.content}
            </p>

            <div className="flex justify-end mt-4 border-t border-gray-800 pt-4">
              <button
                onClick={() => removePost(post.id)}
                className="text-gray-500 hover:text-stranger-red text-xs font-bold uppercase tracking-widest transition-colors duration-300"
              >
                [ Terminate Signal ]
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

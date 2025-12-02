import React, { useState } from "react";
import { createPost } from "../services/PostService";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({}); // State for validation errors

  const navigator = useNavigate(); // Navigation hook

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = { title, author, content };

    // call the service
    createPost(post)
      .then((response) => {
        console.log(response.data);
        // After success, go back to home page
        navigator("/posts");
      })
      .catch((error) => {
        // Only log if it's NOT a validation error (400)
        if (error.response && error.response.status === 400) {
          if (error.response.data) {
            setErrors(error.response.data);
          }
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-black/80 p-8 rounded-sm border border-stranger-red shadow-[0_0_30px_rgba(255,0,0,0.15)] relative overflow-hidden">
        {/* Scanline overlay for the form */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>

        <div className="relative z-10">
          <h3 className="text-3xl font-retro-serif font-bold text-stranger-red mb-8 uppercase tracking-widest text-center animate-flicker">
            Initiate Transmission
          </h3>

          <form onSubmit={handleSubmit} action="">
            <div className="mb-6">
              <label className="block text-stranger-red text-xs font-bold mb-2 uppercase tracking-widest">
                Subject (Title)
              </label>
              <input
                type="text"
                className={`w-full bg-gray-900/50 text-gray-100 border-b-2 ${
                  errors.title ? "border-stranger-red" : "border-gray-700"
                } py-3 px-4 focus:outline-none focus:border-stranger-red focus:bg-gray-900 transition-colors font-terminal-mono placeholder-gray-600`}
                placeholder="ENTER SUBJECT..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors({ ...errors, title: "" }); // Clear error on change
                }}
              />
              {errors.title && (
                <p className="text-stranger-red text-xs mt-2 font-mono">
                  [ERROR]: {errors.title}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-stranger-red text-xs font-bold mb-2 uppercase tracking-widest">
                Agent Name (Author)
              </label>
              <input
                type="text"
                className={`w-full bg-gray-900/50 text-gray-100 border-b-2 ${
                  errors.author ? "border-stranger-red" : "border-gray-700"
                } py-3 px-4 focus:outline-none focus:border-stranger-red focus:bg-gray-900 transition-colors font-terminal-mono placeholder-gray-600`}
                placeholder="IDENTIFY YOURSELF..."
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  setErrors({ ...errors, author: "" }); // Clear error on change
                }}
              />
              {errors.author && (
                <p className="text-stranger-red text-xs mt-2 font-mono">
                  [ERROR]: {errors.author}
                </p>
              )}
            </div>

            <div className="mb-8">
              <label className="block text-stranger-red text-xs font-bold mb-2 uppercase tracking-widest">
                Message Content
              </label>
              <textarea
                className={`w-full bg-gray-900/50 text-gray-100 border-b-2 ${
                  errors.content ? "border-stranger-red" : "border-gray-700"
                } py-3 px-4 focus:outline-none focus:border-stranger-red focus:bg-gray-900 transition-colors font-terminal-mono h-32 placeholder-gray-600 resize-none`}
                placeholder="TYPE MESSAGE HERE..."
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setErrors({ ...errors, content: "" }); // Clear error on change
                }}
              ></textarea>
              {errors.content && (
                <p className="text-stranger-red text-xs mt-2 font-mono">
                  [ERROR]: {errors.content}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-stranger-red hover:bg-red-600 text-void-black font-bold py-4 px-4 rounded-sm uppercase tracking-[0.2em] transition duration-300 shadow-[0_0_15px_rgba(255,0,0,0.4)] hover:shadow-[0_0_25px_rgba(255,0,0,0.7)]"
            >
              Transmit Data
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

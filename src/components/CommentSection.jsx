import React, { useState } from "react"; // 1. Added useState
import { createComment, getComments } from "../services/PostService";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  // CHANGE 1: Add Loading State
  const [loading, setLoading] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  // fetch the comments when the user opens the section
  const loadComments = () => {
    if (!showComments) {
      // CHANGE 2: Set loading to true before fetching
      setLoading(true);

      getComments(postId)
        .then((response) => {
          setComments(response.data);
          setLoading(false); // Stop loading on success
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); // Stop loading on error
        });
    }
    setShowComments(!showComments);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentData = { name, email, body };

    createComment(postId, commentData)
      .then((response) => {
        setComments([...comments, response.data]);
        setName("");
        setEmail("");
        setBody("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-4 border-t border-gray-700 pt-4">
      {/* Toggle button */}
      <button
        onClick={loadComments}
        className="text-gray-400 hover:text-white text-sm underline transition mb-4"
      >
        {showComments ? "Hide Transmissions" : "View Transmissions"}
      </button>

      {/* The Comment Area */}
      {showComments && (
        <div className="bg-gray-900/50 p-4 rounded-lg animate-fade-in">
          {/* CHANGE 3: The Loading Check (Wraps the List) */}
          {loading ? (
            <p className="text-gray-500 text-sm text-center my-4 animate-pulse">
              Decrypting signal...
            </p>
          ) : (
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
              {comments.length === 0 && (
                <p className="text-gray-500 text-sm">No transmissions yet...</p>
              )}

              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-800 p-3 rounded border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-red-400 font-bold text-sm">
                      {comment.name}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {comment.email}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{comment.body}</p>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Codename (Name)"
              className="w-full bg-gray-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-red-500 border border-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-red-500 border border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Transmission (Body)"
              className="w-full bg-gray-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-red-500 border border-transparent h-20"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-700 text-white text-sm font-bold py-2 rounded transition"
            >
              Send Transmission
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentSection;

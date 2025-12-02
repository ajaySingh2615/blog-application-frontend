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
    <div className="mt-6 border-t border-gray-800 pt-4">
      {/* Toggle button */}
      <button
        onClick={loadComments}
        className="text-gray-500 hover:text-stranger-red text-xs uppercase tracking-widest transition-colors duration-300 flex items-center gap-2"
      >
        <span>{showComments ? "[-]" : "[+]"}</span>
        {showComments ? "Close Frequency" : "Intercept Signals"}
      </button>

      {/* The Comment Area */}
      {showComments && (
        <div className="mt-4 bg-black/30 p-4 border-l-2 border-stranger-red/30 animate-fade-in">
          {/* CHANGE 3: The Loading Check (Wraps the List) */}
          {loading ? (
            <p className="text-stranger-red text-xs font-mono text-center my-4 animate-pulse">
              Decrypting incoming data...
            </p>
          ) : (
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {comments.length === 0 && (
                <p className="text-gray-600 text-xs font-mono">
                  No signals detected on this frequency...
                </p>
              )}

              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-void-black/50 p-3 border-b border-gray-800"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-stranger-red font-bold text-xs uppercase tracking-wider">
                      {comment.name}
                    </span>
                    <span className="text-gray-600 text-[10px] font-mono">
                      {comment.email}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm font-terminal-mono">
                    {comment.body}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-3 mt-6">
            <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-2">
              Reply to Frequency
            </h4>
            <input
              type="text"
              placeholder="CODENAME (NAME)"
              className="w-full bg-gray-900/50 text-gray-300 text-xs px-3 py-2 border border-gray-700 focus:outline-none focus:border-stranger-red font-terminal-mono transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="SECURE EMAIL"
              className="w-full bg-gray-900/50 text-gray-300 text-xs px-3 py-2 border border-gray-700 focus:outline-none focus:border-stranger-red font-terminal-mono transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="ENTER MESSAGE..."
              className="w-full bg-gray-900/50 text-gray-300 text-xs px-3 py-2 border border-gray-700 focus:outline-none focus:border-stranger-red font-terminal-mono h-16 transition-colors resize-none"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-stranger-red hover:text-void-black text-gray-300 text-xs font-bold py-2 uppercase tracking-widest transition-all duration-300"
            >
              Send Reply
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentSection;

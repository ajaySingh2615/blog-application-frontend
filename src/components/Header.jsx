import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-void-black/90 backdrop-blur-sm border-b border-stranger-red-dim/30 shadow-[0_4px_20px_rgba(255,0,0,0.1)]">
      <nav className="px-4 lg:px-6 py-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center group">
            <span className="self-center text-3xl font-retro-serif font-black text-stranger-red uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,0,0,0.5)] animate-flicker group-hover:drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] transition-all duration-300">
              Stranger Blogs
            </span>
          </Link>
          <div className="flex items-center lg:order-2 font-terminal-mono space-x-4">
            <Link
              to="/posts"
              className="text-gray-400 hover:text-stranger-red hover:drop-shadow-[0_0_5px_rgba(255,0,0,0.5)] font-bold text-sm transition-all duration-300 uppercase tracking-wider"
            >
              // Transmissions
            </Link>
            <Link
              to="/add-post"
              className="text-void-black bg-stranger-red hover:bg-red-600 font-bold rounded-sm text-sm px-4 py-2 transition-all duration-300 uppercase tracking-wider shadow-[0_0_10px_rgba(255,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]"
            >
              New Signal
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

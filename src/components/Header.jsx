import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="bg-gray-900 border-b border-gray-700 px-4 lg:px-6 py-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-extrabold whitespace-nowrap text-red-600 uppercase tracking-widest drop-shadow-md">
              Stranger Blogs
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/posts"
              className="text-gray-300 hover:text-white font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Transmissions
            </Link>
            <Link
              to="/add-post"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
            >
              New Post
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

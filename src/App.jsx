import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPostComponent from "./components/ListPostComponent";
import PostForm from "./components/PostForm"; // Ensure you point to your existing form file
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-void-black text-gray-100 font-terminal-mono relative overflow-hidden selection:bg-stranger-red selection:text-void-black">
      {/* Background Overlay for Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] opacity-80"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10">
        <BrowserRouter>
          <Header />

          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Home Page -> List Posts */}
              <Route path="/" element={<ListPostComponent />}></Route>

              {/* /posts -> List Posts */}
              <Route path="/posts" element={<ListPostComponent />}></Route>

              {/* /add-post -> Create Form */}
              <Route path="/add-post" element={<PostForm />}></Route>
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

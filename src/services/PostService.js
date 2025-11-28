import axios from "axios";

// The URL of your spring boot backend
const REST_API_BASE_URL = "http://localhost:8080/api/posts";

// Get all posts
export const listPosts = () => {
  return axios.get(REST_API_BASE_URL);
};

// POST new post (Add this!)
export const createPost = (post) => {
  return axios.post(REST_API_BASE_URL, post);
};

export const deletePost = (postId) => {
  return axios.delete(`${REST_API_BASE_URL}/${postId}`);
};

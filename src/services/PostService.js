import axios from "axios";

// The URL of your spring boot backend
const REST_API_BASE_URL = "http://localhost:3000/api/posts";

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

// GET Comments
export const getComments = (postId) => {
  // Matches your Node Route: /api/posts/:postId/comments
  return axios.get(`${REST_API_BASE_URL}/${postId}/comments`)
}

// CREATE Comments
export const createComment = (postId, comment) => {
  return axios.post(`${REST_API_BASE_URL}/${postId}/comments`, comment)
}

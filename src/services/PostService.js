import axios from "axios";

// The URL of your spring boot backend
const REST_API_BASE_URL = "http://localhost:8080/api/posts";

export const listPosts = () => {
  // We are asking the backend for data
  return axios.get(REST_API_BASE_URL);
};

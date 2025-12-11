import axios from "axios";

// Configure axios defaults for better caching
const api = axios.create({
  baseURL: "https://freelance-youtube.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle caching
api.interceptors.request.use(
  (config) => {
    // For GET requests, enable caching
    if (config.method === "get") {
      config.headers["Cache-Control"] = "max-age=300"; // 5 minutes
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

// Centralized API configuration
// Ensures VITE_API_URL has no trailing slash, preventing invalid URLs like https://api.render.com//api/products
const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const API_BASE_URL = rawUrl.replace(/\/+$/, "");

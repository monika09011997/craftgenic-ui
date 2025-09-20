import axios from 'axios';

// 1. Create a new Axios instance
export const apiClient = axios.create({
  // 2. Set the base URL from your .env file
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

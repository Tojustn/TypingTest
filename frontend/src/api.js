import axios from 'axios';

const BACKEND_API_URL = "http://localhost:5000/";

const api = axios.create({
    baseURL: BACKEND_API_URL,
 withCredentials: true, // This is the critical part for cookies
  headers: {
    'Content-Type': 'application/json',
  }
});
export default api

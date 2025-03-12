import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

const FetchUser = () => {
  const nav = useNavigate();
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("api/auth/user", { withCredentials: true });
        return response.data;
      } catch (error) {
        alert("User is not logged in");
        nav("/"); // Navigate only when the request fails
      }
    };
    
    fetchUser();
  }, []); // Empty dependency array means this runs once when component mounts
  
  return null;
};

export default FetchUser;

// utils/fetchUser.js
import api from "../api.js";

const fetchUser = async () => {
  try {
    const response = await api.get("api/auth/user", { withCredentials: true });
    return response.data;
  } catch (error) {
      console.log("Error fetching User" + error)
      return null
  }
};

export default fetchUser;


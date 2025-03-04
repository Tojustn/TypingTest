import api from "../api.js";

const FetchUser = async () => {
    try {
        const response = await api.get("api/auth/user", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

export default FetchUser;


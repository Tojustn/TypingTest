import api from "../api.js";

// Fetch user status
 const checkAuth = async () => {
    try {
        const response = await api.get('/api/auth/user', {
            withCredentials: true
        });

        if (response.status === 200) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false
    }
};


export default checkAuth;


import axios from "axios";

const API_URL = "http://localhost:3000";

const registerAdmin = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            name,
            email,
            password,
        });
        localStorage.setItem("token", response.data.token);
        return response;
    } catch (error) {
        console.log("Error registering admin:", error.response.data);
        return error.response;
    }
};

const loginAdmin = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
        });
        localStorage.setItem("token", response.data.token);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default {
    registerAdmin,
    loginAdmin,
};

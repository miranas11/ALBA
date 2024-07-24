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

const saveUser = async (data) => {
    const { name, phoneNumber, email } = data;
    try {
        const response = await axios.post(`${API_URL}/auth/saveUsers`, {
            name,
            email,
            phoneNumber,
        });
        return response;
    } catch (error) {
        console.log("Error saving User:", error.response.data);
        return error.response;
    }
};

const validateToken = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(
            `${API_URL}/auth/admin/validateToken`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.log(error.response.data);
        return error.response;
    }
};

export default {
    registerAdmin,
    loginAdmin,
    saveUser,
    validateToken,
};

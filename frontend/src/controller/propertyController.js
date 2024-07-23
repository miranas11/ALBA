import axios from "axios";

const API_URL = "http://localhost:3000";
const token = localStorage.getItem("token");

const getAllProperties = async () => {
    console.log(token);
    try {
        const response = await axios.get(`${API_URL}/property/getAll`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

const createProperty = async (data) => {
    const { community, building, unitNo } = data;
    try {
        const response = await axios.post(
            `${API_URL}/property/create`,
            {
                community,
                building,
                unitNo,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const deleteProperty = async (id) => {
    try {
        const response = await axios.delete(
            `${API_URL}/property/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default { getAllProperties, createProperty, deleteProperty };

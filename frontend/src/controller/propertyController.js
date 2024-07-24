import axios from "axios";
import config from "../config";
const API_URL = config.API_URL;

const token = localStorage.getItem("token");

const getAllProperties = async () => {
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

const addLead = async (propertyId, userId) => {
    try {
        const response = await axios.post(
            `${API_URL}/property/addLead/${propertyId}/${userId}`
        );
        return response.data;
    } catch (error) {
        console.log(error.response.data.error);
    }
};

export default { getAllProperties, createProperty, deleteProperty, addLead };

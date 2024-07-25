import axios from "axios";
import config from "../config";
const API_URL = config.API_URL;

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
    const token = localStorage.getItem("token");
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
        return error.response;
    }
};
const editProperty = async (data, propertyId) => {
    const { community, building, unitNo } = data;
    const token = localStorage.getItem("token");
    try {
        const response = await axios.patch(
            `${API_URL}/property/edit/${propertyId}`,
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
        return error.response;
    }
};

const deleteProperty = async (id) => {
    const token = localStorage.getItem("token");
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

export default {
    getAllProperties,
    createProperty,
    editProperty,
    deleteProperty,
    addLead,
};

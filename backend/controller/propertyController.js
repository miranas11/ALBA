import propertyCard from "../models/propertyCard.js";

const createProperty = async (req, res) => {
    const { community, building, unitNo } = req.body;

    try {
        const property = new propertyCard({ community, building, unitNo });
        await property.save();
        res.status(201).json({ propertyCreated: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
const deleteProperty = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const property = await propertyCard.findByIdAndDelete(id);
        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }
        res.status(200).json({ propertyDeleted: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getAllProperty = async (req, res) => {
    try {
        const properties = await propertyCard.find({});
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default { createProperty, deleteProperty, getAllProperty };

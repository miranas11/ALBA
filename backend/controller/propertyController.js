import propertyCard from "../models/propertyCard.js";
import User from "../models/user.js";

const createProperty = async (req, res) => {
    const { community, building, unitNo } = req.body;

    try {
        const property = new propertyCard({ community, building, unitNo });
        await property.save();
        res.status(201).json({ propertyCreated: true, newProperty: property });
    } catch (error) {
        console.error(error.code);

        res.status(500).json(error.code);
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
        const properties = await propertyCard.find({}).populate("leads");
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const addLead = async (req, res) => {
    const { id, leadId } = req.params;
    try {
        const lead = await User.findById(leadId);
        if (!lead) {
            return res.status(404).json({ error: "Lead not found" });
        }
        const property = await propertyCard.findById(id);
        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }
        if (!property.leads.includes(leadId)) {
            property.leads.push(leadId);
        } else {
            return res
                .status(400)
                .json({ error: "Lead already exists in property" });
        }
        await property.save();
        res.status(200).json({ message: "Lead added to property", property });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default { createProperty, deleteProperty, getAllProperty, addLead };

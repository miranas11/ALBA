import { Schema, model } from "mongoose";

const communityEnum = ["CommunityA", "CommunityB"];
const buildingEnum = ["BuildingA", "BuildingB"];

const PropertyCardSchema = new Schema({
    community: {
        type: String,
        enum: communityEnum,
        required: true,
    },
    building: {
        type: String,
        enum: buildingEnum,
        required: true,
    },
    unitNo: {
        type: String,
        required: true,
    },
    leads: [
        {
            type: Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            default: [], // Initially empty array
        },
    ],
});

export default model("PropertyCard", PropertyCardSchema);

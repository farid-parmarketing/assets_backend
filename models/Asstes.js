import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    id: { type: String, required: true },
    mediaType: { type: String, required: true },
    mediaLink: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    websiteLink: { type: String },
});

const assetSchema = new mongoose.Schema(
    {
        id: { type: String, required: true }, // campaign id
        name: { type: String, required: true }, // campaign name
        type: { type: String, required: true },
        posts: [postSchema], // array of posts
    },
    { timestamps: true }
);

const Asset = mongoose.model("Asset", assetSchema);

export default Asset;

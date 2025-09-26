import Asset from "../models/Asstes.js";
import mongoose from "mongoose";

// CREATE campaign with posts
export const createAssets = async (req, res) => {
    try {
        let campaigns = Array.isArray(req.body) ? req.body : [req.body];
        let savedAssets = [];

        for (const campaign of campaigns) {
            const { id, name, type, posts } = campaign;

            if (!id || !name || !type) {
                return res.status(400).json({ message: "ID, name and type are required" });
            }

            const newAsset = new Asset({ id, name, type, posts });
            const savedAsset = await newAsset.save();
            savedAssets.push(savedAsset);
        }

        res.status(201).json({
            message: "Campaign(s) created successfully",
            assets: savedAssets,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating campaign" });
    }
};


// GET all campaigns
export const getAssets = async (req, res) => {
    try {
        const { id, name, type } = req.query;

        let filter = {};

        // If id is provided and is valid, get by _id
        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid ID" });
            }
            filter._id = id;
        }

        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }

        if (type) {
            filter.type = { $regex: type, $options: "i" };
        }

        const assets = await Asset.find(filter);

        if (id && assets.length === 0) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        res.status(200).json(assets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching campaigns" });
    }
};



// UPDATE campaign
export const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;  // this is _id
        const { name, type, posts } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const updatedAsset = await Asset.findByIdAndUpdate(
            id,
            { name, type, posts },
            { new: true, runValidators: true }
        );

        if (!updatedAsset) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        res.status(200).json({ message: "Campaign updated", asset: updatedAsset });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating campaign" });
    }
};


// DELETE campaign
export const deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const deletedAsset = await Asset.findByIdAndDelete(id);

        if (!deletedAsset) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting campaign" });
    }
};

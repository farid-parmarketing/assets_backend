import Asset from "../models/Asstes.js";

// CREATE campaign with posts
export const createAssets = async (req, res) => {
    try {
        const { id, name, type, posts } = req.body;

        if (!id || !name || !type) {
            return res.status(400).json({ message: "ID, name and type are required" });
        }

        const newAsset = new Asset({ id, name, type, posts });
        const savedAsset = await newAsset.save();

        res.status(201).json({
            message: "Campaign created successfully",
            asset: savedAsset,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating campaign" });
    }
};

// GET all campaigns
export const getAssets = async (req, res) => {
    try {
        const assets = await Asset.find();
        res.status(200).json(assets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching campaigns" });
    }
};

// UPDATE campaign
export const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, posts } = req.body;

        const updatedAsset = await Asset.findOneAndUpdate(
            { id },
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

        const deletedAsset = await Asset.findOneAndDelete({ id });

        if (!deletedAsset) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting campaign" });
    }
};

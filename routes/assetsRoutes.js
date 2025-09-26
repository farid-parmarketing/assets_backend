import express from "express";
import { createAssets, getAssets, updateAsset, deleteAsset } from "../controllers/assestsController.js"; // add .js extension

const router = express.Router();

router.post("/", createAssets);
router.get("/", getAssets);
router.put("/:id", updateAsset);
router.delete("/:id", deleteAsset);


export default router;

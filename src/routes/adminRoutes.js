import express from "express";
import { getAdminStats } from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protectAdmin, getAdminStats);

export default router;

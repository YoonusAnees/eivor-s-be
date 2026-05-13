import express from "express";
import {
    adminLogin,
    adminLogout,
    adminRegister,
    getAdminProfile
} from "../controllers/authController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.get("/profile", protectAdmin, getAdminProfile);

export default router;

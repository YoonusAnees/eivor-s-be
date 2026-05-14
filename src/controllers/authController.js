import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const generateToken = (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });

    res.cookie("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    return token;
};

export const adminRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const admin = await Admin.create({
            username,
            email,
            password
        });

        if (admin) {
            const token = generateToken(res, admin._id);
            res.status(201).json({
                _id: admin._id,
                username: admin.username,
                email: admin.email,
                token
            });
        } else {
            res.status(400).json({ message: "Invalid admin data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (admin && (await admin.matchPassword(password))) {
            const token = generateToken(res, admin._id);
            res.json({
                _id: admin._id,
                username: admin.username,
                email: admin.email,
                token
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const adminLogout = (req, res) => {
    res.cookie("admin_token", "", {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: "Logged out successfully" });
};

export const getAdminProfile = async (req, res) => {
    const admin = await Admin.findById(req.admin._id).select("-password");
    if (admin) {
        res.json(admin);
    } else {
        res.status(404).json({ message: "Admin not found" });
    }
};

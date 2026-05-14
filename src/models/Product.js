import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            enum: ["Apparel", "Footwear", "Outerwear", "Accessories", "Offer"]
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        images: {
            type: [String],
            default: []
        },
        image: {
            type: String,
            required: true
        },
        sizes: {
            type: [String],
            default: ["S", "M", "L", "XL"]
        },
        discount: {
            type: Number,
            default: 0
        },
        available: {
            type: Boolean,
            default: true
        },
        featured: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
import Product from "../models/Product.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const categoriesCount = await Product.distinct("category");
    const outOfStock = await Product.countDocuments({ quantity: 0 });

    // In a real app, you'd fetch revenue and orders from an Orders model
    // Since we only have Products, we'll return what we can
    res.json({
      totalProducts,
      categories: categoriesCount.length,
      outOfStock,
      totalInventoryValue: 0 // Placeholder or calculate from products
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get admin stats" });
  }
};

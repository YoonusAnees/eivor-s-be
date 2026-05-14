import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to get products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to get product details" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    
    if (productData.sizes && typeof productData.sizes === "string") {
      try {
        productData.sizes = JSON.parse(productData.sizes);
      } catch (e) {
        console.error("Error parsing sizes:", e);
      }
    }

    if (req.files && req.files.length > 0) {
      const filePaths = req.files.map(file => file.path);
      productData.images = filePaths;
      productData.image = filePaths[0]; // Main image
    }
    
    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(400).json({ 
      message: error.message || "Failed to create product", 
      details: error.errors 
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    
    if (productData.sizes && typeof productData.sizes === "string") {
      try {
        productData.sizes = JSON.parse(productData.sizes);
      } catch (e) {
        console.error("Error parsing sizes:", e);
      }
    }

    if (req.files && req.files.length > 0) {
      const filePaths = req.files.map(file => file.path);
      productData.images = filePaths;
      productData.image = filePaths[0];
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Product update error:", error);
    res.status(400).json({ 
      message: error.message || "Failed to update product", 
      details: error.errors 
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete product" });
  }
};
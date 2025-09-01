const Product = require("../models/Product");
const Subcategory = require("../models/Subcategory");

// ================= Post =============================
const createProduct = async (req, res) => {
  try {
    const { name, price, description, subcategory_id } = req.body;

    if (!name || !price || !subcategory_id) {
      return res.status(400).json({
        message: "Name, Price and Subcategory ID are required"
      });
    }

    const product = new Product({ name, price, description, subcategory_id });
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= Get =============================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate({
        path: "subcategory_id",
        select: "name category_id",
        populate: { path: "category_id", select: "name" }
      });

    // Format response like SQL join output
    const formatted = products.map(p => ({
      id: p._id,
      name: p.name,
      price: p.price,
      description: p.description,
      subcategory_id: p.subcategory_id?._id,
      category_id: p.subcategory_id?.category_id?._id,
      category: p.subcategory_id?.category_id?.name,
      subcategory: p.subcategory_id?.name
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= Update =============================
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, subcategory_id } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description, subcategory_id },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product Updated", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= Delete =============================
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};

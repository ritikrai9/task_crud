const Subcategory = require("../models/Subcategory");

// ================ Post =========================
const createSubcategory = async (req, res) => {
  try {
    const { name, category_id } = req.body;

    if (!name || !category_id) {
      return res.status(400).json({ message: "Name and Category ID are required" });
    }

    const subcategory = new Subcategory({ name, category_id });
    await subcategory.save();

    res.json(subcategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== Get All ==============================
const getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find()
      .populate("category_id", "name"); // populate category name

    // Format like SQL JOIN output
    const formatted = subcategories.map(s => ({
      id: s._id,
      name: s.name,
      category_id: s.category_id?._id,
      category: s.category_id?.name
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== Get By ID ==============================
const getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findById(id)
      .populate("category_id", "name");

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json({
      id: subcategory._id,
      name: subcategory.name,
      category_id: subcategory.category_id?._id,
      category: subcategory.category_id?.name
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== Get By CategoryId ==================
const getSubcategoryByCategoryId = async (req, res) => {
  try {
    const { id } = req.params; // category_id

    const subcategories = await Subcategory.find({ category_id: id });

    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== Update ==============================
const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category_id } = req.body;

    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      { name, category_id },
      { new: true }
    );

    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    res.json({ message: "Subcategory Updated", subcategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== Delete ==============================
const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findByIdAndDelete(id);

    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    res.json({ message: "Subcategory Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  getSubcategoryByCategoryId,
  updateSubcategory,
  deleteSubcategory
};

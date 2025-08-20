const db = require("../db/db");

// ================ Post =========================

const createSubcategory = (req, res) => {
  const { name, category_id } = req.body;
  if (!name || !category_id) {
    return res.status(400).json({ message: "Name and Category ID are required" });
  }

  db.query(
    "INSERT INTO subcategories (name, category_id) VALUES (?, ?)",
    [name, category_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, name, category_id });
    }
  );
};

// ================== Get ==============================

const getSubcategories = (req, res) => {
  db.query(
    `SELECT subcategories.id, subcategories.name, subcategories.category_id, categories.name AS category 
     FROM subcategories 
     JOIN categories ON subcategories.category_id = categories.id`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};
// ================== Get By ID ==============================

const getSubcategoryById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT subcategories.id, subcategories.name, categories.name AS category, categories.id AS category_id
     FROM subcategories 
     JOIN categories ON subcategories.category_id = categories.id
     WHERE subcategories.id = ?`,
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
      res.json(results[0]); // ek hi record milega
    }
  );
};
// ================== Get By CategoryId ==================
const getSubcategoryByCategoryId = (req, res) => {
  const { id } = req.params; // yaha id = category_id hoga
  db.query(
    "SELECT * FROM subcategories WHERE category_id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};


// ================== Update ==============================

const updateSubcategory = (req, res) => {
  const { id } = req.params;
  const { name, category_id } = req.body;

  db.query(
    "UPDATE subcategories SET name=?, category_id=? WHERE id=?",
    [name, category_id, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Subcategory Updated" });
    }
  );
};

// ================== Delete ==============================

const deleteSubcategory = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM subcategories WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Subcategory Deleted" });
  });
};

module.exports = {createSubcategory,getSubcategories, getSubcategoryById, getSubcategoryByCategoryId, updateSubcategory,deleteSubcategory,};

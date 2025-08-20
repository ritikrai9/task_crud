
const db = require("../db/db");


// ================= Post =============================

const createProduct = (req, res) => {
  const { name, price, description, subcategory_id } = req.body;

  if (!name || !price || !subcategory_id) {
    return res
      .status(400)
      .json({ message: "Name, Price and Subcategory ID are required" });
  }

  db.query(
    "INSERT INTO products (name, price, description, subcategory_id) VALUES (?, ?, ?, ?)",
    [name, price, description, subcategory_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({
        id: result.insertId,
        name,
        price,
        description,
        subcategory_id,
      });
    }
  );
};

// ================= Get=============================

const getProducts = (req, res) => {
  db.query(
    `SELECT 
  p.id,
  p.name,
  p.price,
  p.description,
  p.subcategory_id,
  s.category_id,
  c.name AS category,
  s.name AS subcategory
FROM products p
JOIN subcategories s ON p.subcategory_id = s.id
JOIN categories c ON s.category_id = c.id

`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};
// ================= Update =============================

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, description, subcategory_id } = req.body;

  db.query(
    "UPDATE products SET name=?, price=?, description=?, subcategory_id=? WHERE id=?",
    [name, price, description, subcategory_id, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Product Updated" });
    }
  );
};

// ================= Delete =============================

const deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Product Deleted" });
  });
};

module.exports = {createProduct,getProducts,updateProduct,deleteProduct,};

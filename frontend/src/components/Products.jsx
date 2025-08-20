import { useEffect, useState } from "react";
import axios from "axios";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  // Form States
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  const [editId, setEditId] = useState(null); // 🔹 Track editing product

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category/all");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // ✅ Fetch All Subcategories (without filter)
  const fetchSubcategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/subcategory");
      setSubcategories(res.data);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  // ✅ Add or Update Product
  const saveProduct = async () => {
    if (!name || !price || !categoryId || !subcategoryId) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      if (editId) {
        // 🔹 Update existing product
            await axios.patch(`http://localhost:5000/products/${editId}`, {
        name,
        price,
        description: desc,
        category_id: categoryId,
        subcategory_id: subcategoryId,
      });
        setEditId(null);
      } else {
        // 🔹 Add new product
        await axios.post("http://localhost:5000/products", {
          name,
          price,
          description: desc,
          category_id: categoryId,
          subcategory_id: subcategoryId,
        });
      }

      // Reset form
      setName("");
      setPrice("");
      setDesc("");
      setCategoryId("");
      setSubcategoryId("");
      setFilteredSubcategories([]);

      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // ✅ Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // ✅ Handle Category Change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategoryId(selectedCategory);
    setSubcategoryId("");

    // ⚡ Filter subcategories on category change
    const filtered = subcategories.filter(
      (s) => String(s.category_id) === String(selectedCategory)
    );
    setFilteredSubcategories(filtered);
  };

  // ✅ Handle Edit Click
  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    setDesc(product.description);
    setCategoryId(product.category_id);
    setSubcategoryId(product.subcategory_id);

    // Pre-fill subcategories for that category
    const filtered = subcategories.filter(
      (s) => String(s.category_id) === String(product.category_id)
    );
    setFilteredSubcategories(filtered);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <div className="p-5 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-3">📦 Products</h2>

      {/* Product Form */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        <input
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          className="border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
        />
        <input
          className="border p-2 rounded"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />

        {/* Category Select */}
        <select
          className="border p-2 rounded"
          value={categoryId}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Subcategory Select */}
        <select
          className="border p-2 rounded"
          value={subcategoryId}
          onChange={(e) => setSubcategoryId(e.target.value)}
          disabled={!categoryId}
        >
          <option value="">Select Subcategory</option>
          {filteredSubcategories.length > 0 ? (
            filteredSubcategories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))
          ) : (
            <option value="">No Subcategory Found</option>
          )}
        </select>
      </div>

      <button
        className={`${
          editId ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"
        } text-white px-4 py-2 rounded mb-3`}
        onClick={saveProduct}
      >
        {editId ? "✏️ Update Product" : "➕ Add Product"}
      </button>

      {/* Product Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Subcategory</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">₹{p.price}</td>
                <td className="border p-2">{p.description}</td>
                <td className="border p-2">{p.category}</td>
                <td className="border p-2">{p.subcategory}</td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(p)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => deleteProduct(p.id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-2 text-center" colSpan="6">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null); // ✅ Track which category is being edited

// ========================= Fetch categories =========================

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category/all");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

// ================== Add or Update category ============================

  const saveCategory = async () => {
    if (!name.trim()) return alert("Please enter category name");
    try {
      if (editId) {
        // ✅ Update existing category
        await axios.put(`http://localhost:5000/category/${editId}`, { name });
        setEditId(null);
      } else {
        // ✅ Add new category
        await axios.post("http://localhost:5000/category", { name });
      }
      setName("");
      fetchCategories();
    } catch (err) {
      console.error("Error saving category", err);
    }
  };

// =================== Delete category =================

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/category/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category", err);
    }
  };

// ================ Set edit mode ================

  const editCategory = (category) => {
    setName(category.name);
    setEditId(category.id);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-5 bg-white shadow rounded max-w-md mx-auto mt-5">
      <h2 className="text-xl font-bold mb-3">Categories</h2>

      <div className="flex gap-2 mb-3">
        <input
          className="border p-2 flex-1 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
        />
        <button
          className={`${
            editId ? "bg-green-500" : "bg-blue-500"
          } text-white px-4 py-2 rounded`}
          onClick={saveCategory}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {categories.map((c) => (
          <li
            key={c.id}
            className="flex justify-between border-b py-2 items-center"
          >
            <span>{c.name}</span>
            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => editCategory(c)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteCategory(c.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

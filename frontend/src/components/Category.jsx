import { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category/all");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  // ✅ Add category
  const addCategory = async () => {
    if (!name.trim()) return alert("Please enter category name");
    try {
      await axios.post("http://localhost:5000/category", { name });
      setName("");
      fetchCategories();
    } catch (err) {
      console.error("Error adding category", err);
    }
  };

  // ✅ Delete category
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/category/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category", err);
    }
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addCategory}
        >
          Add
        </button>
      </div>

      <ul>
        {categories.map((c) => (
          <li
            key={c.id}
            className="flex justify-between border-b py-2 items-center"
          >
            <span>{c.name}</span>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => deleteCategory(c.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

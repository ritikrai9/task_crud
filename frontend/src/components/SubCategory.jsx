import { useEffect, useState } from "react";
import axios from "axios";

export default function Subcategory() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editId, setEditId] = useState(null); // ✅ for update mode

  // ✅ Fetch Subcategories
  const fetchSubcategories = async () => {
    const res = await axios.get("http://localhost:5000/subcategory");
    setSubcategories(res.data);
  };

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/category/all");
    setCategories(res.data);
  };

  // ✅ Add or Update Subcategory
  const saveSubcategory = async () => {
    if (!name || !categoryId) {
      alert("Please enter all fields");
      return;
    }

    if (editId) {
      // 🔹 Update existing
      await axios.put(`http://localhost:5000/subcategory/${editId}`, {
        name,
        category_id: categoryId,
      });
      setEditId(null);
    } else {
      // 🔹 Add new
      await axios.post("http://localhost:5000/subcategory", {
        name,
        category_id: categoryId,
      });
    }

    setName("");
    setCategoryId("");
    fetchSubcategories();
  };

  // ✅ Delete Subcategory
  const deleteSubcategory = async (id) => {
    await axios.delete(`http://localhost:5000/subcategory/${id}`);
    fetchSubcategories();
  };

  // ✅ Set subcategory in edit mode
  const editSubcategory = (sub) => {
    setName(sub.name);
    setCategoryId(sub.category_id);
    setEditId(sub.id);
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <div className="p-5 bg-white shadow rounded mt-5 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-3">Subcategories</h2>

      {/* Form */}
      <div className="flex gap-2 mb-3">
        <input
          className="border p-2 flex-1 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subcategory Name"
        />
        <select
          className="border p-2 flex-1 rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          className={`${
            editId ? "bg-yellow-500" : "bg-green-500"
          } text-white px-4 py-2 rounded`}
          onClick={saveSubcategory}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">Subcategory</th>
            <th className="border px-3 py-2">Category</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((s) => (
            <tr key={s.id}>
              <td className="border px-3 py-2">{s.id}</td>
              <td className="border px-3 py-2">{s.name}</td>
              <td className="border px-3 py-2">{s.category}</td>
              <td className="border px-3 py-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => editSubcategory(s)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteSubcategory(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

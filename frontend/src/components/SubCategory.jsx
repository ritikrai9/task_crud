import { useEffect, useState } from "react";
import axios from "axios";

export default function Subcategory() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const fetchSubcategories = async () => {
    const res = await axios.get("http://localhost:5000/subcategory");
    setSubcategories(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/category/all");
    setCategories(res.data);
  };

  const addSubcategory = async () => {
    await axios.post("http://localhost:5000/subcategory", {
      name,
      category_id: categoryId,
    });
    setName("");
    setCategoryId("");
    fetchSubcategories();
  };

  const deleteSubcategory = async (id) => {
    await axios.delete(`http://localhost:5000/subcategories/${id}`);
    fetchSubcategories();
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <div className="p-5 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-3">Subcategories</h2>
      <div className="flex gap-2 mb-3">
        <input
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subcategory Name"
        />
        <select
          className="border p-2"
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
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={addSubcategory}
        >
          Add
        </button>
      </div>

      <ul>
        {subcategories.map((s) => (
          <li key={s.id} className="flex justify-between border-b py-2">
            {s.name} (Category: {s.category})
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => deleteSubcategory(s.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

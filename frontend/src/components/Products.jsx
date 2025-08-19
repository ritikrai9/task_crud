import { useEffect, useState } from "react";
import axios from "axios";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProducts(res.data);
  };

  const fetchSubcategories = async () => {
    const res = await axios.get("http://localhost:5000/subcategory");
    setSubcategories(res.data);
  };

  const addProduct = async () => {
    await axios.post("http://localhost:5000/products", {
      name,
      price,
      description: desc,
      subcategory_id: subcategoryId,
    });
    setName("");
    setPrice("");
    setDesc("");
    setSubcategoryId("");
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
    fetchSubcategories();
  }, []);

  return (
    <div className="p-5 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-3">Products</h2>
      <div className="grid grid-cols-4 gap-2 mb-3">
        <input
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          className="border p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
        />
        <input
          className="border p-2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />
        <select
          className="border p-2"
          value={subcategoryId}
          onChange={(e) => setSubcategoryId(e.target.value)}
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded mb-3"
        onClick={addProduct}
      >
        Add Product
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Subcategory</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.price}</td>
              <td className="border p-2">{p.description}</td>
              <td className="border p-2">{p.subcategory}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteProduct(p.id)}
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

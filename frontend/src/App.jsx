import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Category from "./components/Category";
import Subcategory from "./components/SubCategory";
import Product from ".//components/Products";

export default function App() {
  return (
    <Router>
      <div className="p-5 bg-gray-100 min-h-screen">
        <nav className="flex gap-5 mb-5 bg-white p-3 shadow rounded">
          <Link to="/categories">Categories</Link>
          <Link to="/subcategories">Subcategories</Link>
          <Link to="/products">Products</Link>
        </nav>

        <Routes>
          <Route path="/categories" element={<Category />} />
          <Route path="/subcategories" element={<Subcategory />} />
          <Route path="/products" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
}

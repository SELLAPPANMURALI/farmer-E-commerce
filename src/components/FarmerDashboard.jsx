import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FarmerDashboard.css"; // Add CSS for styling

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Replace with your backend API endpoint
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("farmerToken");
    navigate("/farmer-login");
  };

  const handleAddProduct = () => {
    navigate("/add-product"); // Navigate to the Add Product page
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Farmer Dashboard</h1>
        <div>
          <button onClick={handleAddProduct} className="btn-add">➕ Add Product</button>
          <button onClick={handleLogout} className="btn-logout">🚪 Logout</button>
        </div>
      </header>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h2>{product.name}</h2>
                <p>Price: ₹{product.price}</p>
                <p>Quantity: {product.quantity} kg</p>
              </div>
            ))
          ) : (
            <p>No products available. Add some!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;

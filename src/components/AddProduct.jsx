import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => formData.append(key, value));

    try {
      const token = localStorage.getItem("farmerToken");
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully");
      navigate("/farmer-dashboard");
    } catch (error) {
      console.error("Add product error:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number" name="price" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Quantity</label>
          <input type="number" name="quantity" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Image</label>
          <input type="file" name="image" className="form-control" accept="image/*" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./AddProduct.css";

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     image: null,
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setProduct({ ...product, image: files[0] });
//     } else {
//       setProduct({ ...product, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     // ✅ Append product fields
//     Object.entries(product).forEach(([key, value]) => formData.append(key, value));

//     // ✅ Add farmerId from localStorage (must be stored after login)
//     const farmerId = localStorage.getItem("farmerId");
//     if (!farmerId) {
//       alert("Farmer ID not found. Please log in again.");
//       return;
//     }
//     formData.append("farmerId", farmerId);

//     try {
//       const token = localStorage.getItem("farmerToken");
//       await axios.post("http://localhost:5000/api/products", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Product added successfully");
//       navigate("/farmer-dashboard");
//     } catch (error) {
//       console.error("Add product error:", error);
//       alert("Failed to add product");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Add Product</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="mb-3">
//           <label>Name</label>
//           <input type="text" name="name" className="form-control" onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Price</label>
//           <input type="number" name="price" className="form-control" onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Quantity</label>
//           <input type="number" name="quantity" className="form-control" onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Image</label>
//           <input type="file" name="image" className="form-control" accept="image/*" onChange={handleChange} required />
//         </div>
//         <button type="submit" className="btn btn-success">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/FarmerLogin.css";

const FarmerLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/farmers/login`,
        { email, password }
      );

      const farmer = response.data;
      login(farmer); // Store farmer data in context (optional)
      localStorage.setItem("farmerId", farmer.id); // ✅ Store farmerId for later use

      alert("Login successful!");
      navigate("/farmer-dashboard");
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="farmer-login-container">
      <h2>Farmer Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default FarmerLogin;

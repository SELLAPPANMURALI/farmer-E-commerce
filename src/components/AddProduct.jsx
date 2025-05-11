

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


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setProduct({ ...product, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("price", product.price);
//     formData.append("quantity", product.quantity);
//     formData.append("image", product.image);

//     // ✅ Append farmerId from localStorage
//     const farmerId = localStorage.getItem("farmerId");
//     formData.append("farmerId", farmerId);

//     try {
//       await axios.post("http://localhost:5000/api/products", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Product added successfully");
//       navigate("/farmer-dashboard");
//     } catch (error) {
//       console.error("Failed to add product:", error);
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
//           <label>Product Image</label>
//           <input type="file" name="image" className="form-control" onChange={handleImageChange} />
//         </div>
//         <button type="submit" className="btn btn-primary">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

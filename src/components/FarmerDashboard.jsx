// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./FarmerDashboard.css"; // Add CSS for styling

// const FarmerDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/products"); // Replace with your backend API endpoint
//         setProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("farmerToken");
//     navigate("/farmer-login");
//   };

//   const handleAddProduct = () => {
//     navigate("/add-product"); // Navigate to the Add Product page
//   };

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1>Farmer Dashboard</h1>
//         <div>
//           <button onClick={handleAddProduct} className="btn-add">➕ Add Product</button>
//           <button onClick={handleLogout} className="btn-logout">🚪 Logout</button>
//         </div>
//       </header>

//       {loading ? (
//         <p>Loading products...</p>
//       ) : (
//         <div className="product-list">
//           {products.length > 0 ? (
//             products.map((product) => (
//               <div key={product._id} className="product-card">
//                 <img src={product.image} alt={product.name} className="product-image" />
//                 <h2>{product.name}</h2>
//                 <p>Price: ₹{product.price}</p>
//                 <p>Quantity: {product.quantity} kg</p>
//               </div>
//             ))
//           ) : (
//             <p>No products available. Add some!</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FarmerDashboard;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./FarmerDashboard.css";

// const FarmerDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem("farmerToken");
//       const response = await axios.get("http://localhost:5000/api/products/my", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Failed to fetch products", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("farmerToken");
//     navigate("/farmer-login");
//   };

//   const handleAddProduct = () => {
//     navigate("/add-product");
//   };

//   const handleEdit = (id) => {
//     navigate(`/edit-product/${id}`);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         const token = localStorage.getItem("farmerToken");
//         await axios.delete(`http://localhost:5000/api/products/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         fetchProducts();
//       } catch (error) {
//         console.error("Delete failed", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h2>Welcome, Farmer!</h2>
//         <div>
//           <button className="btn btn-success me-2" onClick={handleAddProduct}>Add Product</button>
//           <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//         </div>
//       </div>

//       <div className="product-list">
//         {products.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           products.map((product) => (
//             <div key={product._id} className="product-card">
//               <img src={product.imageUrl} alt={product.name} className="product-image" />
//               <h5>{product.name}</h5>
//               <p>Price: ₹{product.price}</p>
//               <p>Quantity: {product.quantity}</p>
//               <div>
//                 <button className="btn btn-primary me-2" onClick={() => handleEdit(product._id)}>Edit</button>
//                 <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default FarmerDashboard;



// import React, { useEffect, useState } from "react";
// import { useNavigate, Route, Routes } from "react-router-dom";
// import axios from "axios";
// import AddProduct from "./AddProduct";
// import EditProduct from "./EditProduct";
// import "./FarmerDashboard.css"; // Add any necessary styles here

// const FarmerDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   // Fetch products of the logged-in farmer
//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem("farmerToken");
//       const response = await axios.get("http://localhost:5000/api/products/my", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Failed to fetch products", error);
//     }
//   };

//   // Handle product deletion
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         const token = localStorage.getItem("farmerToken");
//         await axios.delete(`http://localhost:5000/api/products/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         fetchProducts();
//       } catch (error) {
//         console.error("Delete failed", error);
//       }
//     }
//   };

//   // Handle navigation to AddProduct page
//   const handleAddProduct = () => {
//     navigate("/farmer-dashboard/add-product");
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("farmerToken");
//     navigate("/farmer-login");
//   };

//   // Handle product edit
//   const handleEdit = (id) => {
//     navigate(`/farmer-dashboard/edit-product/${id}`);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h2>Welcome, Farmer!</h2>
//         <div>
//           <button className="btn btn-success me-2" onClick={handleAddProduct}>Add Product</button>
//           <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//         </div>
//       </div>

//       {/* Routes for AddProduct and EditProduct */}
//       <Routes>
//         <Route path="add-product" element={<AddProduct />} />
//         <Route path="edit-product/:id" element={<EditProduct />} />
//       </Routes>

//       {/* Product List */}
//       <div className="product-list">
//         {products.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           products.map((product) => (
//             <div key={product._id} className="product-card">
//               <img src={product.imageUrl} alt={product.name} className="product-image" />
//               <h5>{product.name}</h5>
//               <p>Price: ₹{product.price}</p>
//               <p>Quantity: {product.quantity}</p>
//               <div>
//                 <button className="btn btn-primary me-2" onClick={() => handleEdit(product._id)}>Edit</button>
//                 <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default FarmerDashboard;


import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import "./FarmerDashboard.css";

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("farmerToken");
      const response = await axios.get("http://localhost:5000/api/products/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("farmerToken");
    navigate("/farmer-login");
  };

  const handleAddProduct = () => {
    navigate("add-product");
  };

  const handleEdit = (id) => {
    navigate(`edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("farmerToken");
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchProducts();
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [location.pathname]); // 🔁 Refresh products on route change

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, Farmer!</h2>
        <div>
          <button className="btn btn-success me-2" onClick={handleAddProduct}>Add Product</button>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <Routes>
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
      </Routes>

      {location.pathname === "/farmer-dashboard" && (
        <div className="product-list">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <h5>{product.name}</h5>
                <p>Price: ₹{product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <div>
                  <button className="btn btn-primary me-2" onClick={() => handleEdit(product._id)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;

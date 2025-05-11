// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./FarmerDashboard.css";

// const FarmerDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     image: null,
//   });

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/products");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData({ ...formData, image: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleAddOrUpdateProduct = async (e) => {
//     e.preventDefault();

//     const storedFarmer = JSON.parse(localStorage.getItem("farmer"));
//     const farmerId = storedFarmer?.id;

//     const productData = new FormData();
//     productData.append("name", formData.name);
//     productData.append("price", formData.price);
//     productData.append("quantity", formData.quantity);
//     productData.append("farmerId", farmerId); // ✅ This is critical
//     if (formData.image) productData.append("image", formData.image);

//     try {
//       if (editingProduct) {
//         await axios.put(
//           `http://localhost:5000/api/products/${editingProduct}`,
//           productData
//         );
//       } else {
//         await axios.post("http://localhost:5000/api/products", productData);
//       }

//       setFormData({ name: "", price: "", quantity: "", image: null });
//       setEditingProduct(null);
//       fetchProducts();
//     } catch (error) {
//       console.error("Error saving product", error);
//     }
//   };

//   const handleEditClick = (product) => {
//     setEditingProduct(product.id);
//     setFormData({
//       name: product.name,
//       price: product.price,
//       quantity: product.quantity,
//       image: null,
//     });
//   };

//   const handleDeleteProduct = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/products/${id}`);
//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product", error);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Farmer Dashboard</h2>

//       <form onSubmit={handleAddOrUpdateProduct} className="product-form" encType="multipart/form-data">
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="quantity"
//           placeholder="Quantity"
//           value={formData.quantity}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={handleChange}
//         />
//         <button type="submit">{editingProduct ? "Update Product" : "Add Product"}</button>
//       </form>

//       <table className="product-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price ₹</th>
//             <th>Quantity</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((prod) => (
//             <tr key={prod.id}>
//               <td>{prod.name}</td>
//               <td>{prod.price}</td>
//               <td>{prod.quantity}</td>
//               <td>
//                 {prod.imageUrl && (
//                   <img
//                     src={`http://localhost:5000/images/${prod.imageUrl}`}
//                     alt={prod.name}
//                     width="60"
//                   />
//                 )}
//               </td>
//               <td>
//                 <button onClick={() => handleEditClick(prod)}>Edit</button>
//                 <button onClick={() => handleDeleteProduct(prod.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FarmerDashboard;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./FarmerDashboard.css";

// const FarmerDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const farmerId = localStorage.getItem("farmerId");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("farmerToken");
//         const response = await axios.get("http://localhost:5000/api/products", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // ✅ Filter only products added by the logged-in farmer
//         const filtered = response.data.filter(
//           (product) => String(product.farmerId) === String(farmerId)
//         );
//         setProducts(filtered);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, [farmerId]);

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("farmerToken");
//       await axios.delete(`http://localhost:5000/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(products.filter((p) => p.id !== id));
//     } catch (error) {
//       console.error("Delete failed:", error);
//       alert("Failed to delete product");
//     }
//   };

//   return (
//     <div className="container mt-5 dashboard-container">
//       <div className="dashboard-header">
//         <h2>Welcome Farmer</h2>
//         <Link to="/add-product" className="btn btn-success">
//           ➕ Add New Product
//         </Link>
//       </div>

//       <div className="row">
//         {products.map((product) => (
//           <div key={product.id} className="col-md-4 mb-4">
//             <div className="card h-100">
//               <img
//                 src={`http://localhost:5000/uploads/${product.imageUrl}`}
//                 alt={product.name}
//                 className="card-img-top"
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p>Price: ₹{product.price}</p>
//                 <p>Quantity: {product.quantity}</p>
//                 <div className="d-flex justify-content-between">
//                   <Link to={`/edit-product/${product.id}`} className="btn btn-warning">
//                     ✏️ Edit
//                   </Link>
//                   <button onClick={() => handleDelete(product.id)} className="btn btn-danger">
//                     🗑️ Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FarmerDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FarmerDashboard.css";

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    image: null,
  });

  const storedFarmer = JSON.parse(localStorage.getItem("farmer"));
  const farmerId = storedFarmer?.id;

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      const allProducts = response.data;
      const filtered = allProducts.filter(
        (p) => String(p.farmerId) === String(farmerId)
      );
      setProducts(filtered);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("price", formData.price);
    productData.append("quantity", formData.quantity);
    productData.append("farmerId", farmerId);
    if (formData.image) productData.append("image", formData.image);

    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/api/products/${editingProduct}`,
          productData
        );
      } else {
        await axios.post("http://localhost:5000/api/products", productData);
      }

      setFormData({ name: "", price: "", quantity: "", image: null });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      image: null,
    });
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Farmer Dashboard</h2>

      <form onSubmit={handleAddOrUpdateProduct} className="product-form" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity kg"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit">{editingProduct ? "Update Product" : "Add Product"}</button>
      </form>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price ₹</th>
            <th>Quantity kg</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.quantity}</td>
              <td>
                {prod.imageUrl && (
                  <img
                    src={`http://localhost:5000/images/${prod.imageUrl}`}
                    alt={prod.name}
                    width="60"
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleEditClick(prod)}>Edit</button>
                <button onClick={() => handleDeleteProduct(prod.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerDashboard;

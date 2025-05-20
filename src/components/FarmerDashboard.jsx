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

//   const storedFarmer = JSON.parse(localStorage.getItem("farmer"));
//   const farmerId = storedFarmer?.id;

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/products");
//       const allProducts = response.data;
//       const filtered = allProducts.filter(
//         (p) => String(p.farmerId) === String(farmerId)
//       );
//       setProducts(filtered);
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

//     const productData = new FormData();
//     productData.append("name", formData.name);
//     productData.append("price", formData.price);
//     productData.append("quantity", formData.quantity);
//     productData.append("farmerId", farmerId);
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
//           placeholder="Quantity kg"
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
//             <th>Quantity kg</th>
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



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Added for navigation
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

      {/* ✅ Link to View Orders */}
      <div className="text-end mb-3">
        <Link to="/farmer-orders" className="btn btn-outline-primary">
          📦 View Orders
        </Link>
      </div>

      <form
        onSubmit={handleAddOrUpdateProduct}
        className="product-form"
        encType="multipart/form-data"
      >
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
        <button type="submit">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
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
                <button onClick={() => handleDeleteProduct(prod.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerDashboard;

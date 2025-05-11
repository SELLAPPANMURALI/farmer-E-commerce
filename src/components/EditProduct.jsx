// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import "./EditProduct.css";

// const EditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     image: null,
//     imageUrl: ""
//   });

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const token = localStorage.getItem("farmerToken");
//         const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const { name, price, quantity, imageUrl } = response.data;
//         setProduct({ name, price, quantity, image: null, imageUrl });
//       } catch (error) {
//         console.error("Failed to fetch product:", error);
//         alert("Failed to load product data");
//       }
//     };
//     fetchProduct();
//   }, [id]);

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
//     formData.append("name", product.name);
//     formData.append("price", product.price);
//     formData.append("quantity", product.quantity);
//     if (product.image) {
//       formData.append("image", product.image);
//     }

//     try {
//       const token = localStorage.getItem("farmerToken");
//       await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Product updated successfully");
//       navigate("/farmer-dashboard");
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Failed to update product");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Edit Product</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="mb-3">
//           <label>Name</label>
//           <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Price</label>
//           <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Quantity</label>
//           <input type="number" name="quantity" className="form-control" value={product.quantity} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Current Image</label><br />
//           {product.imageUrl && <img src={product.imageUrl} alt="Product" className="img-thumbnail mb-2" style={{ maxWidth: "200px" }} />}
//           <input type="file" name="image" className="form-control" accept="image/*" onChange={handleChange} />
//         </div>
//         <button type="submit" className="btn btn-primary">Update Product</button>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;



import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const { name, price, quantity } = response.data;
        setProduct({ name, price, quantity });
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);

    // ✅ Add farmerId from localStorage
    const farmerId = localStorage.getItem("farmerId");
    formData.append("farmerId", farmerId);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product updated successfully");
      navigate("/farmer-dashboard");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Quantity Kg</label>
          <input type="number" name="quantity" className="form-control" value={product.quantity} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Change Image (Optional)</label>
          <input type="file" name="image" className="form-control" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const EditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//   });
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/products/${id}`);
//         const { name, price, quantity } = response.data;
//         setProduct({ name, price, quantity });
//       } catch (err) {
//         console.error("Failed to fetch product:", err);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("price", product.price);
//     formData.append("quantity", product.quantity);

//     // ✅ Attach farmerId from localStorage
//     const farmerId = localStorage.getItem("farmerId");
//     if (!farmerId) {
//       alert("Farmer not logged in.");
//       return;
//     }
//     formData.append("farmerId", farmerId);

//     if (image) {
//       formData.append("image", image);
//     }

//     try {
//       await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Product updated successfully");
//       navigate("/farmer-dashboard");
//     } catch (error) {
//       console.error("Failed to update product:", error);
//       alert("Failed to update product");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Edit Product</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="mb-3">
//           <label>Name</label>
//           <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Price</label>
//           <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Quantity</label>
//           <input type="number" name="quantity" className="form-control" value={product.quantity} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Change Image (Optional)</label>
//           <input type="file" name="image" className="form-control" onChange={handleImageChange} />
//         </div>
//         <button type="submit" className="btn btn-primary">Update Product</button>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;

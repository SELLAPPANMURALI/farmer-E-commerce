// import React, { useContext } from "react"; 
// import { CartContext } from "../context/CartContext";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const products = [
//   { id: 1, name: "Organic Tomatoes", price: 50, unit: "/kg", image: "./images/tomatoes.jpeg" },
//   { id: 2, name: "Farm Fresh Carrots", price: 40, unit: "/kg", image: "./images/Carrots.jpeg" },
//   { id: 3, name: "Drumsticks", price: 30, unit: "/kg", image: "./images/drumstick.jpg" },
//   { id: 4, name: "Organic Potatoes", price: 25, unit: "/kg", image: "./images/potatoe.jpeg" },
//   { id: 5, name: "Organic ladysfinger", price: 40, unit: "/kg", image: "./images/ladysfinger.jpeg" },
//   { id: 6, name: "Fresh RawBanana", price: 65, unit: "/kg", image: "./images/rawbanana.jpeg" },
//   { id: 7, name: "Pumpkins", price: 25, unit: "/kg", image: "./images/Pumpkin.jpeg" },
//   { id: 8, name: "Fresh Brinjal", price: 60, unit: "/kg", image: "./images/Brinjal.jpeg" },
// ];

// const Products = () => {
//   const { addToCart } = useContext(CartContext);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Our Products</h2>
//       <div className="row">
//         {products.map((product) => (
//           <div key={product.id} className="col-md-3">
//             <div className="card mb-4">
//               <img src={product.image} className="card-img-top" alt={product.name} />
//               <div className="card-body text-center">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p className="card-text">Price: ₹{product.price} {product.unit}</p>
//                 <button className="btn btn-success" onClick={() => addToCart(product)}>
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="text-center mt-4">
//         <Link to="/cart" className="btn btn-primary">
//           View Cart
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Products;


import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Products from Farmers</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3">
            <div className="card mb-4">
              <img
                src={`http://localhost:5000/uploads/${product.imageUrl}`}
                className="card-img-top"
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ₹{product.price} /kg</p>
                <p className="card-text">Qty: {product.quantity}</p>
                <button className="btn btn-success" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/cart" className="btn btn-primary">
          View Cart
        </Link>
      </div>
    </div>
  );
};

export default Products;

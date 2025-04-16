// import React from "react";
// import { useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";

// // Sample product data (this should come from an API or state)
// const products = [
//   {
//     id: "1",
//     name: "Organic Tomatoes",
//     image: import("../assets/images/tomatoes.jpeg"),
//     description: "Freshly picked organic tomatoes, straight from the farm.",
//     price: "₹50 per kg",
//   },
//   {
//     id: "2",
//     name: "Farm Fresh Carrots",
//     image: import("../assets/images/Carrots.jpeg"),
//     description: "Crispy and nutritious farm carrots, organically grown.",
//     price: "₹40 per kg",
//   },
//   {
//     id: "3",
//     name: "Fresh Potatoes",
//     image: import("../assets/images/potatoe.jpeg"),
//     description: "Locally grown fresh potatoes, perfect for any meal.",
//     price: "₹30 per kg",
//   },
// ];

// const ProductDetails = () => {
//   const { id } = useParams();
//   const product = products.find((p) => p.id === id);

//   if (!product) {
//     return <h2 className="text-center mt-5">Product not found!</h2>;
//   }

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-6">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="img-fluid rounded shadow"
//           />
//         </div>
//         <div className="col-md-6">
//           <h2>{product.name}</h2>
//           <p>{product.description}</p>
//           <h4 className="text-success">{product.price}</h4>
//           <button className="btn btn-success mt-3">Add to Cart</button>
//           <Link to="/" className="btn btn-outline-secondary mt-3 ms-2">
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;



import React from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

// Image paths from public folder
const products = [
  {
    id: "1",
    name: "Organic Tomatoes",
    image: "/images/tomatoes.jpeg",
    description: "Freshly picked organic tomatoes, straight from the farm.",
    price: "₹50 per kg",
  },
  {
    id: "2",
    name: "Farm Fresh Carrots",
    image: "/images/carrots.jpeg",
    description: "Crispy and nutritious farm carrots, organically grown.",
    price: "₹40 per kg",
  },
  {
    id: "3",
    name: "Fresh Potatoes",
    image: "/images/potatoes.jpeg",
    description: "Locally grown fresh potatoes, perfect for any meal.",
    price: "₹30 per kg",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <h2 className="text-center mt-5">Product not found!</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4 className="text-success">{product.price}</h4>
          <button className="btn btn-success mt-3">Add to Cart</button>
          <Link to="/" className="btn btn-outline-secondary mt-3 ms-2">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


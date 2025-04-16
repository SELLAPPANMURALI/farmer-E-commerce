
// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// //  import "../assets/images/bg.jpg";

// const Home = () => {
//   return (
//     <div>   
//       {/* Hero Section */}
//       <div className="hero-section text-center d-flex align-items-center justify-content-center">
//         <div>
//           <h1 className="text-white">Welcome to Farmer's E-Commerce</h1>
//           <h3 className="text-black "> "Fresh From Farm to Your Table!" 🌱</h3>
//           <h4 className="text-black ">Enjoy the goodness of farm-fresh fruits and vegetables, delivered straight to your doorstep.</h4>
//           <Link to="/products" className="btn btn-light mt-3">
//             Shop Now
//           </Link>
//         </div>
//       </div>

//       {/* Featured Products Section */}
//       <div className="container mt-5">
//         <h2 className="text-center mb-4">Featured Products</h2>
//         <div className="row">
//           <div className="col-md-4">
//             <div className="card">
//               <img
//                 src="./images/tomatoes.jpeg"
//                 className="card-img-top"
//                 alt="organic tomatoes"
//               />
//               <div className="card-body">
//                 <h5 className="card-title">Organic Tomatoes</h5>
//                 <p className="card-text">Freshly picked organic tomatoes.</p>
//                 <Link to="/cart" className="btn btn-success">
//                   Add to Cart
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <img
//                 src="./images/Carrots.jpeg"
//                 className="card-img-top"
//                 alt="Product 2"
//               />
//               <div className="card-body">
//                 <h5 className="card-title">Farm Fresh Carrots</h5>
//                 <p className="card-text">Crispy and nutritious farm carrots.</p>
//                 <Link to="/cart" className="btn btn-success">
//                   Add to Cart
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <img
//                 src="./images/potatoe.jpeg"
//                 className="card-img-top"
//                 alt="Product 3"
//               />
//               <div className="card-body">
//                 <h5 className="card-title">Fresh Potatoes</h5>
//                 <p className="card-text">Locally grown fresh Potatoes.</p>
//                 <Link to="/cart" className="btn btn-success">
//                   Add to Cart
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import bgImage from "../assets/images/bg.jpg"; // Background Image
// import tomatoImage from "/public/images/tomatoes.jpeg";
// import carrotImage from "/public/images/Carrots.jpeg";
// import potatoImage from "/public/images/potatoe.jpeg";

// const Home = () => {
//   return (
//     <div>
//       {/* Hero Section */}
//       <div
//         className="hero-section text-center d-flex align-items-center justify-content-center"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "80vh",
//           color: "white",
//         }}
//       >
//         <div className="p-4 bg-dark bg-opacity-75 rounded">
//           <h1>Welcome to Farmer's E-Commerce</h1>
//           <h3>"Fresh From Farm to Your Table!" 🌱</h3>
//           <h4>
//             Enjoy the goodness of farm-fresh fruits and vegetables, delivered
//             straight to your doorstep.
//           </h4>
//           <Link to="/products" className="btn btn-light mt-3">
//             Shop Now
//           </Link>
//         </div>
//       </div>

//       {/* Featured Products Section */}
//       <div className="container mt-5">
//         <h2 className="text-center mb-4">Featured Products</h2>
//         <div className="row">
//           {[ 
//             { img: tomatoImage, title: "Organic Tomatoes", desc: "Freshly picked organic tomatoes." },
//             { img: carrotImage, title: "Farm Fresh Carrots", desc: "Crispy and nutritious farm carrots." },
//             { img: potatoImage, title: "Fresh Potatoes", desc: "Locally grown fresh Potatoes." },
//           ].map((product, index) => (
//             <div className="col-md-4 mb-4" key={index}>
//               <div className="card h-100">
//                 <img src={product.img} className="card-img-top" alt={product.title} />
//                 <div className="card-body">
//                   <h5 className="card-title">{product.title}</h5>
//                   <p className="card-text">{product.desc}</p>
//                   <Link to="/cart" className="btn btn-success">
//                     Add to Cart
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import bgImage from "../assets/images/bg.jpg"; // Background Image
import tomatoImage from "../assets/images/tomatoes.jpeg";
import carrotImage from "../assets/images/Carrots.jpeg";
import potatoImage from "../assets/images/potatoe.jpeg";

const Home = () => {
  const products = [
    { id: 1, img: tomatoImage, title: "Organic Tomatoes", desc: "Freshly picked organic tomatoes." },
    { id: 2, img: carrotImage, title: "Farm Fresh Carrots", desc: "Crispy and nutritious farm carrots." },
    { id: 3, img: potatoImage, title: "Fresh Potatoes", desc: "Locally grown fresh potatoes." },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div
        className="hero-section text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          color: "white",
        }}
      >
        <div className="p-4 bg-dark bg-opacity-75 rounded">
          <h1>Welcome to Farmer's E-Commerce</h1>
          <h3>"Fresh From Farm to Your Table!" 🌱</h3>
          <h4>
            Enjoy the goodness of farm-fresh fruits and vegetables, delivered
            straight to your doorstep.
          </h4>
          <Link to="/products" className="btn btn-light mt-3">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100">
                <img src={product.img} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.desc}</p>
                  <Link to={`/product/${product.id}`} className="btn btn-primary me-2">
                    View Details
                  </Link>
                  <Link to="/cart" className="btn btn-success">
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

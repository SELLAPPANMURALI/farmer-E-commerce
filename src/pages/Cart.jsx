// import React, { useContext } from "react";
// import { CartContext } from "../context/CartContext";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Cart = () => {
//   const { cartItems, addToCart, removeFromCart, clearItem } = useContext(CartContext);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Shopping Cart 🛒</h2>
//       {cartItems.length === 0 ? (
//         <p className="text-center">Your cart is empty!</p>
//       ) : (
//         <div className="row">
//           {cartItems.map((item) => (
//             <div key={item.id} className="col-md-3">
//               <div className="card mb-4">
//                 <img src={item.image} className="card-img-top" alt={item.name} />
//                 <div className="card-body text-center">
//                   <h5 className="card-title">{item.name}</h5>
//                   <p className="card-text">
//                     Price: ₹{item.price} <br />
//                     Total: ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
//                   </p>
//                   <div className="d-flex justify-content-center align-items-center">
//                     <button
//                       className="btn btn-danger me-2"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       ➖
//                     </button>
//                     <span className="fw-bold">{item.quantity}</span>
//                     <button className="btn btn-success ms-2" onClick={() => addToCart(item)}>
//                       ➕
//                     </button>
//                   </div>
//                   <button className="btn btn-warning mt-2" onClick={() => clearItem(item.id)}>
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



// import React, { useContext } from "react";
// import { CartContext } from "../context/CartContext";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Cart = () => {
//   const { cartItems, addToCart, removeFromCart, clearItem } = useContext(CartContext);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Shopping Cart 🛒</h2>
//       {cartItems.length === 0 ? (
//         <p className="text-center">Your cart is empty!</p>
//       ) : (
//         <div className="row">
//           {cartItems.map((item) => (
//             <div key={item.id} className="col-md-3">
//               <div className="card mb-4">
//                 <img
//                   src={`http://localhost:5000/uploads/${item.imageUrl}`}
//                   className="card-img-top"
//                   alt={item.name}
//                 />
//                 <div className="card-body text-center">
//                   <h5 className="card-title">{item.name}</h5>
//                   <p className="card-text">
//                     Price: ₹{item.price} <br />
//                     Total: ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
//                   </p>
//                   <div className="d-flex justify-content-center align-items-center">
//                     <button
//                       className="btn btn-danger me-2"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       ➖
//                     </button>
//                     <span className="fw-bold">{item.quantity}</span>
//                     <button className="btn btn-success ms-2" onClick={() => addToCart(item)}>
//                       ➕
//                     </button>
//                   </div>
//                   <button className="btn btn-warning mt-2" onClick={() => clearItem(item.id)}>
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearItem } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const isLoggedIn = !!localStorage.getItem("consumerToken"); // you can change to farmerToken if needed

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert("Please log in to place your order.");
      return;
    }

    // Simulate placing order
    setOrderPlaced(true);
    alert(`Order placed using ${paymentMethod}!`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shopping Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty!</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item.id} className="col-md-3">
                <div className="card mb-4">
                  <img
                    src={`http://localhost:5000/uploads/${item.imageUrl}`}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">
                      Price: ₹{item.price} <br />
                      Total: ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ➖
                      </button>
                      <span className="fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-success ms-2"
                        onClick={() => addToCart(item)}
                      >
                        ➕
                      </button>
                    </div>
                    <button
                      className="btn btn-warning mt-2"
                      onClick={() => clearItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 🛍️ Checkout Section */}
          <div className="text-center mt-4">
            <h5>Select Payment Method:</h5>
            <div className="form-check d-inline-block mx-3">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Cash on Delivery</label>
            </div>
            <div className="form-check d-inline-block mx-3">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                value="GPay"
                checked={paymentMethod === "GPay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">GPay / UPI</label>
            </div>
            <div className="mt-3">
              <button className="btn btn-primary" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>

          {/* 🚚 Order Tracking (Simple Flipkart Style) */}
          {orderPlaced && (
            <div className="mt-5">
              <h4 className="text-success text-center">Order Tracking 🚚</h4>
              <ul className="list-group list-group-flush text-center">
                <li className="list-group-item text-primary">Order Placed ✅</li>
                <li className="list-group-item text-warning">Packing in Progress 📦</li>
                <li className="list-group-item text-info">Out for Delivery 🛵</li>
                <li className="list-group-item text-success">Delivered ✔️</li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;

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



import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearItem } = useContext(CartContext);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shopping Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty!</p>
      ) : (
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
                    <button className="btn btn-success ms-2" onClick={() => addToCart(item)}>
                      ➕
                    </button>
                  </div>
                  <button className="btn btn-warning mt-2" onClick={() => clearItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;

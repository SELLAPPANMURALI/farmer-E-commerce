import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DeliveryTracker from "../components/DeliveryTracker";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearItem, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const isLoggedIn = !!localStorage.getItem("consumerToken");

  // ✅ DEBUG LOGS
  console.log("cartItems on render:", cartItems);
  console.log("localStorage cart:", localStorage.getItem("cart"));

  // const handleBuyNow = async () => {
  //   if (!isLoggedIn) {
  //     alert("Please log in to place your order.");
  //     return;
  //   }

  //   const consumerId = parseInt(localStorage.getItem("consumerId"));
  //   const consumerAddress = localStorage.getItem("consumerAddress");
  //   const consumerMobile = localStorage.getItem("consumerMobile");

  //   if (!consumerId || !consumerAddress || !consumerMobile) {
  //     alert("Missing consumer details. Please login again.");
  //     return;
  //   }

  //   for (const item of cartItems) {
  //     const orderData = {
  //       productId: parseInt(item.id),
  //       farmerId: parseInt(item.farmerId),
  //       consumerId: consumerId,
  //       quantity: parseInt(item.quantity),
  //       paymentMethod: paymentMethod,
  //       paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
  //       consumerAddress: consumerAddress,
  //       consumerMobile: consumerMobile,
  //     };

  //     try {
  //       const response = await fetch("http://localhost:5000/api/orders/place", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(orderData),
  //       });

  //       if (!response.ok) {
  //         const msg = await response.text();
  //         console.error("Server responded with:", msg);
  //         throw new Error("Order failed!");
  //       }
  //     } catch (err) {
  //       alert("Something went wrong while placing the order.");
  //       console.error("Order Error:", err);
  //       return;
  //     }
  //   }

  //   setOrderPlaced(true);
  //   clearCart(); // ✅ clear cart after placing order
  //   alert(`Order placed using ${paymentMethod}!`);
  // };


      const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handleBuyNow = async () => {
  if (!isLoggedIn) {
    alert("Please log in to place your order.");
    return;
  }

  const consumerId = parseInt(localStorage.getItem("consumerId"));
  const consumerAddress = localStorage.getItem("consumerAddress");
  const consumerMobile = localStorage.getItem("consumerMobile");

  if (!consumerId || !consumerAddress || !consumerMobile) {
    alert("Missing consumer details. Please login again.");
    return;
  }

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  if (paymentMethod === "GPay") {
    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) {
      alert("Failed to load Razorpay SDK.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/payment/create-order?amount=${totalAmount}`,
        { method: "POST" }
      );
      const data = await res.json();

      const options = {
        key: "rzp_test_RdzH3tm8u6zXny", // Your Razorpay test key
        amount: data.amount,
        currency: data.currency,
        name: "Farmer E-Commerce",
        description: "Product Payment",
        order_id: data.orderId,
        handler: async function (response) {
          for (const item of cartItems) {
            const orderData = {
              productId: parseInt(item.id),
              farmerId: parseInt(item.farmerId),
              consumerId,
              quantity: parseInt(item.quantity),
              paymentMethod: "UPI",
              paymentStatus: "Paid",
              consumerAddress,
              consumerMobile,
            };

            await fetch("http://localhost:5000/api/orders/place", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
            });
          }

          clearCart();
          setOrderPlaced(true);
          alert("Payment Successful & Order Placed!");
        },
        prefill: {
          name: localStorage.getItem("consumerName") || "",
          contact: consumerMobile,
        },
        theme: { color: "#1976d2" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      alert("Payment failed. Try again.");
    }
  } else {
    // COD Flow
    for (const item of cartItems) {
      const orderData = {
        productId: parseInt(item.id),
        farmerId: parseInt(item.farmerId),
        consumerId,
        quantity: parseInt(item.quantity),
        paymentMethod: "COD",
        paymentStatus: "Pending",
        consumerAddress,
        consumerMobile,
      };

      try {
        const response = await fetch("http://localhost:5000/api/orders/place", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          const msg = await response.text();
          console.error("Server responded with:", msg);
          throw new Error("Order failed!");
        }
      } catch (err) {
        alert("Something went wrong while placing the order.");
        console.error("Order Error:", err);
        return;
      }
    }

    clearCart();
    setOrderPlaced(true);
    alert("Order placed using Cash on Delivery!");
  }
};


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shopping Cart 🛒</h2>

      {cartItems.length === 0 && !orderPlaced ? (
        <p className="text-center">Your cart is empty!</p>
      ) : (
        <>
          {!orderPlaced ? (
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
                          <button className="btn btn-danger me-2" onClick={() => removeFromCart(item.id)}>➖</button>
                          <span className="fw-bold">{item.quantity}</span>
                          <button className="btn btn-success ms-2" onClick={() => addToCart(item)}>➕</button>
                        </div>
                        <button className="btn btn-warning mt-2" onClick={() => clearItem(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Section */}
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
            </>
          ) : (
            <div className="mt-5">
              <h4 className="text-success text-center mb-4">Order Tracking 🚚</h4>
              <DeliveryTracker currentStatus="Packing in Progress" />
              <p className="text-center mt-3">Thanks for your order! You'll receive updates as it progresses.</p>
            </div>
          )}

          {/* My Orders Button */}
          {isLoggedIn && (
            <div className="text-center mt-4">
              <Link to="/consumer-orders" className="btn btn-outline-primary">
                📦 View My Orders
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;

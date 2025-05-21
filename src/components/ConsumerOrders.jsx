import React, { useEffect, useState } from "react";
import DeliveryTracker from "../components/DeliveryTracker";

const ConsumerOrders = () => {
  const [orders, setOrders] = useState([]);
  const consumerId = localStorage.getItem("consumerId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/consumer/${consumerId}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch consumer orders", err);
      }
    };

    if (consumerId) {
      fetchOrders();
    }
  }, [consumerId]);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">🧾 Your Orders</h3>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border rounded p-3 mb-4 shadow-sm">
            <h5>{order.productName}</h5>
            <p>
              Quantity: <strong>{order.quantity}</strong> <br />
              Payment: {order.paymentMethod} <br />
              Status: {order.paymentStatus} <br />
              Date: {order.orderDate?.replace("T", " ").substring(0, 16)} <br />
            </p>
            <DeliveryTracker currentStatus={order.deliveryStatus} />
          </div>
        ))
      )}
    </div>
  );
};

export default ConsumerOrders;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const FarmerOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const farmerId = localStorage.getItem("farmerId");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/orders/farmer/${farmerId}`);
//         setOrders(response.data);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       }
//     };

//     if (farmerId) fetchOrders();
//   }, [farmerId]);

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/orders/delivery-status/${orderId}`,
//         { deliveryStatus: newStatus }
//       );
//       // Refresh the order list to reflect the update
//       const updatedOrders = orders.map((order) =>
//         order.id === orderId ? { ...order, deliveryStatus: newStatus } : order
//       );
//       setOrders(updatedOrders);
//     } catch (err) {
//       console.error("Failed to update delivery status:", err);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">📦 Orders from Consumers</h2>
//       {orders.length === 0 ? (
//         <p className="text-center">No orders found.</p>
//       ) : (
//         <table className="table table-bordered table-striped">
//           <thead className="table-dark text-center">
//             <tr>
//               <th>Order ID</th>
//               <th>Product</th>
//               <th>Consumer</th>
//               <th>Mobile</th>
//               <th>Address</th>
//               <th>Quantity</th>
//               <th>Payment</th>
//               <th>Status</th>
//               <th>Delivery Status</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.productName}</td>
//                 <td>{order.consumerName}</td>
//                 <td>{order.consumerMobile}</td>
//                 <td>{order.consumerAddress}</td>
//                 <td>{order.quantity}</td>
//                 <td>{order.paymentMethod}</td>
//                 <td>{order.paymentStatus}</td>
//                 <td>
//                   <select
//                     value={order.deliveryStatus || "Order Placed"}
//                     onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                     className="form-select"
//                   >
//                     <option value="Order Placed">Order Placed</option>
//                     <option value="Packing in Progress">Packing in Progress</option>
//                     <option value="Out for Delivery">Out for Delivery</option>
//                     <option value="Delivered">Delivered</option>
//                   </select>
//                 </td>
//                 <td>{order.orderDate?.replace("T", " ").substring(0, 16)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default FarmerOrders;


import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const farmerId = localStorage.getItem("farmerId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/farmer/${farmerId}`);
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (farmerId) fetchOrders();
  }, [farmerId]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/delivery-status/${orderId}`,
        { deliveryStatus: newStatus }
      );
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, deliveryStatus: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error("Failed to update delivery status:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📦 Orders from Consumers</h2>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark text-center">
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Consumer</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Quantity</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Delivery Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.productName}</td>
                <td>{order.consumerName}</td>
                <td>{order.consumerMobile}</td>
                <td>{order.consumerAddress}</td>
                <td>{order.quantity}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.paymentStatus}</td>
                <td>
                  <select
                    value={order.deliveryStatus || "Order Placed"}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="form-select"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing in Progress">Packing in Progress</option>
                    <option value="Product Shipped">Product Shipped</option>
                    <option value="Near to You">Near to You</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td>{order.orderDate?.replace("T", " ").substring(0, 16)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FarmerOrders;

// import React, { useEffect, useState } from "react";

// const FarmerOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const farmerId = localStorage.getItem("farmerId");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/orders/farmer/${farmerId}`);
//         const data = await response.json();
//         setOrders(data);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       }
//     };

//     if (farmerId) fetchOrders();
//   }, [farmerId]);

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">📦 Orders from Consumers</h2>
//       {orders.length === 0 ? (
//         <p className="text-center">No orders found.</p>
//       ) : (
//         <table className="table table-bordered table-striped">
//           <thead className="table-dark">
//             <tr>
//               <th>Order ID</th>
//               <th>Product ID</th>
//               <th>Consumer ID</th>
//               <th>Mobile</th>
//               <th>Address</th>
//               <th>Quantity</th>
//               <th>Payment</th>
//               <th>Status</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.productId}</td>
//                 <td>{order.consumerId}</td>
//                 <td>{order.consumerMobile}</td>
//                 <td>{order.consumerAddress}</td>
//                 <td>{order.quantity}</td>
//                 <td>{order.paymentMethod}</td>
//                 <td>{order.paymentStatus}</td>
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

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const farmerId = localStorage.getItem("farmerId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/farmer/${farmerId}`);
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (farmerId) fetchOrders();
  }, [farmerId]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📦 Orders from Consumers</h2>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Consumer</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Quantity</th>
              <th>Payment</th>
              <th>Status</th>
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

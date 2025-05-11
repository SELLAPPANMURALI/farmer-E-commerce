// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const NearestFarmer = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState("");

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;

//           try {
//             const response = await axios.get(
//               `${import.meta.env.VITE_BACKEND_URL}/api/products/nearest`,
//               {
//                 params: { lat, lng },
//               }
//             );
//             setProducts(response.data);
//           } catch (err) {
//             console.error("Failed to fetch nearest products", err);
//             setLocationError("Could not fetch products from server.");
//           } finally {
//             setLoading(false);
//           }
//         },
//         (error) => {
//           console.error("Location access denied:", error);
//           setLocationError("Location access is required to find nearby farmers.");
//           setLoading(false);
//         }
//       );
//     } else {
//       setLocationError("Geolocation not supported by your browser.");
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>Nearest Farmer Products</h2>

//       {loading && <p>Loading nearby products...</p>}
//       {locationError && <p className="text-danger">{locationError}</p>}

//       {!loading && products.length === 0 && <p>No nearby products found.</p>}

//       <div className="row">
//         {products.map((product) => (
//           <div className="col-md-4 mb-4" key={product.id}>
//             <div className="card">
//               <img
//                 src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${product.imageUrl}`}
//                 alt={product.name}
//                 className="card-img-top"
//                 style={{ height: "200px", objectFit: "cover" }}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p>Price: ₹{product.price}</p>
//                 <p>Qty: {product.quantity}</p>
//                 <p><small>Farmer ID: {product.farmerId}</small></p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NearestFarmer;





// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const NearestFarmer = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState("");

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;

//           try {
//             const response = await axios.get(
//               `${import.meta.env.VITE_BACKEND_URL}/api/products/nearest`,
//               { params: { lat, lng } }
//             );
//             setProducts(response.data);
//           } catch (err) {
//             console.error("Failed to fetch nearest products", err);
//             setLocationError("Could not fetch products from server.");
//           } finally {
//             setLoading(false);
//           }
//         },
//         (error) => {
//           console.error("Location access denied:", error);
//           setLocationError("Location access is required to find nearby farmers.");
//           setLoading(false);
//         }
//       );
//     } else {
//       setLocationError("Geolocation not supported by your browser.");
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>Nearest Farmer Products</h2>

//       {loading && <p>Loading nearby products...</p>}
//       {locationError && <p className="text-danger">{locationError}</p>}

//       {!loading && products.length === 0 && <p>No nearby products found.</p>}

//       <div className="row">
//         {products.map((product) => (
//           <div className="col-md-4 mb-4" key={product.id}>
//             <div className="card">
//               <img
//                 src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${product.imageUrl}`}
//                 alt={product.name}
//                 className="card-img-top"
//                 style={{ height: "200px", objectFit: "cover" }}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p>Price: ₹{product.price}</p>
//                 <p>Qty: {product.quantity}</p>
//                 <p><small>Farmer ID: {product.farmerId}</small></p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NearestFarmer;



import React, { useEffect, useState } from "react";
import axios from "axios";

const NearestFarmer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/products/nearest`,
              { params: { lat, lng } }
            );
            setProducts(response.data);
          } catch (err) {
            console.error("Failed to fetch nearest products", err);
            setLocationError("Could not fetch products from server.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Location access denied:", error);
          setLocationError("Location access is required to find nearby farmers.");
          setLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation not supported by your browser.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2>Nearest Farmer Products</h2>

      {loading && <p>Loading nearby products...</p>}
      {locationError && <p className="text-danger">{locationError}</p>}
      {!loading && products.length === 0 && <p>No nearby products found.</p>}

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${product.imageUrl}`}
                alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p>Price: ₹{product.price}</p>
                <p>Qty: {product.quantity}</p>
                <p><small>Farmer ID: {product.farmerId}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearestFarmer;

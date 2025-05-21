// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useCart } from "../context/CartContext"; // ✅ Update this path if needed

// const NearestFarmer = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState("");

//   const { addToCart } = useCart(); // ✅ get addToCart from context

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
//                 <p>Qty: Kg {product.quantity}</p>
//                 <p><strong>Farmer Mobile:</strong> {product.farmerMobile || "Not Available"}</p>
//                 <button
//                   className="btn btn-success mt-2"
//                   onClick={() => addToCart(product)}
//                 >
//                   Add to Cart
//                 </button>
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
import { useCart } from "../context/CartContext";

const NearestFarmer = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          try {
            const res = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/products/nearest`,
              { params: { lat, lng } }
            );
            setProducts(res.data);
            setFilteredProducts(res.data);
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

  const filterProducts = (value) => {
    const match = products.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(match);

    const names = [...new Set(products.map((p) => p.name))];
    const sugg = names.filter((name) =>
      name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(sugg.slice(0, 5));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setHighlightIndex(-1);

    if (value.trim() === "") {
      setFilteredProducts(products);
      setSuggestions([]);
    } else {
      filterProducts(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        handleSuggestionClick(suggestions[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    filterProducts(suggestion);
    setSuggestions([]);
    setHighlightIndex(-1);
  };

  return (
    <div className="container mt-5">
      <h2>Nearest Farmer Products</h2>

      <div className="mb-4 position-relative w-50 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Search nearby products..."
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {suggestions.length > 0 && (
          <ul
            className="list-group position-absolute w-100"
            style={{ zIndex: 999, top: "100%" }}
          >
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                className={`list-group-item list-group-item-action ${
                  idx === highlightIndex ? "active" : ""
                }`}
                onClick={() => handleSuggestionClick(s)}
                style={{ cursor: "pointer" }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <p>Loading nearby products...</p>}
      {locationError && <p className="text-danger">{locationError}</p>}
      {!loading && filteredProducts.length === 0 && <p>No nearby products found.</p>}

      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${product.imageUrl}`}
                alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p>Price: ₹{product.price}</p>
                <p>Qty: {product.quantity}</p>
                <p><strong>Farmer Mobile:</strong> {product.farmerMobile || "N/A"}</p>
                <button
                  className="btn btn-success mt-2"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearestFarmer;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./cart.css"; // Reuse styling
// import { useCart } from "../context/CartContext"; // ✅ Corrected path
// import { Link } from "react-router-dom";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     fetchAllProducts();
//   }, []);

//   const fetchAllProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Error fetching products", err);
//     }
//   };

//   const handleSearch = async () => {
//     if (searchQuery.trim() === "") {
//       fetchAllProducts();
//     } else {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/products/search?query=${searchQuery}`
//         );
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Search failed:", err);
//       }
//     }
//     setSuggestions([]); // hide suggestions
//   };

//   const handleInputChange = async (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);

//     if (value.trim() === "") {
//       setSuggestions([]);
//     } else {
//       try {
//         const res = await axios.get("http://localhost:5000/api/products");
//         const matches = res.data
//           .map((p) => p.name)
//           .filter((name) =>
//             name.toLowerCase().startsWith(value.toLowerCase())
//           )
//           .slice(0, 5); // limit to 5 suggestions
//         setSuggestions(matches);
//       } catch (err) {
//         console.error("Suggestion fetch failed", err);
//       }
//     }
//   };

//   // const handleSuggestionClick = (suggestion) => {
//   //   setSearchQuery(suggestion);
//   //   handleSearch();
//   // };

//       const handleSuggestionClick = async (suggestion) => {
//   setSearchQuery(suggestion);
//   try {
//     const res = await axios.get(
//       `http://localhost:5000/api/products/search?query=${suggestion}`
//     );
//     setProducts(res.data);
//     setSuggestions([]);
//   } catch (err) {
//     console.error("Search failed:", err);
//   }
// };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">🌾 All Products from Farmers</h2>

//       <div className="mb-3 text-center position-relative">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleInputChange}
//           className="form-control w-50 mx-auto"
//           placeholder="Search products by name"
//         />
//         {suggestions.length > 0 && (
//           <ul
//             className="list-group position-absolute w-50 mx-auto"
//             style={{ zIndex: 1000, top: "100%", left: "25%" }}
//           >
//             {suggestions.map((s, index) => (
//               <li
//                 key={index}
//                 className="list-group-item list-group-item-action"
//                 onClick={() => handleSuggestionClick(s)}
//                 style={{ cursor: "pointer" }}
//               >
//                 {s}
//               </li>
//             ))}
//           </ul>
//         )}
//         <button className="btn btn-primary mt-2" onClick={handleSearch}>
//           Search
//         </button>
//       </div>

//       <div className="row">
//         {products.map((product) => (
//           <div className="col-md-4 mb-4" key={product.id}>
//             <div className="card h-100 text-center">
//               <img
//                 src={`http://localhost:5000/uploads/${product.imageUrl}`}
//                 className="card-img-top"
//                 alt={product.name}
//                 style={{ height: "250px", objectFit: "cover" }}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p>Price: ₹{product.price} /kg</p>
//                 <p>Qty: {product.quantity}</p>
//                 <button
//                   className="btn btn-success"
//                   onClick={() => addToCart(product)}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="text-center mt-4">
//         <Link to="/cart" className="btn btn-primary">
//           View Cart
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Products;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cart.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const { addToCart } = useCart();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      fetchAllProducts();
    } else {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/search?query=${searchQuery}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Search failed:", err);
      }
    }
    setSuggestions([]);
    setHighlightIndex(-1);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setHighlightIndex(-1);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const matches = res.data
          .map((p) => p.name)
          .filter((name) =>
            name.toLowerCase().startsWith(value.toLowerCase())
          )
          .slice(0, 5);
        setSuggestions(matches);
      } catch (err) {
        console.error("Suggestion fetch failed", err);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        handleSuggestionClick(suggestions[highlightIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightIndex(-1);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchQuery(suggestion);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/search?query=${suggestion}`
      );
      setProducts(res.data);
      setSuggestions([]);
      setHighlightIndex(-1);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🌾 All Products from Farmers</h2>

      <div className="mb-3 text-center position-relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="form-control w-50 mx-auto"
          placeholder="Search products by name"
        />
        {suggestions.length > 0 && (
          <ul
            className="list-group position-absolute w-50 mx-auto"
            style={{ zIndex: 1000, top: "100%", left: "25%" }}
          >
            {suggestions.map((s, index) => (
              <li
                key={index}
                className={`list-group-item list-group-item-action ${
                  index === highlightIndex ? "active" : ""
                }`}
                onClick={() => handleSuggestionClick(s)}
                style={{ cursor: "pointer" }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 text-center">
              <img
                src={`http://localhost:5000/uploads/${product.imageUrl}`}
                className="card-img-top"
                alt={product.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p>Price: ₹{product.price} /kg</p>
                <p>Qty: {product.quantity}</p>
                <button
                  className="btn btn-success"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link to="/cart" className="btn btn-primary">
          View Cart
        </Link>
      </div>
    </div>
  );
};

export default Products;

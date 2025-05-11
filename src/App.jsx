
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import { AuthProvider } from "./context/AuthContext";  // ✅ Import AuthProvider

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import Products from "./pages/Products";
// import ProductDetails from "./pages/ProductDetails"; 
// import FarmerRegister from "./components/FarmerRegister";
// import FarmerLogin from "./components/FarmerLogin";
// import FarmerDashboard from "./components/FarmerDashboard";
// import FarmerRoute from "./components/FarmerRoute";

// const App = () => {
//   return (
//     <AuthProvider> {/* ✅ Wrap with AuthProvider */}
//       <CartProvider>
//         <Router>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/product/:id" element={<ProductDetails />} />
//             <Route path="/cart" element={<Cart />} />

//             {/* ✅ Farmer Routes */}
//             <Route path="/farmer-register" element={<FarmerRegister />} />
//             <Route path="/farmer-login" element={<FarmerLogin />} />
//             <Route element={<FarmerRoute />}>
//               <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
//             </Route>

//           </Routes>
//         </Router>
//       </CartProvider>
//     </AuthProvider>
//   );
// };

// export default App;


import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import NearestFarmer from "./components/NearestFarmer";
// Lazy loading
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const FarmerRegister = lazy(() => import("./components/FarmerRegister"));
const FarmerLogin = lazy(() => import("./components/FarmerLogin"));
const FarmerDashboard = lazy(() => import("./components/FarmerDashboard"));
const FarmerRoute = lazy(() => import("./components/FarmerRoute"));
const ConsumerAuth = lazy(() => import("./components/ConsumerAuth"));

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/consumer-auth" element={<ConsumerAuth />} />


              {/* Farmer Routes */}
              <Route path="/farmer-register" element={<FarmerRegister />} />
              <Route path="/farmer-login" element={<FarmerLogin />} />

              <Route path="/nearest-farmer" element={<NearestFarmer />} />
              <Route element={<FarmerRoute />}>
                <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

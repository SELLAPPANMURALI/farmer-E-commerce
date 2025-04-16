

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import Cart from "./pages/Cart";
// import NotFound from "./pages/NotFound";
// import Navbar from "./components/Navbar";

// import FarmerRegister from "./components/FarmerRegister";
// import FarmerLogin from "./components/FarmerLogin";
// import FarmerDashboard from "./components/FarmerDashboard";
// import FarmerRoute from "./components/FarmerRoute";

// const AppRouter = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="*" element={<NotFound />} />

//         <Route path="/farmer-register" element={<FarmerRegister />} />
// <Route path="/farmer-login" element={<FarmerLogin />} />
// <Route element={<FarmerRoute />}>
//   <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
// </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import Cart from "./pages/Cart";
// import NotFound from "./pages/NotFound";
// import ProductDetails from "./pages/ProductDetails";  // Ensure this import is present
// import Navbar from "./components/Navbar";

// import FarmerRegister from "./components/FarmerRegister";
// import FarmerLogin from "./components/FarmerLogin";
// import FarmerDashboard from "./components/FarmerDashboard";
// import FarmerRoute from "./components/FarmerRoute";

// const AppRouter = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/product/:id" element={<ProductDetails />} />  {/* ✅ Added Product Details route */}
//         <Route path="*" element={<NotFound />} />

//         {/* ✅ Farmer Authentication Routes */}
//         <Route path="/farmer-register" element={<FarmerRegister />} />
//         <Route path="/farmer-login" element={<FarmerLogin />} />

//         {/* ✅ Protected Farmer Dashboard Route */}
//         <Route element={<FarmerRoute />}>
//           <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;


import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Lazy loading
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FarmerRegister = lazy(() => import("./components/FarmerRegister"));
const FarmerLogin = lazy(() => import("./components/FarmerLogin"));
const FarmerDashboard = lazy(() => import("./components/FarmerDashboard"));
const FarmerRoute = lazy(() => import("./components/FarmerRoute"));

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />

          {/* Farmer Authentication Routes */}
          <Route path="/farmer-register" element={<FarmerRegister />} />
          <Route path="/farmer-login" element={<FarmerLogin />} />

          {/* Protected Farmer Dashboard Route */}
          <Route element={<FarmerRoute />}>
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;

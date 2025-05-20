
// import React, { Suspense, lazy } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

// // Regular (non-lazy) import
// import ConsumerAuth from "./components/ConsumerAuth";

// // Lazy load other components
// const Home = lazy(() => import("./pages/Home"));
// const Products = lazy(() => import("./pages/Products"));
// const Cart = lazy(() => import("./pages/Cart"));
// const ProductDetails = lazy(() => import("./pages/ProductDetails"));
// const NotFound = lazy(() => import("./pages/NotFound"));
// const FarmerRegister = lazy(() => import("./components/FarmerRegister"));
// const FarmerLogin = lazy(() => import("./components/FarmerLogin"));
// const FarmerDashboard = lazy(() => import("./components/FarmerDashboard"));
// const AddProduct = lazy(() => import("./components/AddProduct"));
// const EditProduct = lazy(() => import("./components/EditProduct"));
// const FarmerRoute = lazy(() => import("./components/FarmerRoute"));

// const AppRouter = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/product/:id" element={<ProductDetails />} />
//           <Route path="*" element={<NotFound />} />

//           {/* ✅ Regular route for ConsumerAuth */}
//           <Route path="/consumer-auth" element={<ConsumerAuth />} />

//           {/* Farmer Routes */}
//           <Route path="/farmer-register" element={<FarmerRegister />} />
//           <Route path="/farmer-login" element={<FarmerLogin />} />

//           <Route element={<FarmerRoute />}>
//             <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
//             <Route path="/add-product" element={<AddProduct />} />
//             <Route path="/edit-product/:id" element={<EditProduct />} />
//           </Route>
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// export default AppRouter;


import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NearestFarmer from "./components/NearestFarmer"; // Adjust path if needed

// Regular import
import ConsumerAuth from "./components/ConsumerAuth";

// Lazy loading components
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FarmerRegister = lazy(() => import("./components/FarmerRegister"));
const FarmerLogin = lazy(() => import("./components/FarmerLogin"));
const FarmerDashboard = lazy(() => import("./components/FarmerDashboard"));
const AddProduct = lazy(() => import("./components/AddProduct"));
const EditProduct = lazy(() => import("./components/EditProduct"));
const FarmerRoute = lazy(() => import("./components/FarmerRoute"));
const NearestFarmer = lazy(() => import("./components/NearestFarmer")); // ✅ Nearest farmer
const FarmerOrders = lazy(() => import("./components/FarmerOrders")); // Add import

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
          <Route path="/nearest-farmer" element={<NearestFarmer />} /> {/* ✅ New route */}
          <Route path="*" element={<NotFound />} />

          {/* Consumer route */}
          <Route path="/consumer-auth" element={<ConsumerAuth />} />

          {/* Farmer routes */}
          <Route path="/farmer-register" element={<FarmerRegister />} />
          <Route path="/farmer-login" element={<FarmerLogin />} />
          <Route element={<FarmerRoute />}>
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="/farmer-orders" element={<FarmerOrders />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;

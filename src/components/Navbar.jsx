
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { FaShoppingCart } from "react-icons/fa";
// import ThemeToggle from "./ThemeToggle";

// const Navbar = () => {
//   const { cartItems } = useCart();

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container">
//         <Link className="navbar-brand" to="/">E-Commerce</Link>
        
//         <button 
//           className="navbar-toggler" 
//           type="button" 
//           data-bs-toggle="collapse" 
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/products">Products</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/farmer-register">Farmer Register</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/farmer-login">Farmer Login</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link position-relative" to="/cart">
//                 <FaShoppingCart size={22} />
//                 {cartItems.length > 0 && (
//                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </Link>
//             </li>

//             {/* Consumer Login link */}
//             <li className="nav-item">
//               <Link className="nav-link" to="/consumer-auth">Consumer Login</Link>
//             </li>

//             <li className="nav-item">
//               <ThemeToggle />
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { cartItems } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">E-Commerce</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
           <a className="nav-link" href="/nearest-farmer">Nearest Farmer</a>
           </li>

            <li className="nav-item">
              <Link className="nav-link" to="/farmer-register">Farmer Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/farmer-login">Farmer Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <FaShoppingCart size={22} />
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/consumer-auth">Consumer Login</Link>
            </li>
            <li className="nav-item">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

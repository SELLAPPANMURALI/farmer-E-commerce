// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";

// const FarmerLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/farmers/login`,
//         { email, password }
//       );
//       login(response.data); // backend returns full farmer object
//       alert("Login successful!");
//       navigate("/farmer-dashboard");
//     } catch (error) {
//       alert("Invalid credentials!");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Farmer Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="mb-3">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-success">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FarmerLogin;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const FarmerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/farmers/login`,
        { email, password }
      );

      const farmer = response.data;

      // ✅ Save farmer info to localStorage
      localStorage.setItem("farmerId", farmer.id);
      localStorage.setItem("farmerName", farmer.name);
      localStorage.setItem("farmerEmail", farmer.email);

      login(farmer);
      alert("Login successful!");
      navigate("/farmer-dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Farmer Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
};

export default FarmerLogin;

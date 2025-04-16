// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [farmer, setFarmer] = useState(null);

//   useEffect(() => {
//     const savedFarmer = localStorage.getItem("farmer");
//     if (savedFarmer) {
//       setFarmer(JSON.parse(savedFarmer));
//     }
//   }, []);

//   const login = (farmerData) => {
//     setFarmer(farmerData);
//     localStorage.setItem("farmer", JSON.stringify(farmerData));
//   };

//   const logout = () => {
//     setFarmer(null);
//     localStorage.removeItem("farmer");
//   };

//   return (
//     <AuthContext.Provider value={{ farmer, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    const savedFarmer = localStorage.getItem("farmer");
    if (savedFarmer) {
      setFarmer(JSON.parse(savedFarmer));
    }
  }, []);

  const login = (farmerData) => {
    setFarmer(farmerData);
    localStorage.setItem("farmer", JSON.stringify(farmerData));
  };

  const logout = () => {
    setFarmer(null);
    localStorage.removeItem("farmer");
  };

  return (
    <AuthContext.Provider value={{ farmer, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the hook separately after defining the context provider
export const useAuth = () => useContext(AuthContext);

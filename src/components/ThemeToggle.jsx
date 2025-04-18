// import React, { useEffect, useState } from "react";

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     document.body.setAttribute("data-theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <button onClick={toggleTheme} className="btn btn-outline-primary">
//       {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
//     </button>
//   );
// };
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button className="btn btn-sm btn-outline-primary" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;

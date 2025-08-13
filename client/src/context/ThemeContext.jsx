// import React, { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     const saved = localStorage.getItem("isDarkMode");
//     return saved ? JSON.parse(saved) : true;
//   });

//   useEffect(() => {
//     localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
//   }, [isDarkMode]);

//   const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };


import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const isDarkMode = false; // Always light mode
  const toggleDarkMode = () => {}; // Does nothing

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

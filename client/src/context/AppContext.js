import React, { useContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../components/Theme/Theme";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const switchTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <AppContext.Provider value={{ theme, switchTheme, isSidebarOpen, setIsSidebarOpen }}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

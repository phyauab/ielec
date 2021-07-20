import { React, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/Theme/GlobalStyle";
import { lightTheme, darkTheme } from "./components/Theme/Theme";
import { Toggler } from "./components/Theme/Toggler";
import styled from "styled-components";
import Navbar from "./components/Navbar";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <div className="App">
        <Navbar />
      </div>
    </ThemeProvider>
  );
}

export default App;

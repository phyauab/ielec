import { React, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/Theme/GlobalStyle";
import Navbar from "./components/Navbar";
import { lightTheme, darkTheme } from "./components/Theme/Theme";

function App() {
  const [theme, setTheme] = useState("light");
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

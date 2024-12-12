import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./themes";

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <div>
        <button onClick={toggleTheme}>
          Toggle Theme to {themeMode === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </ThemeProvider>
  );
};

export default App;

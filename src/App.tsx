import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Stack,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { lightTheme, darkTheme } from "./themes";
import { WbSunny, NightlightRound } from "@mui/icons-material";

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setThemeMode(savedMode as "light" | "dark");
    }
  }, []);

  const handleThemeChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: "light" | "dark"
  ) => {
    if (newMode !== null) {
      setThemeMode(newMode);
      localStorage.setItem("themeMode", newMode);
    }
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Box>
        <Stack spacing={1}>
          <Stack direction="row" className="appHeader">
            <Typography variant="h3" justifySelf="center">
              Getting dizzy from Quizzy
            </Typography>
            <Box display="sticky" right={0}>
              <ToggleButtonGroup
                value={themeMode}
                exclusive
                onChange={handleThemeChange}
                aria-label="theme mode"
              >
                <ToggleButton value="light" aria-label="light mode">
                  <WbSunny />
                </ToggleButton>
                <ToggleButton value="dark" aria-label="dark mode">
                  <NightlightRound />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default App;

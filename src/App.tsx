import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Stack,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { lightTheme, darkTheme } from "./themes";
import {
  WbSunny,
  NightlightRound,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setThemeMode(savedMode as "light" | "dark");
    }
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            className="appHeader"
            px={2}
            py={1}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h3" sx={{ flex: 1, textAlign: "center" }}>
              Getting dizzy from Quizzy
            </Typography>

            <Box>
              <ToggleButtonGroup
                value={themeMode}
                exclusive
                onChange={handleThemeChange}
                aria-label="theme mode"
              >
                <ToggleButton
                  value="light"
                  size="small"
                  aria-label="light mode"
                >
                  <WbSunny />
                </ToggleButton>
                <ToggleButton value="dark" size="small" aria-label="dark mode">
                  <NightlightRound />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Stack>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{ width: 250 }}
          >
            <List>
              <ListItem>
                <ListItemText>
                  <Link to="/home">Home</Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link to="/play">Play</Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary="Contact" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box
          className="content"
          sx={{ marginLeft: drawerOpen ? "260px" : 1, mr: 1 }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;

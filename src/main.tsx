import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Play from "./pages/Play.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="contact" element={<PlayArrowIcon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

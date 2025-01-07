import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Outlet, useNavigate } from "react-router-dom";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import AppProviderRouter from "./services/AppProviderRouter";
import { useMemo } from "react";
import { useSession } from "./SessionWrapper/useSession";
import { useAuthRestore } from "./services/useAuthRestore";
import axios from "axios";

const NAVIGATION: Navigation = [
  { kind: "header", title: "Main items" },
  { title: "Home", icon: <HomeIcon /> },
  { segment: "play", title: "Play", icon: <PlayArrowIcon /> },
  { segment: "results", title: "Results", icon: <AnalyticsIcon /> },
];

const BRANDING = {
  title: "Quizzy",
  logo: <PsychologyAltIcon sx={{ height: "40px", width: "40px" }} />,
};

export default function Quizzy() {
  const { session, setSession } = useSession();
  const navigate = useNavigate();
  useAuthRestore();

  const authentication = useMemo(
    () => ({
      signIn: () => navigate("/sign-in"),
      signOut: async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("No token found, redirecting to home page.");
          navigate("/");
          return;
        }

        try {
          const response = await axios.get("api/signout", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setSession(null);
          } else {
            console.error("Failed to sign out:", response.statusText);
          }
        } catch (error) {
          console.error("Error during sign out:", error);
        } finally {
          localStorage.removeItem("authToken");
          navigate("/");
        }
      },
    }),
    [navigate, setSession]
  );

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      session={session}
      authentication={authentication}
      router={AppProviderRouter()}
    >
      <Outlet />
    </AppProvider>
  );
}

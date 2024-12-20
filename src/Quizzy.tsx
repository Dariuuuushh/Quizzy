import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Outlet } from "react-router-dom";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import AppProviderRouter from "./services/AppProviderRouter";
import { useEffect, useMemo } from "react";
import { useSession } from "./SessionWrapper/useSession";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "home",
    title: "Home",
    icon: <HomeIcon />,
  },
  {
    segment: "play",
    title: "Play",
    icon: <PlayArrowIcon />,
  },
  {
    segment: "results",
    title: "Results",
    icon: <AnalyticsIcon />,
  },
];

const BRANDING = {
  title: "Quizzy",
  logo: <PsychologyAltIcon sx={{ height: "40px", width: "40px" }} />,
};

export default function Quizzy() {
  const session = useSession();
  const authentication = useMemo(() => {
    return {
      signIn: () => {
        window.location.href = "/sign-in";
      },
      signOut: async () => {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          console.error("No token found, redirecting to home page.");
          window.location.href = "/";
          return;
        }

        try {
          const response = await fetch("api/signout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            console.log("User successfully signed out");
          } else {
            console.error("Failed to sign out:", response.statusText);
          }
        } catch (error) {
          console.error("Error during sign out:", error);
        } finally {
          console.log("Removing jwtToken");
          localStorage.removeItem("jwtToken");
          window.location.href = "/home";
        }
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      session={session.session}
      authentication={authentication}
      router={AppProviderRouter()}
    >
      <Outlet />
    </AppProvider>
  );
}

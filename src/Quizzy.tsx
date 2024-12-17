import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Outlet } from "react-router-dom";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import AppProviderRouter from "./services/AppProviderRouter";

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

const authentication = {
  signIn: () => {
    window.location.href = "/sign-in";
  },
  signOut: () => {
    console.log("User signed out");
    window.location.href = "/";
  },
};

export default function Quizzy() {
  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      authentication={authentication}
      router={AppProviderRouter()}
    >
      <Outlet />
    </AppProvider>
  );
}

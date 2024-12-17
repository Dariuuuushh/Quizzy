import {
  Navigate,
  NavigateOptions as ToolpadNavigateOptions,
  Router,
} from "@toolpad/core";
import { useNavigate, useLocation, NavigateOptions } from "react-router-dom";

export default function AppProviderRouter(): Router {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateObject: Navigate = (
    url: string | URL,
    options?: ToolpadNavigateOptions | undefined
  ): void => {
    navigate(url, options as NavigateOptions);
  };

  return {
    navigate: navigateObject,
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
  };
}

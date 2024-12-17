import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Quizzy from "./Quizzy.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Play from "./pages/Play.tsx";
import Results from "./pages/Results.tsx";
import Layout from "./layout/Layout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import OAuthSignInPage from "./pages/OAuthSignInPage.tsx";

export const router = createBrowserRouter([
  {
    element: <Quizzy />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/sign-in",
        element: <OAuthSignInPage />,
      },
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/play",
            element: <Play />,
          },
          {
            path: "/results",
            element: <Results />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

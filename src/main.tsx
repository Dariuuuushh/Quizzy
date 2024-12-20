import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Quizzy from "./Quizzy.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Play from "./pages/Play.tsx";
import Results from "./pages/Results.tsx";
import Layout from "./layout/Layout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import CredentialsSignInPage from "./pages/CredentialsSignInPage.tsx";
import { SessionWrapperProvider } from "./SessionWrapper/SessionWrapperProvider.tsx";

export const router = createBrowserRouter([
  {
    element: <Quizzy />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/sign-in",
        element: <CredentialsSignInPage />,
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
    <SessionWrapperProvider>
      <RouterProvider router={router} />
    </SessionWrapperProvider>
  </StrictMode>
);

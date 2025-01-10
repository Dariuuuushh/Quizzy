import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Quizzy from "./Quizzy.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Play from "./pages/Play.tsx";
import Layout from "./layout/Layout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import CredentialsSignInPage from "./pages/CredentialsSignInPage.tsx";
import { SessionWrapperProvider } from "./SessionWrapper/SessionWrapperProvider.tsx";
import { ResultProvider } from "./ResultHook/ResultProvider.tsx";
import { DialogsProvider } from "@toolpad/core";
import LocalResults from "./pages/LocalResults.tsx";
import SpecificResults from "./pages/SpecificResults.tsx";
import TotalResults from "./pages/TotalResults.tsx";
import Tournaments from "./pages/Tournament.tsx";

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
            path: "",
            element: <Home />,
          },
          {
            path: "play",
            element: <Play />,
          },
          {
            path: "tournaments",
            element: <Tournaments />,
          },
          {
            path: "results",
            children: [
              { path: "localResults", element: <LocalResults /> },
              { path: "specificResults", element: <SpecificResults /> },
              { path: "totalResults", element: <TotalResults /> },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionWrapperProvider>
      <ResultProvider>
        <DialogsProvider>
          <RouterProvider router={router} />
        </DialogsProvider>
      </ResultProvider>
    </SessionWrapperProvider>
  </StrictMode>
);

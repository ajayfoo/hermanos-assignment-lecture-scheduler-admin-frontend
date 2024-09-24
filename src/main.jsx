import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CoursePage from "./components/CoursePage/index.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/courses",
    element: <CoursePage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

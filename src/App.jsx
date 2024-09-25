import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import InstructorPage from "./components/InstructorPage";
import CoursePage from "./components/CoursePage";
import "./App.css";
import Main from "./components/Main";
import LoginPage from "./components/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/instructors`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          return null;
        }
        return redirect("/login");
      } catch {
        return redirect("/login");
      }
    },
    children: [
      {
        path: "/",
        element: <InstructorPage />,
      },
      {
        path: "/courses",
        element: <CoursePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/instructors`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          return redirect("/");
        }
        return null;
      } catch {
        return null;
      }
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

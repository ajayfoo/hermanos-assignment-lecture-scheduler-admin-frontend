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
        const response = await fetch("http://localhost:3000/instructors", {
          credentials: "include",
        });
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
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

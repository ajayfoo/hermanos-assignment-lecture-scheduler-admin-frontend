import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InstructorPage from "./components/InstructorPage";
import CoursePage from "./components/CoursePage";
import "./App.css";
import Main from "./components/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

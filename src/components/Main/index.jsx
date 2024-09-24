import { Link, Outlet } from "react-router-dom";

function Main() {
  return (
    <div>
      <p>App</p>
      <Link to="/">Instruments</Link>
      <Link to="/courses">Courses</Link>
      <Outlet />
    </div>
  );
}

export default Main;

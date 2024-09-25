import { Link, Outlet } from "react-router-dom";

function Main() {
  return (
    <div>
      <Link to="/">Instruments</Link>
      <Link to="/courses">Courses</Link>
      <Outlet />
    </div>
  );
}

export default Main;

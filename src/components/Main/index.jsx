import { Link, Outlet } from "react-router-dom";
import classes from "./Main.module.css";

function Main() {
  return (
    <div>
      <div className={classes.nav}>
        <Link to="/">Instruments</Link>
        <Link to="/courses">Courses</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Main;

import { Link, Outlet } from "react-router-dom";
import classes from "./Main.module.css";

const logout = async () => {
  try {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    return response.ok;
  } catch {
    console.log("something went wrong");
  }
};

function Main() {
  const handleLogoutClick = async () => {
    const done = await logout();
    if (done) {
      location.replace("/login");
    }
  };
  return (
    <div>
      <div className={classes.nav}>
        <Link to="/">Instruments</Link>
        <Link to="/courses">Courses</Link>
        <button type="button" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default Main;

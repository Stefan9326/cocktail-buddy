import { Link, Outlet } from "react-router-dom";
import "./Root.css";

export const Root = () => {
  return (
    <div className="root">
      <img src="src/assets/3-cropped.webp" alt="" width="460px" />
      <div className="links">
        <Link to="/name-search">Search by name</Link>
        <Link to="/ingredient-search">Search by ingredient</Link>
      </div>
      <Outlet />
    </div>
  );
};

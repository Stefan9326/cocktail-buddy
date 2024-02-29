import { Link, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <img src="src/assets/3-cropped.webp" alt="" width="460px" />
      <Link to="/name-search">Search by name</Link>
      <Link to="/ingredient-search">Search by ingredient</Link>
      <Outlet />
    </div>
  );
};

export default Root;

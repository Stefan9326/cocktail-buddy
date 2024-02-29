import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./routes/Home";
import NameSearch from "./routes/NameSearch";
import IngredientSearch from "./routes/IngredientSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/name-search",
        element: <NameSearch />,
      },
      {
        path: "/ingredient-search",
        element: <IngredientSearch />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

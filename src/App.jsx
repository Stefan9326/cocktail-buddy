import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./routes/Root";
import Home from "./routes/Home";
import NameSearch from "./routes/NameSearch";
import IngredientSearch from "./routes/IngredientSearch";
import "./App.css";

const queryClient = new QueryClient();

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
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
};

export default App;

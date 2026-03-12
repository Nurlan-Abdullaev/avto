import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CarDetails from "./pages/CarDetails";
import Sell from "./pages/Sell";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "catalog", Component: Catalog },
      { path: "car/:id", Component: CarDetails },
      { path: "sell", Component: Sell },
      { path: "favorites", Component: Favorites },
      { path: "profile", Component: Profile },
      { path: "admin", Component: Admin },
      { path: "*", Component: NotFound },
    ],
  },
]);

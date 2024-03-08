import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/Login";
import ShowItems from "./Components/Items/ShowItems";
import SingleItem from "./Components/Items/SingleItem";
import AddItems from "./Components/Items/AddItems";
import ShowParty from "./Components/Parties/ShowParty";
import SingleParty from "./Components/Parties/SingleParty";
import AddParty from "./Components/Parties/AddParty";
import Invoice from "./Components/Invoice/Invoice";
import NotFound404 from "./common/NotFound404";
import Profile from "./Components/Profiles/Profile";
import EditProfile from "./Components/Profiles/EditProfile";
import { useEffect, useState } from "react";
import Loader from "./common/Loader";
import "./css/satoshi.css";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import SaleInvoice from "./Components/Invoice/SaleInvoice";
import PurchaseInvoice from "./Components/Invoice/PurchaseInvoice";

const isLogged = localStorage.getItem("acessToken");
const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: isLogged ? <Body /> : <Login />,
  },
  {
    path: "/login",
    element: isLogged ? <Body /> : <Login />,
  },
  {
    path: "/showItems",
    element: isLogged ? <ShowItems /> : <Login />,
  },
  {
    path: "/showItems/:id",
    element: isLogged ? <SingleItem /> : <Login />,
  },
  {
    path: "/addItems",
    element: isLogged ? <AddItems /> : <Login />,
  },
  {
    path: "/showParty",
    element: isLogged ? <ShowParty /> : <Login />,
  },
  {
    path: "/showParty/:id",
    element: isLogged ? <SingleParty /> : <Login />,
  },
  {
    path: "/addParty",
    element: isLogged ? <AddParty /> : <Login />,
  },
  {
    path: "/invoice/:id",
    element: isLogged ? <Invoice /> : <Login />,
  },
  {
    path: "/profile",
    element: isLogged ? <Profile /> : <Login />,
  },
  {
    path: "/editProfile",
    element: isLogged ? <EditProfile /> : <Login />,
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
  {
    path: "/addSale",
    element: isLogged ? <SaleInvoice /> : <Login />,
  },
  {
    path: "/addPurchase",
    element: isLogged ? <PurchaseInvoice /> : <Login />,
  },
]);
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? <Loader /> : <RouterProvider router={appRoutes} />;
}

export default App;

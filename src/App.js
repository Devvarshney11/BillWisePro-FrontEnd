import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Body from "./Components/Body";
import Login from "./Components/Login";
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
]);
function App() {
  return (
    <>
      {isLogged ? <Sidebar /> : null}
      <RouterProvider router={appRoutes} />{" "}
    </>
  );
}

export default App;

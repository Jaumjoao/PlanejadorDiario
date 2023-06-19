import React from "react";
import ReactDOM from "react-dom/client";
import './index.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Home from "./views/Home/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

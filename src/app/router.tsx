import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Article from "../pages/Article";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/login", element: <Login />},
            { path: "/article/:slug", element: <Article /> },
        ],
    },
]);
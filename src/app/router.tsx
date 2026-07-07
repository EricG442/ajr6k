import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Article from "@/pages/Article";
import Editor from "@/pages/Editor";
import LeaguePage from "@/pages/League";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/league/:league", element: <LeaguePage /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/login", element: <Login />},
            { path: "/article/:slug", element: <Article /> },
            { path: "/article/editor", element: <Editor /> },
        ],
    },
]);
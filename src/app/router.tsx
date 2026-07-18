import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Article from "@/pages/Article";
import Editor from "@/pages/Editor";

export const router = createBrowserRouter(
    [
        {
            element: <Layout />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/league/:league", element: <Home /> },
                { path: "/dashboard", element: <Dashboard /> },
                { path: "/login", element: <Login />},
                { path: "/article/:slug", element: <Article /> },
                { path: "/article/editor", element: <Editor /> },
                { path: "/article/editor/:id", element: <Editor /> },
            ],
        },
    ],
    { basename: "/ajr6k/" }
);

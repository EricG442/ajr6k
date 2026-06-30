import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Article from "@/pages/Article";
import NewArticle from "@/pages/NewArticle";
import { DesignSystem } from "@/components/design-system/Design-System";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/login", element: <Login />},
            { path: "/article/:slug", element: <Article /> },
            { path: "/dashboard/newarticle", element: <NewArticle /> },
            { path: "/design-system", element: <DesignSystem /> },
        ],
    },
]);
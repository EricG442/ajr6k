import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar/Navbar";

export function Layout() {
    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export function Layout() {
    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main */}
            <main className="flex-1 p-6 min-h-screen">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}
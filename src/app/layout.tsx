import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 border-r p-4">
                <h1 className="font-bold">Sports CMS</h1>
            </aside>

            {/* Main */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}
import { MobileNav } from "@/components/navbar/MobileNav";
import { NavLink } from "react-router-dom";

export function Navbar() {
    return (
        <header className="border-b px-4">
            <div className="relative flex h-16 items-center">
                <MobileNav />
                <NavLink to="/" className="absolute left-1/2 -translate-x-1/2">
                    <h1 className="text-xl font-bold">Astro6K</h1>
                </NavLink>
            </div>
        </header>
    );
}
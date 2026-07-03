import { NavLink } from "react-router-dom";
import { navLinks } from "@/components/navbar/NavLinks";

export function DesktopNav() {
    return (
        <nav className="hidden md:flex items-center gap-6">
            {navLinks.map( link => (
                <NavLink
                    key={link.href}
                    to={link.href}
                    className="text-sm font-medium hover:text-primary"
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
}
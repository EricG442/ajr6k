import { DesktopNav } from "@/components/navbar/DesktopNav";
import { MobileNav } from "@/components/navbar/MobileNav";

export function Navbar() {
    return (
        <header className="border-b px-4">
            <div className="relative flex h-16 items-center">
                <DesktopNav />
                <MobileNav />
                <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold">AJR6K</h1>
            </div>
        </header>
    );
}
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";

import { navLinks } from "@/components/navbar/NavLinks";


export function MobileNav() {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <h1 className="w-full text-center font-bold text-xl">AJR6K</h1>

                    <div className="mx-8">
                        <Input placeholder="Search articles..." />
                    </div>

                    {navLinks.map( link => (
                        <Button
                            asChild
                            variant="ghost"
                            className="w-full justify-center py-6"
                        >
                            <NavLink
                                key={link.href}
                                to={link.href}
                                className="text-sm font-medium hover:text-primary"
                            >
                                {link.label}
                            </NavLink>
                        </Button>
                    ))
                        
                    }
                </SheetContent>
            </Sheet>
        </div>
    );
}
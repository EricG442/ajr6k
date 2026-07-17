import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";

import { navLinks } from "@/components/navbar/NavLinks";
import { supabase } from "@/lib/supabase";


export function MobileNav() {
    const { user } = useAuth();
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" onOpenAutoFocus={ event => event.preventDefault()}>
                    <h1 className="w-full text-center font-bold text-xl">AJR6K</h1>

                    <div className="mx-8">
                        <Input placeholder="Search articles..." />
                    </div>

                    {navLinks.map( link => (
                        <SheetClose asChild>
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
                        </SheetClose>
                    ))}

                    <div className="w-full flex justify-center">
                        <SheetClose asChild>
                            {
                                user ? (
                                    <Button
                                        onClick={async () => {
                                            await supabase.auth.signOut();
                                        }}
                                    >
                                        Sign Out
                                    </Button>
                                ) : (
                                    <Button asChild>
                                        <NavLink to="/login">Log in</NavLink>
                                    </Button>
                                )
                            }
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
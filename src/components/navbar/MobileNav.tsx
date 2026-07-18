import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog";
import ProfileDialog from "../profile/ProfileSettingsDialog";

import { navLinks } from "@/components/navbar/NavLinks";

export function MobileNav() {
    const { user, profile } = useAuth();
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

                    <SheetClose>
                        {user && (
                            <Button
                                variant="ghost"
                                className="w-full justify-center py-6"
                            >
                                <NavLink
                                    key="dashboard"
                                    to="/dashboard"
                                    className="text-sm font-medium hover:text-primary"
                                >
                                    Dashboard
                                </NavLink>
                            </Button>
                        )}                        
                        {navLinks.map( link => (
                            <Button
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
                        ))}
                    </SheetClose>

                    <div className="w-full flex justify-center">
                        <SheetClose asChild>
                            {
                                user ? (
                                    <Dialog>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost">
                                                    {profile?.display_name}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DialogTrigger>
                                                    <DropdownMenuItem>
                                                        Profile Settings
                                                    </DropdownMenuItem>
                                                </DialogTrigger>
                                                <DropdownMenuItem>
                                                    <Button
                                                        onClick={async () => {
                                                            await supabase.auth.signOut();
                                                        }}
                                                    >
                                                        Log out
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <ProfileDialog />
                                    </Dialog>
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
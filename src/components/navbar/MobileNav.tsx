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

import {
    CircleArrowDown,
    BadgeCheckIcon,
    LogOutIcon
} from "lucide-react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "NFL", href: "/league/NFL" },
    { label: "NBA", href: "/league/NBA" },
    { label: "MLB", href: "/" },
]

export function MobileNav() {
    const { user, profile } = useAuth();
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" onOpenAutoFocus={ event => event.preventDefault()}>
                    <h1 className="w-full text-center font-bold text-xl">Astro6K</h1>

                    <div className="mx-8 flex flex-row gap-2 mx-auto">
                        <Input placeholder="Search articles..."  />
                        <div className="flex justify-center">
                            {
                                user ? (
                                    <Dialog>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost">
                                                    {profile?.display_name} <CircleArrowDown />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DialogTrigger>
                                                    <DropdownMenuItem>
                                                        <BadgeCheckIcon /> Profile Settings
                                                    </DropdownMenuItem>
                                                </DialogTrigger>
                                                <DropdownMenuItem>
                                                    <Button
                                                        onClick={async () => {
                                                            await supabase.auth.signOut();
                                                        }}
                                                    >
                                                        <LogOutIcon /> Log out
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <ProfileDialog />
                                    </Dialog>
                                ) : (
                                    <SheetClose asChild>
                                        <Button asChild>
                                            <NavLink to="/login">Log in</NavLink>
                                        </Button>
                                    </SheetClose>
                                )
                            }
                        </div>
                    </div>

                    
                        {user && (
                            <SheetClose asChild>
                                <Button
                                    asChild
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
                            </SheetClose>
                        )}                        
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
                </SheetContent>
            </Sheet>
        </div>
    );
}
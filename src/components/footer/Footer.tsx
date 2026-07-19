import { NavLink } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="border-t mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center">
                    <h2 className="font-bold text-lg">
                        Astro6k Sports Media
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-sm">
                        Independent sports coverage, analysis, and commentary.
                    </p>
                </div>
                <h3 className="font-semibold mt-4">
                    Navigation
                </h3>
                <div className="flex flex-row gap-2 justify-center space-y-2">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/league/NFL">NFL</NavLink>
                    <NavLink to="/league/NBA">NBA</NavLink>
                    <NavLink to="/league/MLB">MLB</NavLink>
                </div>

                <h3 className="font-semibold">
                    Developer
                </h3>
                <div className="flex flex-row gap-2 justify-center">
                    <a
                        href="https://github.com/EricG442/ajr6k"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </div>
                <div className="mt-8 border-t pt-4 text-sm text-muted-foreground">
                    © 2026 Astro6K Sports Media. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
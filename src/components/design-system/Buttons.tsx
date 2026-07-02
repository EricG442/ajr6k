import { Button } from "@/components/ui/button";

export function Buttons() {
    return (
        <div>
            <h2 className="text-3xl font-semibold">
                Buttons
            </h2>
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="link">Link</Button>
        </div>
    );
}
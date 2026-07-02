import { Input } from "@/components/ui/input";

export function Inputs() {
    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-semibold">
                Inputs
            </h2>
            <Input placeholder="Default Input" />
            <Input placeholder="Disabled Input" disabled />
            <Input placeholder="Error Input" className="border-red-500" />
        </div>
    );
}
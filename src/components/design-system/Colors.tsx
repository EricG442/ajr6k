export function Colors() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="rounded-lg bg-background p-6">Background</div>
            <div className="rounded-lg bg-foreground p-6 text-black">Surface</div>
            <div className="rounded-lg bg-primary p-6 text-black">Primary</div>
            <div className="rounded-lg bg-secondary p-6">Secondary</div>
        </div>
    );
}
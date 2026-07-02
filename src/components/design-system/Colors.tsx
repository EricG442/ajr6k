export function Colors() {
    return (
        <div className="grid grid-cols-4 gap-4 bg-white p-4">
            <div className="rounded-lg bg-background p-6">Background</div>
            <div className="rounded-lg bg-foreground p-6 text-black">Surface</div>
            <div className="rounded-lg bg-primary p-6 text-black">Primary</div>
            <div className="rounded-lg bg-secondary p-6">Secondary</div>
            <div className="rounded-lg bg-accent p-6">Accent</div>
            <div className="rounded-lg bg-muted p-6">Muted</div>
            <div className="rounded-lg bg-destructive p-6 text-black">Destructive</div>
        </div>
    );
}
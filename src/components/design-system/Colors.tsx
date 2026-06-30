export function Colors() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="rounded-lg bg-zinc-950 p-6 text-white">Background</div>
            <div className="rounded-lg bg-zinc-900 p-6 text-white">Surface</div>
            <div className="rounded-lg bg-blue-600 p-6 text-white">Primary</div>
            <div className="rounded-lg bg-emerald-500 p-6 text-white">Secondary</div>
        </div>
    );
}
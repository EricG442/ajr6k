const spacing = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16];

export function Spacing() {
    return (
        <div className="p-10 space-y-8">
            <h1 className="text-3xl font-bold">Spacing System</h1>

            <div className="space-y-6">
                {spacing.map((s) => (
                    <div key={s} className="flex items-center gap-6">
                        <div className="w-12 text-sm text-zinc-400">{s}</div>

                        {/* visual block */}
                        <div 
                            className="bg-emerald-500"
                            style={{
                                width: `${s * 4}px`,
                                height: "16px"
                            }}
                        />

                        <div className="text-sm text-zinc-500">
                            {`w-${s} / p-${s}`}
                        </div>
                    </div>
                ))}
            </div>

            {/* real-world examples */}
            <div className="space-y-6 pt-10">
                <h2 className="text-xl font-semibold">
                    Real UI Example
                </h2>

                <div className="p-4 border rounded-xl">
                    p-4 card padding    
                </div> 

                <div className="p-6 border rounded-xl">
                    p-6 dashboard card padding
                </div>

                <div className="p-8 border rounded-xl">
                    p-8 page section spacing
                </div>
            </div>
        </div>
    );
}
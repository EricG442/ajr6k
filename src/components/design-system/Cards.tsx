import { FeaturedCard } from "@/components/ui/FeaturedCard";
import { MiniCard } from "@/components/ui/MiniCard";

export function Cards() {
    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-semibold">
                Cards
            </h2>
            <FeaturedCard />

            {[1, 2, 3].map((story) => (
                <MiniCard id={story} />
            ))}
        </div>
    );
}
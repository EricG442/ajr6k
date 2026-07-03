import { FeaturedCard } from "@/components/ui/FeaturedCard";
import { MiniCard } from "@/components/ui/MiniCard";

export default function Home() {
    return (
        <main className="mx-auto max-w-6xl p-4 space-y-8">
            {/* Featured */}
            <section>
                <h2 className="mb-4 text-xl font-semibold">
                    Featured Story
                </h2>

                <FeaturedCard />
            </section>

            {/* Latest */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Latest Stories
                </h2>

                {[1, 2, 3].map((story) => (
                    <MiniCard id={story} />
                ))}
            </section>
        </main>
    )
}
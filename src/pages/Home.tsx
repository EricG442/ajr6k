import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { FeaturedCard } from "@/components/articles/FeaturedCard";
import { ArticleGrid } from "@/components/articles/ArticleGrid";

export default function Home() {
    const { league } = useParams();
    const [featuredArticle, setFeaturedArticle] = useState<any | null>(null);
    const [latestArticles, setLatestArticles] = useState<any[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            let query = supabase
                .from("posts")
                .select("*")
                .eq("published", true)
                .order("created_at", { ascending: false });

            if (league) query = query.eq("league", league);

            const { data, error } = await query.limit(6);
            if (error) {
                console.error(error);
                return;
            }

            if (data) {
                setFeaturedArticle(data[0] ?? null);
                setLatestArticles(data.slice(1));
            }
        };

        fetchArticles();
    }, [league])

    return (
        <div className="mx-auto max-w-6xl p-4 space-y-8">
            {/* Featured */}
            <section>
                <h2 className="mb-4 text-xl font-semibold">
                    {league ? `${league} Stories` : "Featured Story"}
                </h2>

                {featuredArticle && (
                    <FeaturedCard article={featuredArticle} />
                )}
            </section>

            {/* Latest */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Latest Stories
                </h2>

                {latestArticles.length > 0 && (
                    <ArticleGrid articles={latestArticles} />
                )}
            </section>
        </div>
    )
}
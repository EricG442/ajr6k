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
            let featuredQuery = supabase.from("posts").select("*").eq("published", true).eq("featured", true);
            let latestQuery = supabase.from("posts").select("*").eq("published", true).order("created_at", { ascending: false });

            if (league) {
                featuredQuery = featuredQuery.eq("league", league);
                latestQuery = latestQuery.eq("league", league);
            }

            const [featuredResult, latestResult] = await Promise.all([ featuredQuery.limit(1), latestQuery.limit(6) ]);
            if (featuredResult.error || latestResult.error) {
                console.error(featuredResult.error ?? latestResult.error);
                return;
            }
            const heroArticle = featuredResult.data?.[0] ?? latestResult.data?.[0] ?? null;
            setFeaturedArticle(heroArticle);
            setLatestArticles(latestResult.data ?? []);
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
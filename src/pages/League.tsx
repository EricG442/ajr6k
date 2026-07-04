import {
    getArticlesByLeague,
} from "@/api/articlesAPI";
import { useParams } from "react-router-dom";

import { FeaturedCard } from "@/components/articles/FeaturedCard";
import { ArticleGrid } from "@/components/articles/ArticleGrid";


export default function LeaguePage() {
    const { league } = useParams();
    const articles = getArticlesByLeague(league!);
    const featuredArticle = articles[0];


    return (
        <div className="mx-auto max-w-6xl p-4 space-y-8">
            {/* Featured */}
            <section>
                <h2 className="mb-4 text-xl font-semibold">
                    Featured Story
                </h2>
        
                <FeaturedCard article={featuredArticle}/>
            </section>
        
            {/* Latest */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Latest Stories
                </h2>
        
                <ArticleGrid articles={articles.slice(1, 4)} />
            </section>
        </div>
    );
}
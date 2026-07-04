import { useParams } from "react-router-dom";
import { getArticleBySlug } from "@/api/articlesAPI";
import type { Article } from "@/data/articles";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArticleGrid } from "@/components/articles/ArticleGrid";

export default function Article() {
    const { slug } = useParams();
    const article = getArticleBySlug(slug ?? "");

    if (!article) {
        return <main>Article not found</main>;
    }

    return (
        <main className="mx-auto max-w-3xl p-4 space-y-8">
            <div className="h-64 rounded-xl bg-muted" />

            <Badge>{article.league}</Badge>

            <h1 className="text-4xl font-bold">
                {article.title}
            </h1> 

            <p className="text-lg font-medium">
                {article.author}
            </p>

            <p className="text-muted-foreground">
                {article.publishedAt} • 5 min read
            </p>

            <Separator className="border-2" />

            <article className="prose prose-neutral dark:prose-invert max-w-none">
                <p>
                    {article.content}
                </p>

                <p>
                    Another paragraph...
                </p>

                <p>
                    Another paragraph...
                </p>
            </article>

            <Separator className="border-2" />

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Related Articles</h2>
            </section>
        </main>
    )
}
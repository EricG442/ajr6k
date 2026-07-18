import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ArticleContent from "@/components/articles/ArticleContent";

export default function Article() {
    const { slug } = useParams();
    const [article, setArticle] = useState<any>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!slug) return;
            const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).eq("published", true).single();
            if (error) {
                console.error(error);
                return;
            }
            setArticle(data);
        }
        fetchArticle();
    }, [slug]);

    if (!article) {
        return <p>Loading...</p>
    }

    return (
        <div className="mx-auto max-w-4xl p-4">
            <img
                src={article.cover_image}
                alt={article.title}
                className="w-full rounded-xl"
            />
            <h1 className="mt-6 text-4xl font-bold">
                {article.title}
            </h1>
            <p className="mt-2 text-muted-foreground">
                {article.excerpt}
            </p>
            <article className="prose mt-8">
                <ArticleContent content={article.content} />
            </article>
        </div>
    )
}
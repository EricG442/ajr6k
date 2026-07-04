import { articles } from "@/data/articles";

export function getArticles() {
    return articles;
}

export function getFeaturedArticles() {
    return articles.filter( article => article.featured );
}

export function getLatestArticles() {
    return articles.sort( (a, b ) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime() ).slice(0, 3);
}

export function getArticlesByLeague(league: string) {
    return articles.filter( article => article.league.toLowerCase() === league.toLowerCase() );
}

export function getArticleBySlug(slug: string) {
    return articles.find( article => article.slug.toLocaleLowerCase() === slug.toLocaleLowerCase() );
}
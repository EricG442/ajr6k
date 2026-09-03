import { supabase } from "@/lib/supabase";
import { getReaderId } from "@/lib/reader";

export async function getArticleLikeCount(postId: string) {
    const { count, error } = await supabase
        .from("article_likes")
        .select("*", { count: "exact", head: true })
        .eq("post_id", postId);

    if (error) {
        throw error;
    }

    return count ?? 0;
}

export async function hasLikedArticle(postId: string) {
    const readerId = getReaderId();

    const { data, error } = await supabase
        .from("article_likes")
        .select("*")
        .eq("post_id", postId)
        .eq("reader_id", readerId)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return !!data;
}

export async function likeArticle(postId: string) {
    const readerId = getReaderId();

    const { error } = await supabase
        .from("article_likes")
        .insert({ post_id: postId, reader_id: readerId });

    if (error) {
        throw error;
    }
}

export async function unlikeArticle(postId: string) {
    const readerId = getReaderId();

    const { error } = await supabase
        .from("article_likes")
        .delete()
        .eq("post_id", postId)
        .eq("reader_id", readerId);

    if (error) {
        throw error;
    }
}
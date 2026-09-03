import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { 
    getArticleLikeCount,
    hasLikedArticle,
    likeArticle,
    unlikeArticle,
} from "@/lib/articleLikes";

interface ArticleLikeButtonProps {
    postId: string;
}

export default function ArticleLikeButton({ postId }: ArticleLikeButtonProps) {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLikes = async () => {
            try {
                const [articleLiked, likeCount] = await Promise.all([
                    hasLikedArticle(postId),
                    getArticleLikeCount(postId)
                ]);

                setLiked(articleLiked);
                setCount(likeCount);
            } catch (error) {
                console.error("Error loading likes:", error);
            } finally {
                setLoading(false);
            }
        }

        loadLikes();
    }, [postId]);

    const handleLike = async () => {
        if (loading) return;

        try {
            if (liked) {
                await unlikeArticle(postId);
                setLiked(false);
                setCount(prevCount => prevCount - 1);
            } else {
                await likeArticle(postId);
                setLiked(true);
                setCount(prevCount => prevCount + 1);
            }
        } catch (error) {
            console.error("Error updating like status:", error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLike}
            disabled={loading}
            aria-pressed={liked}
            aria-label={liked ? "Unlike article" : "Like article"}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
            <Heart
                size={20}
                className={liked ? "fill-current" : ""}
            />
            <span>{count}</span>
        </button>
    )
}
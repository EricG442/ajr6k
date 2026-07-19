import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function Dashboard() {
    const { profile } = useAuth();
    const [posts, setPosts] = useState<any[]>([]);
    const [stats, setStats] = useState({
        articles: 0,
        drafts: 0,
        published: 0,
        views: 0
    })

    const fetchPosts = async () => {
        if (!profile) return;
        const { data, error } = await supabase.from("posts").select("*").eq("author_id", profile.id).order("created_at", { ascending: false });
        if (error) {
            console.error("Error fetching posts:", error);
            return;
        }
        setPosts(data);
    };

    const deletePost = async (id: string) => {
        const { error } = await supabase.from("posts").delete().eq("id", id);
        if (error) {
            console.error("Error deleting post:", error);
            return;
        }
        fetchPosts();
    };

    const toggleFeatured = async (postId: string) => {
        const { error } = await supabase.rpc("set_featured_post", { target_post_id: postId });
        if (error) {
            console.error("RPC Error:", error);
            return;
        }
        toast.success("Article featured", {
            description: "Your article will be featured on the home page."
        })
        fetchPosts();
    }

    const formatter = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    });

    useEffect(() => {
        const fetchStats = async () => {
            const { count } = await supabase
                .from("posts")
                .select("*", { count: "exact", head: true })
                .eq("author_id", profile?.id) as { count: number | null };
            const { count: draftsCount } = await supabase
                .from("posts")
                .select("*", { count: "exact", head: true })
                .eq("author_id", profile?.id)
                .eq("published", false) as { count: number | null };
            const { count: publishedCount } = await supabase
                .from("posts")
                .select("*", { count: "exact", head: true })
                .eq("author_id", profile?.id)
                .eq("published", true) as { count: number | null };
            setStats(prev => ({
                ...prev,
                articles: count ?? 0,
                drafts: draftsCount ?? 0,
                published: publishedCount ?? 0,
            }));
        };

        fetchStats();
    }, [profile]);

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <div className="p-4 space-y-6">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Dashboard
                </h1>

                <Button>
                    <NavLink to="/article/editor">New Article</NavLink>
                </Button>
            </header>

            <section className="grid grid-cols-2 gap-4">
                {[
                    {title: "Articles", value: stats.articles},
                    {title: "Drafts", value: stats.drafts},
                    {title: "Published", value: stats.published},
                    {title: "Views", value: stats.views}
                ].map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="p-6">
                            <p className="text-sm text-muted-foreground">
                                {stat.title}
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {stat.value}
                            </h2>
                        </CardContent>
                    </Card>
                ))}
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold">
                    Recent Articles
                </h2>

                {posts.map((post) => (
                    <Card key={post.id}>
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="max-w-80 flex flex-col">
                                <h2 className="font-medium">{post.title}</h2>
                                <ul>
                                    <li className="text-sm text-muted-foreground">
                                        Created at: {formatter.format(new Date(post.created_at))}
                                    </li>
                                    <li className="text-sm text-muted-foreground">
                                        Last Updated: {formatter.format(new Date(post.updated_at))}
                                    </li>
                                    {post.published && (
                                        <li className="text-sm text-muted-foreground">
                                            Published at: {formatter.format(new Date(post.published_at))}
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="flex gap-2">
                                {post.published && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => toggleFeatured(post.id)}
                                    >
                                        <Star
                                            className={`h-4 w-4 ${
                                                post.featured
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-muted-foreground"
                                            }`}
                                        />
                                    </Button>
                                )}
                                <Button variant="outline" size="sm">
                                    <NavLink to={`/article/editor/${post.id}`}>Edit</NavLink>
                                </Button>
                                <Button variant="outline" className="bg-destructive text-destructive" size="sm" onClick={() => deletePost(post.id)}>
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    )
}
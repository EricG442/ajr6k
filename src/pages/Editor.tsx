import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TipTap from "@/components/editor/TipTap";
import EditorStats from "@/components/editor/EditorStats";

export default function Editor() {
    const { profile } = useAuth();
    const savedArticle = JSON.parse(localStorage.getItem("savedArticle") ?? "{}")

    const [title, setTitle] = useState(savedArticle.title || "")
    const [slug, setSlug] = useState(savedArticle.slug || "")
    const [excerpt, setExcerpt] = useState(savedArticle.excerpt || "")
    const [content, setContent] = useState(savedArticle.content || {
        type: "doc",
        content: [],
    })

    const generateSlug = (title: string) => {
        return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }

    useEffect(() => {
        setSlug(generateSlug(title));
        localStorage.setItem("savedArticle", JSON.stringify({ title, slug, excerpt, content }))
    }, [title, slug, excerpt, content]);

    const clearEditorRef = useRef<() => void | null>(null);

    const clearContent = () => {
        localStorage.removeItem("savedArticle")
        setTitle("")
        setSlug("")
        setExcerpt("")
        setContent({
            type: "doc",
            content: [],
        })
        clearEditorRef.current?.();
    };

    const handleSubmit = async () => {
        if (!profile) return;
        setSlug(generateSlug(title));
        const { data, error } = await supabase.from("posts").insert({
            author_id: profile?.id,
            title,
            slug,
            excerpt,
            content,
            published: false,
        }).select();
        if (error) {
            console.error("Error creating post:", error);
            return;
        }
        clearContent();
        console.log(data, error);
    }

    return (
        <main className="mx-auto max-w-4xl space-y-6 p-4">
            <h1 className="text-3xl font-bold">
                New Article
            </h1>

            <div className="space-y-2">
                <Label>Title</Label>

                <Input 
                    placeholder="Enter article title..." 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Slug</Label>

                <Input 
                    value={slug}
                    readOnly
                />
            </div>

            <div className="space-y-2">
                <Label>Excerpt</Label>

                <Textarea 
                    placeholder="Short article summary..." 
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                />
            </div>

            <div className="rounded-xl border bg-muted py-12 text-center">
                <TipTap 
                    content={content}
                    onChange={setContent}
                    onEditorReady={(clear) => {
                        clearEditorRef.current = clear;
                    }}
                />
            </div>

            <div className="rounded-xl border bg-muted p-12 text-center flex flex-wrap gap-4 justify-content items-center">
                <Button variant="outline" onClick={handleSubmit}>
                    Save Draft
                </Button>

                <Button>
                    Publish
                </Button>

                <Button variant="destructive" onClick={clearContent}>
                    Clear Content
                </Button>
                <EditorStats content={content} />
            </div>
        </main>
    )
}
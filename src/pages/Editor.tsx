import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TipTap from "@/components/editor/TipTap";
import EditorStats from "@/components/editor/EditorStats";

export default function Editor() {
    const { profile } = useAuth();
    const { id } = useParams();
    const isEdit = Boolean(id);


    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [excerpt, setExcerpt] = useState("")
    const [content, setContent] = useState<object>({
        type: "doc",
        content: [],
    })

    useEffect(() => {
        if (isEdit) return;
        const savedArticle = localStorage.getItem("savedArticle");
        if (savedArticle) {
            const { title, slug, excerpt, content } = JSON.parse(savedArticle);
            setTitle(title);
            setSlug(slug);
            setExcerpt(excerpt);
            setContent(content);
        }
    }, [isEdit]);

    const generateSlug = (title: string) => {
        return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }

    useEffect(() => {
        if (isEdit) return;
        setSlug(generateSlug(title));
        localStorage.setItem("savedArticle", JSON.stringify({ title, slug, excerpt, content }))
    }, [title, slug, excerpt, content, isEdit]);

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
        if (isEdit) {
            await supabase.from("posts").update({ title, slug, excerpt, content }).eq("id", id);
        } else {
            await supabase.from("posts").insert({ title, slug, excerpt, content, author_id: profile.id });
        }
    }

    useEffect(() => {
        if (!isEdit) return;
        const fetchArticle = async () => {
            const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
            if (error) {
                console.error("Error fetching article:", error);
                return;
            }
            setTitle(data.title);
            setSlug(data.slug);
            setExcerpt(data.excerpt);
            setContent(
                typeof data.content === "string" ? JSON.parse(data.content) : data.content
            );
        }
        fetchArticle();
    }, [isEdit, id]);

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
                    {isEdit ? "Update Article" : "Save Draft"}
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TipTap from "@/components/editor/TipTap";
import { useEffect, useRef, useState } from "react";
import EditorStats from "@/components/editor/EditorStats";

export default function Editor() {
    const savedArticle = JSON.parse(localStorage.getItem("savedArticle") ?? "{}")

    const [title, setTitle] = useState(savedArticle.title || "")
    const [slug, setSlug] = useState(savedArticle.slug || "")
    const [excerpt, setExcerpt] = useState(savedArticle.excerpt || "")
    const [content, setContent] = useState(savedArticle.content || "")

    useEffect(() => {
        localStorage.setItem("savedArticle", JSON.stringify({ title, slug, excerpt, content }))
    }, [title, slug, excerpt, content]);

    useEffect(() => {
        const saved = localStorage.getItem("savedArticle")
        if (saved) {
            const article = JSON.parse(saved)
            setTitle(article.title)
            setSlug(article.slug)
            setExcerpt(article.excerpt)
            setContent(article.content)
        }
    }, []);

    const clearEditorRef = useRef<() => void | null>(null);

    const clearContent = () => {
        localStorage.removeItem("savedArticle")
        setTitle("")
        setSlug("")
        setExcerpt("")
        setContent("")
        clearEditorRef.current?.();
    };

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
                    placeholder="seahawks-draft-analysis" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
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
                <Button variant="outline">
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
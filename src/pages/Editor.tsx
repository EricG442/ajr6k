import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import TipTap from "@/components/editor/TipTap";
import EditorStats from "@/components/editor/EditorStats";

export default function Editor() {
    const navigate = useNavigate();
    const { profile } = useAuth();
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [articleId, setArticleId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        league: "",
        cover_image: "",
    });
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState<object>({
        type: "doc",
        content: [],
    })

    useEffect(() => {
        if (isEdit) return;
        const savedArticle = localStorage.getItem("savedArticle");
        if (savedArticle) {
            const article = JSON.parse(savedArticle);
            setFormData( prev => ({
                ...prev,
                title: article.title,
                excerpt: article.excerpt,
                league: article.league,
            }))
            setContent(content);
        }
    }, [isEdit]);

    const generateSlug = (title: string) => {
        return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }

    const clearEditorRef = useRef<() => void | null>(null);

    const clearContent = () => {
        localStorage.removeItem("savedArticle")
        setFormData( prev => ({
            ...prev,
            title: "",
            excerpt: "",
            league: ""
        }))
        setCoverImage(null);
        setCoverPreview("");
        setContent({
            type: "doc",
            content: [],
        })
        clearEditorRef.current?.();
        toast("Editor cleared", {
            description: "All content has been removed."
        })
    };

    const handleSubmit = async () => {
        setSaving(true);
        if (!profile) return;
        let imageUrl = formData.cover_image;
        if (coverImage) {
            const uploadedUrl = await uploadCoverImage();
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            }
        }
        if (isEdit) {
            try {
                await supabase
                    .from("posts")
                    .update({ 
                        title: formData.title, 
                        slug: generateSlug(formData.title), 
                        excerpt: formData.excerpt, 
                        content, 
                        league: formData.league, 
                        cover_image: imageUrl,
                        updated_at: new Date().toISOString(),
                    }).eq("id", id);

                toast.success("Draft updated", {
                    description: "Your article has been updated."
                })
            } catch (error) {
                toast.error("Failed to update draft")
            }
        } else {
            try {
                await supabase
                    .from("posts")
                    .insert({ 
                        title: formData.title, 
                        slug: generateSlug(formData.title), 
                        excerpt: formData.excerpt, 
                        content, 
                        league: formData.league, 
                        cover_image: imageUrl, 
                        author_id: profile.id, 
                        author_name: profile.display_name 
                    });

                toast.success("Draft saved", {
                    description: "Your article draft has been saved."
                });
                navigate("/dashboard");
            } catch (error) {
                toast.error("Failed to save draft")
            }
        }
        setSaving(false);
    }

    const uploadCoverImage = async (): Promise<string | null> => {
        if (!coverImage || !profile) return null;
        const filePath = `${profile.id}/${coverImage.name}`;
        const { error } = await supabase.storage.from("article-images").upload(filePath, coverImage);
        if (error) {
            console.error(error);
            return null;
        };
        const { data } = await supabase.storage.from("article-images").getPublicUrl(filePath);
        return data.publicUrl;
    }

    const handlePublish = async () => {
        if (!profile) return;
        if (!articleId) {
            console.error("No article ID. Save draft first");
            return;
        }
        try {
            await supabase.from("posts").update({ published: true, published_at: new Date().toISOString() }).eq("id", articleId).select();
            toast.success("Draft Published", {
                description: "Your article is now live."
            })
            navigate("/dashboard");
        } catch (error) {
            toast.error("Failed to publish article")
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
            setArticleId(data.id);
            setFormData( prev => ({
                ...prev,
                title: data.title,
                excerpt: data.excerpt,
                league: data.league,
                cover_image: data.cover_image,
            }))
            setContent(
                typeof data.content === "string" ? JSON.parse(data.content) : data.content
            );
            setIsLoaded(true);
        }
        fetchArticle();
    }, [isEdit, id]);



    return (
        <div className="mx-auto max-w-4xl space-y-6 p-4">
            <h1 className="text-3xl font-bold">
                {isEdit ? "Update Article" : "New Article"}
            </h1>
            <div className="flex flex-wrap gap-4">
                <div className="space-y-2 max-w-2/3 flex-1">
                    <Label>Title</Label>

                    <Input 
                        placeholder="Enter article title..." 
                        value={formData.title}
                        onChange={ e => {
                            setFormData((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }}
                    />
                </div>

                <div className="space-y-2 max-w-1/3 flex-1">
                    <Label>Slug</Label>

                    <Input 
                        value={generateSlug(formData.title)}
                        readOnly
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Excerpt</Label>

                <Textarea 
                    placeholder="Short article summary..." 
                    value={formData.excerpt}
                    onChange={ e => {
                        setFormData( prev => ({
                            ...prev,
                            excerpt: e.target.value
                        }))
                    }}
                />
            </div>

            <div>
                <div className="flex flex-row items-center gap-4">
                    <div className="space-y-2">
                        <Label>Cover Image</Label>
                        <Input
                            type="file" 
                            accept="image/*"
                            onChange={ e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                setCoverImage(file);
                                setCoverPreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                    </div>
                    <div className="space-y-2 pt-5">
                        <Select value={formData.league} onValueChange={ value => { setFormData( prev => ({ ...prev, league: value }) ) } }>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a league" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NFL">NFL</SelectItem>
                                <SelectItem value="NBA">NBA</SelectItem>
                                <SelectItem value="MLB">MLB</SelectItem>
                                <SelectItem value="NHL">NHL</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {coverPreview && (
                    <img
                        src={coverPreview}
                        alt="Cover Preview"
                        className="rounded-xl max-h-80 object-cover"
                    />
                )}
                {formData.cover_image && (
                    <img
                        src={formData.cover_image}
                        alt="Article cover"
                        className="rounded-xl max-h-80 object-cover"
                    />
                )}
            </div>

            <div className="rounded-xl border bg-muted py-12">
                <div className="prose editor">
                    <TipTap
                        content={content}
                        isLoaded={isLoaded}
                        onChange={setContent}
                        onEditorReady={(clear) => {
                            clearEditorRef.current = clear;
                        }}
                    />
                </div>
            </div>

            <div className="rounded-xl border bg-muted p-12 text-center flex flex-wrap gap-4 justify-content items-center">
                <Button variant="outline" onClick={handleSubmit} disabled={saving}>
                    {isEdit ? "Update Article" : "Save Draft"}
                </Button>

                <Button onClick={handlePublish}>
                    Publish
                </Button>

                <Button variant="destructive" onClick={clearContent}>
                    Clear Content
                </Button>
                <EditorStats content={content} />
            </div>
        </div>
    )
}
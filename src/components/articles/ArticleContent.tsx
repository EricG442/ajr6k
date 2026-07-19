import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

export default function ArticleContent({ content }: { content: object }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content,
        editable: false,
    });

    return (
        <div className="article-content">
            <EditorContent editor={editor} />
        </div>
    );
}
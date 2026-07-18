import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function ArticleContent({ content }: { content: object }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content,
        editable: false,
    });

    return (
        <EditorContent editor={editor} />
    );
}
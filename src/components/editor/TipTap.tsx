import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import MenuBar from "@/components/editor/MenuBar";

export default function TipTap() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Hello World!</p>"
    })

    const providerValue = useMemo(() => ({ editor }), [editor]);

    return (
        <EditorContext.Provider value={providerValue}>
            <MenuBar />
            <EditorContent editor={editor} />
        </EditorContext.Provider>
    )
}
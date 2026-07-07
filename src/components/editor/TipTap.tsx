import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";
import { useEffect } from "react";

type TipTapProps = {
    content: string;
    onChange: ( content: string ) => void;
    onEditorReady: (clear: () => void) => void;
}

function EditorController({ onEditorReady }: { onEditorReady: (clear: () => void) => void }) {
    const { editor } = useCurrentEditor();

    if (editor) {
        onEditorReady(() => editor.commands.clearContent());
    }

    return null;
}

export default function TipTap({ content, onChange, onEditorReady }: TipTapProps) {
    const { editor } = useCurrentEditor();

    useEffect(() => {
        if (editor) {
            onEditorReady(() => editor.commands.clearContent());
        }
    }, [editor, onEditorReady]);

    return (
        <EditorProvider
            extensions={[
                StarterKit,
                TextAlign.configure({
                    types: ["heading", "paragraph"],
                }),
            ]}
            content={content}
            slotBefore={<MenuBar />}
            onUpdate={({ editor }) => onChange(editor.getHTML())}
        >
            <EditorController onEditorReady={onEditorReady} />
        </EditorProvider>
    )
}
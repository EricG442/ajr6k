import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";
import { useEffect } from "react";

type TipTapProps = {
    content: object;
    onChange: ( content: object ) => void;
    onEditorReady: (clear: () => void) => void;
}

function EditorController({ content, onEditorReady }: { content: object; onEditorReady: (clear: () => void) => void }) {
    const { editor } = useCurrentEditor();

    useEffect(() => {
        if (editor) {
            editor.commands.setContent(content);
            onEditorReady(() => editor.commands.clearContent());
        }
    }, [editor, onEditorReady, content]);

    return null;
}

export default function TipTap({ content, onChange, onEditorReady }: TipTapProps) {
    const { editor } = useCurrentEditor();

    useEffect(() => {
        if (editor) {
            onEditorReady(() => editor.commands.setContent(content));
        }
    }, [editor, onEditorReady, content]);

    useEffect(() => {
        if (editor) {
            const current = editor.getJSON();
            const incoming = JSON.stringify(content);
            if (JSON.stringify(current) !== incoming) {
                editor.commands.setContent(content);
            }
        }
    }, [editor, content]);

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
            onUpdate={({ editor }) => onChange(editor.getJSON())}
        >
            <EditorController content={content} onEditorReady={onEditorReady} />
        </EditorProvider>
    )
}
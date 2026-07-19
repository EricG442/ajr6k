import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";
import { useRef, useEffect } from "react";

type TipTapProps = {
    content: object;
    onChange: ( content: object ) => void;
    onEditorReady: (clear: () => void) => void;
    isLoaded: boolean;
    initialContent?: object | null;
}

const EditorController = ({ content, isLoaded }: { content: object; isLoaded: boolean; }) => {
    const { editor } = useCurrentEditor();
    const hasLoaded = useRef(false);
    useEffect(() => {
        if (!editor || !isLoaded || hasLoaded.current) return;
        editor.commands.setContent(content);
        hasLoaded.current = true;
    }, [editor, isLoaded, content]);

    return null;
}

export default function TipTap({ content, onChange, isLoaded }: TipTapProps) {
    const initialContent = useRef(content);

    return (
        <EditorProvider
            extensions={[
                StarterKit,
                TextAlign.configure({
                    types: ["heading", "paragraph"],
                }),
            ]}
            content={initialContent.current}
            slotBefore={<MenuBar />}
            onUpdate={({ editor }) => onChange(editor.getJSON())}
        >
            <EditorController content={content} isLoaded={isLoaded} />
        </EditorProvider>
    );
}
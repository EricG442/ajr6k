import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";
import { useRef } from "react";

type TipTapProps = {
    content: object;
    onChange: ( content: object ) => void;
    onEditorReady: (clear: () => void) => void;
    initialContent?: boolean;
}

export default function TipTap({ content, onChange }: TipTapProps) {
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
        />
    )
}
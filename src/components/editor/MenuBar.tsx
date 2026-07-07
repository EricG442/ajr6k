import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import MenuBarDropdown from "./MenuBarDropdown";
import {
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    StrikethroughIcon,
    ListIcon,
    ListOrderedIcon,
    TextQuoteIcon
} from "lucide-react";

export default function MenuBar() {
    const { editor } = useCurrentEditor();

    const editorState =
        useEditorState({
            editor,
            selector: () => {
                return {
                    bold: editor?.isActive("bold"),
                    italic: editor?.isActive("italic"),
                    underline: editor?.isActive("underline"),
                    strike: editor?.isActive("strike"),
                    heading1: editor?.isActive("heading", { level: 1 }),
                    heading2: editor?.isActive("heading", { level: 2 }),
                    heading3: editor?.isActive("heading", { level: 3 }),
                    list: editor?.isActive("bulletList"),
                    numberedlist: editor?.isActive("orderedList"),
                    blockquote: editor?.isActive("blockquote"),
                }
            }
        }) ?? {
            bold: false,
            italic: false,
            underline: false,
            strike: false,
            heading1: false,
            heading2: false,
            heading3: false,
            list: false,
            numberedlist: false,
            blockquote: false,
        };

    const Options = [
        {
            label: "Heading 1",
            icon: Heading1Icon,
            onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => editorState.heading1,
        },
        {
            label: "Heading 2",
            icon: Heading2Icon,
            onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => editorState.heading2,
        },
        {
            label: "Heading 3",
            icon: Heading3Icon,
            onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: () => editorState.heading3,
        },
        {
            label: "Bold",
            icon: BoldIcon,
            onClick: () => editor?.chain().focus().toggleBold().run(),
            isActive: () => editorState.bold,
        },
        {
            label: "Italic",
            icon: ItalicIcon,
            onClick: () => editor?.chain().focus().toggleItalic().run(),
            isActive: () => editorState.italic,
        },
        {
            label: "Underline",
            icon: UnderlineIcon,
            onClick: () => editor?.chain().focus().toggleUnderline().run(),
            isActive: () => editorState.underline,
        },
        {
            label: "Strikethrough",
            icon: StrikethroughIcon,
            onClick: () => editor?.chain().focus().toggleStrike().run(),
            isActive: () => editorState.strike,
        },
        {
            label: "Bullet List",
            icon: ListIcon,
            onClick: () => editor?.chain().focus().toggleBulletList().run(),
            isActive: () => editorState.list,
        },
        {
            label: "Numbered List",
            icon: ListOrderedIcon,
            onClick: () => editor?.chain().focus().toggleOrderedList().run(),
            isActive: () => editorState.numberedlist,
        },
        {
            label: "Block Quote",
            icon: TextQuoteIcon,
            onClick: () => editor?.chain().focus().toggleBlockquote().run(),
            isActive: () => editorState.blockquote,
        }
    ];

    return (
        <div className="flex mb-2 px-4">
            <div className="flex flex-wrap items-center gap-2">
                {Options.map((option) => (
                    <Toggle 
                        key={option.label}
                        className="
                            data-[state=on]:bg-primary
                            data-[state=on]:text-primary-foreground
                        "
                        variant="outline" 
                        aria-label={`Toggle ${option.label.toLowerCase()}`} 
                        onPressedChange={option.onClick} 
                        pressed={option.isActive()}
                    >
                        <option.icon />
                    </Toggle>
                ))}
                <MenuBarDropdown />
            </div>
            <div className="ml-auto flex items-center gap-2">
                <Button
                    variant="outline"
                    onClick={() => editor?.chain().focus().undo().run()}
                >
                    Undo
                </Button>
                <Button
                    variant="outline"
                    onClick={() => editor?.chain().focus().redo().run()}
                >
                    Redo
                </Button>
            </div>
        </div>
    );
}
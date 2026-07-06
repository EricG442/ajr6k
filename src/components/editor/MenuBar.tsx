import { useCurrentEditor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import {
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    StrikethroughIcon,
    TextAlignStart 
} from "lucide-react";

export default function MenuBar() {
    const { editor } = useCurrentEditor();

    const Options = [
        {
            label: "Heading 1",
            icon: Heading1Icon,
            onClick: () => editor?.chain().toggleHeading({ level: 1 }).run()
        },
        {
            label: "Heading 2",
            icon: Heading2Icon,
            onClick: () => editor?.chain().toggleHeading({ level: 2 }).run()
        },
        {
            label: "Heading 3",
            icon: Heading3Icon,
            onClick: () => editor?.chain().toggleHeading({ level: 3 }).run()
        },    
        {
            label: "Bold",
            icon: BoldIcon,
            onClick: () => editor?.chain().toggleBold().run()
        },
        {
            label: "Italic",
            icon: ItalicIcon,
            onClick: () => editor?.chain().toggleItalic().run()
        },
        {
            label: "Underline",
            icon: UnderlineIcon,
            onClick: () => editor?.chain().toggleUnderline().run()
        },
        {
            label: "Strikethrough",
            icon: StrikethroughIcon,
            onClick: () => editor?.chain().toggleStrike().run()
        },
    ];

    return (
        <div className="mb-2">
            <div className="flex flex-wrap items-center gap-2">
                {Options.map((option) => (
                    <Toggle variant="outline" aria-label={`Toggle ${option.label.toLowerCase()}`} onClick={option.onClick}>
                        <option.icon />
                    </Toggle>
                ))}
            </div>
        </div>
    );
}
import { useCurrentEditor } from "@tiptap/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";

export default function MenuBarDropdown() {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Align
                    <ArrowDown size={16} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                >
                    Start
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                >
                    Center
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                >
                    End
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
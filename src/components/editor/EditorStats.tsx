type EditorStatsProps = {
    content: any;
};

export default function EditorStats({
    content,
}: EditorStatsProps) {
    const getText = (node: any): string => {
        if (!node) return "";
        if (node.type === "string") return node;
        if (node.type === "text") return node.text || "";
        if (node.content) return node.content.map(getText).join(" ");
        return "";
    }
    const text = getText(content);
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const characterCount = text.length;

    return (
        <div className="flex flex-col gap-2">
            <span>Word Count: {wordCount}</span>
            <span>Character Count: {characterCount}</span>
        </div>
    );
}

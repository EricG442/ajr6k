type EditorStatsProps = {
    content: string;
};

export default function EditorStats({
    content,
}: EditorStatsProps) {
    const text = content.replace(/<[^>]*>/g, "");
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const characterCount = text.length;

    return (
        <div className="flex flex-col gap-2">
            <span>Word Count: {wordCount}</span>
            <span>Character Count: {characterCount}</span>
        </div>
    );
}

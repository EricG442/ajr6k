import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function NewArticle() {
    return (
        <main className="mx-auto max-w-4xl space-y-6 p-4">
            <h1 className="text-3xl font-bold">
                New Article
            </h1>

            <div className="space-y-2">
                <Label>Title</Label>

                <Input placeholder="Enter article title..." />
            </div>

            <div className="space-y-2">
                <Label>Slug</Label>

                <Input placeholder="seahawks-draft-analysis" />
            </div>

            <div className="space-y-2">
                <Label>Excerpt</Label>

                <Textarea placeholder="Short article summary..." />
            </div>

            <div className="rounded-xl border bg-muted p-12 text-center">
                <Button variant="outline">
                    Save Draft
                </Button>

                <Button>
                    Publish
                </Button>
            </div>
        </main>
    )
}
import { Badge } from "@/components/ui/badge";

export default function Article() {
    return (
        <main className="mx-auto max-w-3xl p-4 space-y-8">
            <div className="h-64 rounded-xl bg-muted" />

            <Badge>Seahawks</Badge>

            <h1 className="text-4xl font-bold">
                Seahawks Shock NFL with Blockbuster Trade    
            </h1> 

            <p className="text-muted-foreground">
                June 28 • 5 min read
            </p>

            <article className="prose prose-neutral dark:prose-invert max-w-none">
                <p>
                    Lorem ipsum dolor sit amet...
                </p>

                <p>
                    Another paragraph...
                </p>

                <p>
                    Another paragraph...
                </p>
            </article>
        </main>
    )
}
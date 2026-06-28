import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <main className="mx-auto max-w-6xl p-4 space-y-8">
            {/* Header */}
            <header className="space-y-4">
                <h1 className="text-3xl font-bold">AJR6K</h1>

                <Input placeholder="Search articles..." />
            </header>

            {/* Featured */}
            <section>
                <h2 className="mb-4 text-xl font-semibold">
                    Featured Story
                </h2>

                <Card className="overflow-hidden">
                    <div className="h-56 bg-muted" />

                    <CardContent className="space-y-4 p-6">
                        <Badge>Seahawks</Badge>

                        <h3 className="text-2xl font-bold">
                            Seahawks Shock NFL with Blockbuster Trade
                        </h3>

                        <p className="text-muted-foreground">
                            A quick summary of the article goes here
                        </p>

                        <Button>Read Article</Button>
                    </CardContent>
                </Card>
            </section>

            {/* Latest */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Latest Stories
                </h2>

                {[1, 2, 3].map((story) => (
                    <Card key={story}>
                        <CardContent className="flex gap-4-p-4">
                            <div className="h-20 w-20 rounded-md bg-muted" />
                            
                            <div className="space-y-2">
                                <h3 className="font-semibold">
                                    Sample Article Title
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Short Description...
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </main>
    )
}
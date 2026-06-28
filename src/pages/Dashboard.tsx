import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    return (
        <main className="p-4 space-y-6">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Dashboard
                </h1>

                <Button>New Article</Button>
            </header>

            <section className="grid grid-cols-2 gap-4">
                {[
                    ["Articles", 42],
                    ["Drafts", 3],
                    ["Published", 39],
                    ["Views", "12.3k"]
                ].map(([title, value]) => (
                    <Card key={title}>
                        <CardContent className="p-6">
                            <p className="text-sm text-muted-foreground">
                                {title}
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {value}
                            </h2>
                        </CardContent>
                    </Card>
                ))}
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold">
                    Recent Articles
                </h2>

                {[1, 2, 3].map((article) => (
                    <Card key={article}>
                        <CardContent className="flex items-center justify-between p-4">
                            <div>
                                <h3 className="font-medium">
                                    Seahawks Draft Analysis
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Published yesterday
                                </p>
                            </div>

                            <Button variant="outline">
                                Edit
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </main>
    )
}
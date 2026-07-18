import type { Article } from "@/data/articles";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

type FeaturedCardProps = {
    article: Article
}

export function FeaturedCard({ article }: FeaturedCardProps) {
    return (
        <div>
            <Card  key={article.id} className="overflow-hidden">
                <img
                    src={article.cover_image}
                    alt={article.title}
                    className="h-56"
                />

                <CardContent className="space-y-4 p-6">
                    <Badge>{article.league}</Badge>

                    <h3 className="text-2xl font-bold">
                        {article.title}
                    </h3>

                    <p className="text-muted-foreground">
                        {article.excerpt}
                    </p>

                    <Button asChild>
                        <NavLink to={`/article/${article.slug}`}>
                            Read Article
                        </NavLink>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
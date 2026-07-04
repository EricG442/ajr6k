import type { Article } from "@/data/articles";

import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router-dom";

type MiniCardProps = {
    article: Article;
}

export function MiniCard({ article }: MiniCardProps) {
    return (
        <NavLink to={`/article/${article.slug}`}>
            <Card>
                <CardContent className="flex gap-4-p-4">
                    <div className="h-20 w-20 rounded-md bg-muted" />
                
                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            {article.title}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            {article.summary}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </NavLink>
    );
}
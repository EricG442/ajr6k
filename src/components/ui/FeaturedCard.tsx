import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FeaturedCard() {
    return (
        <div>
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
        </div>
    );
}
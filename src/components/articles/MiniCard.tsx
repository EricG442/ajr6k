import { Card, CardContent } from "@/components/ui/card";

type cardProps = {
    id: number;
}

export function MiniCard({ id }: cardProps) {
    return (
        <div>
            <Card key={id}>
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
        </div>
    );
}
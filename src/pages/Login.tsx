import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
    return (
        <main className="mx-auto max-w-6xl p-4">
            <Card className="overflow-hidden">
                <CardContent className="space-y-4 p-6">
                    <div>
                        <Label>email</Label>

                        <Input placeholder="example@email.com" />
                    </div>

                    <div>
                        <Label>password</Label>

                        <Input placeholder="password" />
                    </div>

                    <Button>Login</Button>
                </CardContent>
            </Card>
        </main>
    )
}
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user) {
            navigate("/dashboard");
        }
    }, [loading, user, navigate]);

    const handleLogin = async (email: string, password: string) => {
        setError("");
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setError(error.message);
            return;
        } 
    };

    return (
        <main className="mx-auto max-w-6xl p-4">
            <Card className="overflow-hidden">
                <CardContent className="space-y-4 p-6">
                    <div>
                        <Label>email</Label>

                        <Input
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>password</Label>

                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <Button onClick={() => handleLogin(email, password)} disabled={loading}>
                            {loading ? "Logging in..." : "Log in"}
                        </Button>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
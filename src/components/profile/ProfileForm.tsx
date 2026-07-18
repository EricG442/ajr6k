import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldDescription,
    FieldLabel
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ProfileForm() {
    const { profile } = useAuth();
    const [formData, setFormData] = useState({
        display_name: "",
        username: "",
        role: "",
        bio: "",
    });
    const [originalData, setOriginalData] = useState({
        display_name: "",
        username: "",
        role: "",
        bio: "",
    });
    const hasChanges = formData.display_name !== originalData.display_name || formData.bio !== originalData.bio;
    
    useEffect(() => {
        async function loadProfile() {
            if (!profile?.id) return;
            const { data } = await supabase.from("profiles").select("*").eq("id", profile.id).single();
            if (data) {
                const profileData = {
                    display_name: data.display_name ?? "",
                    username: data.username ?? "",
                    role: data.role ?? "",
                    bio: data.bio ?? "",
                }
                setFormData(profileData);
                setOriginalData(profileData);
            }
        }
        loadProfile();
    }, [profile]);

    const handleSubmit = async () => {
        if (!profile?.id) return;
        if (!hasChanges) {
            console.log("no changes detected");
            return;
        }
        await supabase.from("profiles").update({ display_name: formData.display_name, bio: formData.bio }).eq("id", profile.id);
        setOriginalData(formData);
    }

    return (
        <div>
            <div className="flex flex-row gap-2">
                <Field>
                    <FieldLabel>Display Name</FieldLabel>
                    <Input
                        value={formData.display_name}
                        onChange={ e => {
                            setFormData( prev => ({
                                ...prev,
                                display_name: e.target.value
                            }))
                        }}
                    />
                </Field>
                <div className="flex flex-row gap-2">
                    <Field>
                        <FieldLabel>Username</FieldLabel>
                        <Input value={formData.username} readOnly />
                        <FieldDescription>Username is not an editable field</FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel>User Role</FieldLabel>
                        <Input value={formData.role} readOnly />
                        <FieldDescription>User Role is not an editable field</FieldDescription>
                    </Field>
                </div> 
            </div>
            <Field>
                <FieldLabel>User Bio</FieldLabel>
                <Textarea 
                    value={formData.bio}
                    onChange={ e => {
                        setFormData( prev => ({ ...prev, bio: e.target.value }) );
                    }}
                />
            </Field>
            <Button className="mt-2" onClick={handleSubmit} disabled={!hasChanges}>Save Changes</Button>
        </div>
    );
}
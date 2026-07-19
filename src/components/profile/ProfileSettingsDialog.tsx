import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ProfileForm from "./ProfileForm";

export default function ProfileDialog() {
    return (
        <DialogContent className="max-w-120">
            <DialogHeader>
                <DialogTitle>Profile Settings</DialogTitle>
            </DialogHeader>
            <ProfileForm />
        </DialogContent>
    );
}
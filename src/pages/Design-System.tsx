import { Colors } from "@/design-system/Colors";
import { Typography } from "@/design-system/Typography";
import { Buttons } from "@/design-system/Buttons";
import { Spacing } from "@/design-system/Spacing";
import { Separator } from "@/components/ui/separator";

export function DesignSystem() {
    return (
        <div>
            <Colors />

            <Separator className="mt-1" />

            <Typography />

            <Separator className="mt-1" />

            <Buttons />

            <Separator className="mt-1" />

            <Spacing />
        </div>
    );
}
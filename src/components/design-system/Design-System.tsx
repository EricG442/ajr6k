import { Colors } from "@/components/design-system/Colors";
import { Typography } from "@/components/design-system/Typography";
import { Buttons } from "@/components/design-system/Buttons";
import { SpacingSystem } from "@/components/design-system/Spacing-System";
import { Separator } from "@/components/ui/separator";



export function DesignSystem() {
    return (
        <div>
            <Separator className="my-4" />

            {/* color block */}
            
            <Colors />

            <Separator className="my-4" />

            {/* typography */}

            <Typography />

            <Separator className="my-4" />

            {/* button block */}

            <Buttons />

            <Separator className="my-4" />

            {/* spacing system */}

            <SpacingSystem />

            <Separator className="my-4" />
        </div>
    );
}
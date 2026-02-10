import * as LucideIcons from "lucide-react";
import React from "react";
import type { IconName } from "./iconName";

interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
}

export const Icon: React.FC<IconProps> = ({
                                              name,
                                              size = 20,
                                              color = "currentColor",
                                          }) => {
    const IconComponent = LucideIcons[name] as React.ElementType;
    return <IconComponent size={size} color={color} />;
};

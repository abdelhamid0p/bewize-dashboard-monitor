import * as LucideIcons from "lucide-react";
import React from "react";
import { cn } from "@/shared/lib/utils";
import type { IconName } from "./iconName";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, className }) => {
  const IconComponent = LucideIcons[name] as React.ElementType;

  if (!IconComponent) return null;

  return <IconComponent size={size} className={cn("shrink-0", className)} />;
};

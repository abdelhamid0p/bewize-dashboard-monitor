import * as React from "react";
import { cn } from "@/shared/lib/utils";

export type TextVariant =
  | "display"
  | "title"
  | "subtitle"
  | "body"
  | "body-sm"
  | "caption"
  | "error";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  as?: React.ElementType;
}

export const Text = ({
  variant = "body",
  as: Component = "p",
  className,
  ...props
}: TextProps) => {
  return (
    <Component
      className={cn(
        "font-sans",
        {
          // DISPLAY
          "text-xl 2xl:text-5xl md:text-4xl sm:text-lg font-semibold":
            variant === "display",

          // TITLE
          "text-xl 2xl:text-2xl md:text-lg sm:text-md font-medium":
            variant === "title",

          // SUBTITLE
          "text-lg 2xl:text-xl md:text-md sm:text-sm font-medium":
            variant === "subtitle",

          // BODY
          "text-md 2xl:text-lg md:text-sm sm:text-xs font-normal":
            variant === "body",

          "text-sm md:text-xs font-normal":
            variant === "body-sm",

          "text-xs text-neutral-600":
            variant === "caption",

          "text-xs text-red-500":
            variant === "error",
        },
        className
      )}
      {...props}
    />
  );
};

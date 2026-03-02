import * as React from "react";
import { cn } from "@/shared/lib/utils";

export type ImageVariant =
  | "logo"
  | "auth-logo"
  | "auth-illustration"
  | "avatar"
  | "icon"
  | "full-width";

interface ImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: ImageVariant;
}

export const Image = ({
  variant = "full-width",
  className,
  ...props
}: ImageProps) => {
  return (
    <img
      className={cn(
        "block",
        {
          /* ===== GENERIC LOGO ===== */
          "h-6 sm:h-7 lg:h-8 w-auto":
            variant === "logo",

          /* ===== AUTH LOGO (Login specific) ===== */
          "h-6 sm:h-7 lg:h-8 w-auto 2xl:mb-[8vh]":
            variant === "auth-logo",

          /* ===== AUTH ILLUSTRATION ===== */
          "w-full max-w-md lg:max-w-lg 2xl:max-w-2xl object-contain":
            variant === "auth-illustration",

          /* ===== AVATAR ===== */
          "w-10 h-10 md:w-12 md:h-12 rounded-full object-cover":
            variant === "avatar",

          /* ===== ICON ===== */
          "w-4 h-4 md:w-5 md:h-6":
            variant === "icon",

          /* ===== FULL WIDTH ===== */
          "w-full object-cover":
            variant === "full-width",
        },
        className
      )}
      {...props}
    />
  );
};

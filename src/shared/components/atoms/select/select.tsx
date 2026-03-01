import * as React from "react";
import { cn } from "@/shared/lib/utils";
import {
  Select as ShadSelect,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/shared/components/ui/select";

type SelectVariant = "compact" | "default" | "filtres";
type SelectColor = "default" | "secondary";

interface SelectProps {
  label: string;
  variant?: SelectVariant;
  color?: SelectColor;
  children: React.ReactNode;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const variantStyles: Record<SelectVariant, string> = {
  compact: "",
  default: "",
  filtres: "",
};

const colorStyles: Record<SelectColor, string> = {
  default: "bg-primary-500 text-neutral-100 hover:bg-primary-600",
  secondary:
    "bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-100",
};

export function Select({
  label,
  variant = "default",
  color = "default",
  children,
  defaultValue,
  onChange,
}: SelectProps) {
  const [value, setValue] = React.useState<string>(defaultValue || "");
  const isFiltres = variant === "filtres";
  // Only has value when it's not empty, not "all", and not "__all__"
  const hasValue =
    isFiltres && value !== "" && value !== "all" && value !== "__all__";

  const handleValueChange = (nextValue: string) => {
    setValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <ShadSelect
      defaultValue={defaultValue || ""}
      onValueChange={handleValueChange}
    >
      <SelectTrigger
        className={cn(
          "inline-flex items-center justify-center",
          "h-[100px]",
          "px-[15px] py-[11px]",
          "gap-[11px]",
          "rounded-[24px]",

          /* ===== Typography (Figma) ===== */
          "font-sans font-light text-md",
          "text-center",
          "rounded-full text-sm w-auto",
          "border-0",

          isFiltres
            ? cn(
                "bg-white font-light ",
                hasValue
                  ? "text-[#7300FF] [&>svg]:text-[#7300FF] font-medium"
                  : "text-[#666666] [&>svg]:text-[#666666]",
              )
            : cn(variantStyles[variant], colorStyles[color]),
        )}
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent
        className="rounded-[16px] border border-neutral-200 p-1 z-50 bg-white backdrop-opacity-85"
        position="popper"
        side="bottom"
        align="start"
      >
        {children}
      </SelectContent>
    </ShadSelect>
  );
}

export { SelectItem };

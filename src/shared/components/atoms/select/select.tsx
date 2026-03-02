import * as React from "react";
import { cn } from "@/shared/lib/utils";
import {
  Select as ShadSelect,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/shared/components/ui/select";

type SelectVariant = "compact" | "default" | "filtres" | "statsFilter";
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
  filtres: "text-[#666666] [&>svg]:text-[#666666]",
  statsFilter: "bg-[#F9F9F9] text-[#626262] [&>svg]:text-[#626262]",
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
  const isStatsFilter = variant === "statsFilter";
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
          "h-9 lg:h-10",
          "px-3 lg:px-4 py-2",
          "gap-2",
          "rounded-full",

          /* ===== Typography ===== */
          "font-sans font-light text-xs lg:text-sm",
          "text-center",
          "w-auto min-w-[100px] max-w-[160px]",
          "border-0",

          isFiltres
            ? cn(
                "bg-white font-light ",
                hasValue
                  ? "text-[#7300FF] [&>svg]:text-[#7300FF] font-medium"
                  : "text-[#666666] [&>svg]:text-[#666666]",
              )
            : isStatsFilter
              ? variantStyles.statsFilter
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

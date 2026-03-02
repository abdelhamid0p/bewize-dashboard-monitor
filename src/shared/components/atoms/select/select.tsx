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
          "h-5 sm:h-6 md:h-7 lg:h-8 xl:h-9",
          "px-1 sm:px-1.5 md:px-2 lg:px-2.5 xl:px-3 py-0.5",
          "gap-0.5 sm:gap-0.5 md:gap-1 lg:gap-1.5",
          "rounded-full",

          /* ===== Typography ===== */
          "font-sans font-light text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs",
          "text-center",
          "w-auto min-w-10 sm:min-w-12 md:min-w-14 lg:min-w-16 xl:min-w-20 max-w-16 sm:max-w-20 md:max-w-24 lg:max-w-28 xl:max-w-32",
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
        className="rounded-xl border border-neutral-200 p-0.5 z-50 bg-white backdrop-opacity-85 text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs"
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

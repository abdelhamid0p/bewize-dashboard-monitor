import * as React from "react"
import { cn } from "@/shared/lib/utils"
import {
  Select as ShadSelect,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/shared/components/ui/select"

/* ============================= */
/* Types */
/* ============================= */

type SelectVariant = "compact" | "default" | "list"
type SelectColor = "default" | "secondary" | "list"

interface SelectProps {
  label: string
  variant?: SelectVariant
  color?: SelectColor
  children: React.ReactNode
  defaultValue?: string

  className?: string
  triggerClassName?: string
  contentClassName?: string
}

/* ============================= */
/* Styles */
/* ============================= */

const variantStyles: Record<SelectVariant, string> = {
  compact: "min-w-[140px] h-9 px-4 py-2",
  default: "min-w-[195px] h-9 px-4 py-2",

  // 🎯 Figma list variant
  list: "min-w-[181px] h-[36px] px-[10px] py-[12px] gap-[10px] rounded-[24px]",
}

const colorStyles: Record<SelectColor, string> = {
  default:
    "bg-primary-500 text-neutral-100 border border-transparent hover:bg-primary-600",

  secondary:
    "bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-100",

  list:
    "bg-[#F9F9F9] text-neutral-700 border border-transparent hover:bg-neutral-200",
}

/* ============================= */
/* Component */
/* ============================= */

export function Select({
  label,
  variant = "default",
  color = "default",
  children,
  defaultValue,
  className,
  triggerClassName,
  contentClassName,
}: SelectProps) {
  return (
    <ShadSelect defaultValue={defaultValue || ""}>
      <SelectTrigger
        className={cn(
          "inline-flex items-center justify-center",
          "font-sans font-normal text-3xs 2xl:text-sm",
          "text-center",
          "rounded-full",
          "gap-2",
          variantStyles[variant],
          colorStyles[color],
          className,
          triggerClassName
        )}
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent
        position="popper"
        side="bottom"
        align="start"
        className={cn(
          "rounded-2xl border border-neutral-200 shadow-lg p-1 z-50",
          contentClassName
        )}
      >
        {children}
      </SelectContent>
    </ShadSelect>
  )
}

export { SelectItem }

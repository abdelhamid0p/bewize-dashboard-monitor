import * as React from "react"
import { cn } from "@/shared/lib/utils"
import {
    Select as ShadSelect,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem,
} from "@/shared/components/ui/select"

type SelectVariant = "compact" | "default"
type SelectColor = "default" | "secondary"

interface SelectProps {
    label: string
    variant?: SelectVariant
    color?: SelectColor
    children: React.ReactNode
    defaultValue?: string
}

const variantStyles: Record<SelectVariant, string> = {
    compact: "w-[92px]",
    default: "w-[195px]",
}

const colorStyles: Record<SelectColor, string> = {
    default: "bg-primary-500 text-neutral-100 hover:bg-primary-600",
    secondary: "bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-100",
}

export function Select({
                           label,
                           variant = "default",
                           color = "default",
                           children,
                           defaultValue,
                       }: SelectProps) {
    return (
        <ShadSelect defaultValue={defaultValue || ""}>
            <SelectTrigger
                className={cn(
                    "inline-flex items-center justify-center",
                    " h-[100px]",
                    "px-[15px] py-[11px]",
                    "gap-[11px]",
                    "rounded-[24px]",

                    /* ===== Typography (Figma) ===== */
                    "font-sans font-light text-md",
                    " text-center","rounded-full  text-sm w-auto",
                    variantStyles[variant],
                    colorStyles[color],
                )}
            >
                <SelectValue placeholder={label} />
            </SelectTrigger>

            <SelectContent
                className="rounded-[16px] border border-neutral-200 shadow-lg p-1 z-50"
                position="popper"
                side="bottom"
                align="start"
            >
                {children}
            </SelectContent>

        </ShadSelect>
    )
}

export { SelectItem }

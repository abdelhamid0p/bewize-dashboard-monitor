import { useMemo } from "react";
import { Calendar } from "lucide-react";

interface DateRangeValue {
  from?: string;
  to?: string;
}

interface DateRangeFilterProps {
  label: string;
  value?: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
}

function formatDisplayDate(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function DateRangeFilter({
  label,
  value,
  onChange,
}: DateRangeFilterProps) {
  const triggerText = useMemo(() => {
    if (value?.from && value?.to) {
      return `${formatDisplayDate(value.from)} - ${formatDisplayDate(value.to)}`;
    }

    if (value?.from) {
      return `Depuis ${formatDisplayDate(value.from)}`;
    }

    if (value?.to) {
      return `Jusqu'au ${formatDisplayDate(value.to)}`;
    }

    return label;
  }, [label, value?.from, value?.to]);

  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center justify-center shrink-0 h-5 sm:h-6 md:h-7 lg:h-8 xl:h-9 px-1 sm:px-1.5 md:px-2 lg:px-2.5 xl:px-3 py-0.5 gap-0.5 sm:gap-1 md:gap-1 lg:gap-1.5 rounded-full w-fit border-0 bg-white text-[#666666] font-sans font-light text-[0.4rem] sm:text-[0.5rem] md:text-[0.55rem] lg:text-[0.625rem] xl:text-xs"
      >
        <Calendar className="h-3 w-3" />
        <span>{triggerText}</span>
      </button>

      <div className="hidden group-hover:flex group-focus-within:flex absolute right-0 top-full mt-1 z-50 min-w-[16rem] flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-3 shadow-md">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[#666666]">Date de debut</label>
          <input
            type="date"
            value={value?.from ?? ""}
            onChange={(e) =>
              onChange({ from: e.target.value || undefined, to: value?.to })
            }
            className="h-8 rounded-md border border-neutral-200 px-2 text-xs outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[#666666]">Date de fin</label>
          <input
            type="date"
            value={value?.to ?? ""}
            min={value?.from}
            onChange={(e) =>
              onChange({ from: value?.from, to: e.target.value || undefined })
            }
            className="h-8 rounded-md border border-neutral-200 px-2 text-xs outline-none"
          />
        </div>
      </div>
    </div>
  );
}

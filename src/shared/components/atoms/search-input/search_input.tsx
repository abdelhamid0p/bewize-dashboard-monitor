import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchInput = ({
  placeholder = "Rechercher...",
  value,
  onChange,
}: SearchInputProps) => {
  return (
    <div className="relative w-full min-w-[80px] sm:min-w-[100px] md:min-w-[140px] lg:min-w-[180px] max-w-[140px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-xs xl:max-w-sm">
      <Search className="absolute left-1.5 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-5 sm:pl-6 md:pl-8 lg:pl-10 pr-1.5 sm:pr-2 md:pr-3 lg:pr-4 py-0.5 sm:py-1 md:py-1.5 lg:py-2 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm rounded-full w-full h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10"
      />
    </div>
  );
};

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
    <div className="relative w-full min-w-[120px] md:min-w-[160px] lg:min-w-[200px] max-w-[180px] md:max-w-xs lg:max-w-sm xl:max-w-md">
      <Search className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-7 md:pl-9 lg:pl-10 pr-2 md:pr-3 lg:pr-4 py-1 md:py-1.5 lg:py-2 text-[10px] md:text-xs lg:text-sm rounded-full w-full h-7 md:h-8 lg:h-9 xl:h-10"
      />
    </div>
  );
};

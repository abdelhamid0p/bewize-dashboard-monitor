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
    <div className="relative w-full min-w-[200px] max-w-xs lg:max-w-sm xl:max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-10 pr-4 py-2 text-sm rounded-full w-full"
      />
    </div>
  );
};

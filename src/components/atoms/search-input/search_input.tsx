import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
    <div className="relative min-w-90 max-w-2xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2  text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-10 rounded-full"
      />
    </div>
  );
};

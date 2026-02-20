import { Select, SelectItem } from "@/components/atoms/select/select";

interface StudentsFiltersProps {
  onFilterChange?: (filters: any) => void;
}

export const StudentsFilters = ({ onFilterChange }: StudentsFiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select
        label="Genre"
        variant="filtres"
        color="secondary"
        /*onChange={(value) =>
          onFilterChange?.({ gender: value === "all" ? undefined : value })
        }*/
      >
        <SelectItem value="all">Tous</SelectItem>
        <SelectItem value="FEMALE">Fille</SelectItem>
        <SelectItem value="MALE">Garçon</SelectItem>
      </Select>

      <Select
        label="Type d'appareil"
        variant="filtres"
        color="secondary"
        /*onChange={(value) =>
          onFilterChange?.({ gender: value === "all" ? undefined : value })
        }*/
      >
        <SelectItem value="FEMALE">Fille</SelectItem>
        <SelectItem value="MALE">Garçon</SelectItem>
      </Select>

      <Select
        label="Niveau"
        variant="filtres"
        color="secondary"
        /*onChange={(value) =>
          onFilterChange?.({ gender: value === "all" ? undefined : value })
        }*/
      >
        <SelectItem value="FEMALE">Fille</SelectItem>
        <SelectItem value="MALE">Garçon</SelectItem>
      </Select>

      <Select
        label="Type d'abonnement"
        variant="filtres"
        color="secondary"
        /*onChange={(value) =>
          onFilterChange?.({ gender: value === "all" ? undefined : value })
        }*/
      >
        <SelectItem value="FEMALE">Fille</SelectItem>
        <SelectItem value="MALE">Garçon</SelectItem>
      </Select>

      <Select
        label="Type de plan"
        variant="filtres"
        color="secondary"
        /*onChange={(value) =>
          onFilterChange?.({ gender: value === "all" ? undefined : value })
        }*/
      >
        <SelectItem value="FEMALE">Fille</SelectItem>
        <SelectItem value="MALE">Garçon</SelectItem>
      </Select>

      <Select
        label="Cycle"
        variant="filtres"
        color="secondary"
        /*onChange={(value) =>
          onFilterChange?.({ cycle: value === "all" ? undefined : value })
        }*/
      >
        <SelectItem value="all">Tous</SelectItem>
        <SelectItem value="ELEMENTARY_SCHOOL">Primaire</SelectItem>
        <SelectItem value="MIDDLE_SCHOOL">Collège</SelectItem>
        <SelectItem value="HIGH_SCHOOL">Lycée</SelectItem>
      </Select>
    </div>
  );
};

import { Select, SelectItem } from "@/components/atoms/select/select";

export const StudentsFilters = () => {
  return (
    <div className="flex items-center gap-3">
      <Select label="Filtre" variant="compact">
        <SelectItem value="all">Tous</SelectItem>
        <SelectItem value="active">Actifs</SelectItem>
        <SelectItem value="inactive">Inactifs</SelectItem>
      </Select>

      <Select label="Type d'abonnement" variant="compact">
        <SelectItem value="all">Tous</SelectItem>
        <SelectItem value="premium">Premium</SelectItem>
        <SelectItem value="freemium">Freemium</SelectItem>
      </Select>

      <Select label="Mensuel" variant="compact">
        <SelectItem value="all">Tous</SelectItem>
        <SelectItem value="monthly">Mensuel</SelectItem>
        <SelectItem value="annual">Annuel</SelectItem>
      </Select>

      <Select label="Type d'événement" variant="compact">
        <SelectItem value="all">Tous</SelectItem>
        <SelectItem value="online">En ligne</SelectItem>
        <SelectItem value="offline">Hors ligne</SelectItem>
      </Select>
    </div>
  );
};

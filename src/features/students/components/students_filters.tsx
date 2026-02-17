import { Select, SelectItem } from "@/components/atoms/select/select";
import { Button } from "@/components/ui/button";

export const StudentsFilters = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Actif - badge spécial */}
      <Select label="Actif" variant="compact" color="secondary">
        <SelectItem value="all">Tous</SelectItem>
        <SelectItem value="active">Actif</SelectItem>
        <SelectItem value="inactive">Inactif</SelectItem>
      </Select>

      <Select label="Type d'abonnement" variant="compact" color="secondary">
        <SelectItem value="all">Tous</SelectItem>
        <SelectItem value="premium">Premium</SelectItem>
        <SelectItem value="freemium">Freemium</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="essai">Essai gratuit</SelectItem>
      </Select>

      <Select label="Type de plan" variant="compact" color="secondary">
        <SelectItem value="all">Tous</SelectItem>
        <SelectItem value="monthly">Mensuel</SelectItem>
        <SelectItem value="annual">Annuel</SelectItem>
        <SelectItem value="trimestriel">Trimestriel</SelectItem>
      </Select>

      {/* Bouton créer */}
      <Button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-5 text-sm whitespace-nowrap">
        + Créer un abonnement
      </Button>
    </div>
  );
};

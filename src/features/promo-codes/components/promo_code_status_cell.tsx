import { Badge } from "@/shared/components/ui/badge";
import type { PromoCodeStatus } from "../adapters/mapOrdersToPromoCodesRows";

interface PromoCodeStatusCellProps {
  status: PromoCodeStatus;
}

export const PromoCodeStatusCell = ({ status }: PromoCodeStatusCellProps) => {
  const label =
    status === "active"
      ? "Actif"
      : status === "pending"
        ? "En attente"
        : "Expire";

  const variant =
    status === "active"
      ? "secondary"
      : status === "pending"
        ? "outline"
        : "destructive";

  return <Badge variant={variant}>{label}</Badge>;
};

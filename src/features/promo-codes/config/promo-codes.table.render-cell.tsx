import type {
  PromoCodeRow,
  PromoCodeStatus,
} from "../adapters/mapOrdersToPromoCodesRows";
import { PromoCodeActionsCell, PromoCodeViewCell } from "../components";
import { StatusIndicator } from "@/components/atoms/status-indicator";
import { PercentageBadge } from "@/components/atoms/percentage-badge";

type DotColor = "red" | "blue" | "green" | "orange";

const getPromoCodeStatusConfig = (
  status: PromoCodeStatus,
): { label: string; dotColor: DotColor; textColor: DotColor } => {
  switch (status) {
    case "active":
      return { label: "Actif", dotColor: "green", textColor: "green" };
    case "pending":
      return {
        label: "En attente",
        dotColor: "orange",
        textColor: "orange",
      };
    case "expired":
      return { label: "Expiré", dotColor: "red", textColor: "red" };
    default:
      return { label: status, dotColor: "red", textColor: "red" };
  }
};

export const renderPromoCodeCell = (
  promoCode: PromoCodeRow,
  columnKey: string,
) => {
  switch (columnKey) {
    case "percentage":
      return <PercentageBadge percentage={promoCode.percentage} />;

    case "status": {
      const config = getPromoCodeStatusConfig(promoCode.status);
      return (
        <StatusIndicator
          label={config.label}
          dotColor={config.dotColor}
          textColor={config.textColor}
        />
      );
    }

    case "view":
      return (
        <PromoCodeViewCell
          promoCodeId={promoCode.id}
          onView={(promoCodeId) => console.log("Voir", promoCodeId)}
        />
      );

    case "actions":
      return (
        <PromoCodeActionsCell
          promoCodeId={promoCode.id}
          onEdit={(promoCodeId) => console.log("Edit", promoCodeId)}
          onDelete={(promoCodeId) => console.log("Delete", promoCodeId)}
        />
      );

    default:
      return (
        <span className="text-sm font-medium text-neutral-800">
          {promoCode[columnKey as keyof PromoCodeRow]}
        </span>
      );
  }
};

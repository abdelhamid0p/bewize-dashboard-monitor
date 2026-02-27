import type { PromoCodeRow } from "../types";
import { PromoCodeActionsCell } from "../components";
import { StatusIndicator } from "@/components/atoms/status-indicator";
import { PercentageBadge } from "@/components/atoms/percentage-badge";

type DotColor = "red" | "blue" | "green" | "orange";

const getPromoCodeStatus = (code: PromoCodeRow): "active" | "expired" => {
  const end = new Date(code.endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return end >= today ? "active" : "expired";
};

const getPromoCodeStatusConfig = (
  status: "active" | "expired",
): { label: string; dotColor: DotColor; textColor: DotColor } => {
  switch (status) {
    case "active":
      return { label: "Actif", dotColor: "green", textColor: "green" };
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
      const status = getPromoCodeStatus(promoCode);
      const config = getPromoCodeStatusConfig(status);
      return (
        <StatusIndicator
          label={config.label}
          dotColor={config.dotColor}
          textColor={config.textColor}
        />
      );
    }

    case "actions":
      return <PromoCodeActionsCell promoCodeId={promoCode.id} />;

    default:
      return (
        <span className="text-sm font-medium text-neutral-800">
          {promoCode[columnKey as keyof PromoCodeRow]}
        </span>
      );
  }
};

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

/**
 * Promo Codes cell renderers
 */

import type { ReactNode } from "react";
import { StatusIndicator } from "@/shared/components/atoms/status-indicator";
import { PercentageBadge } from "@/shared/components/atoms/percentage-badge";
import { PromoCodeActionsCell } from "../components";
import type { PromoCodeUI } from "../model/promo-code.types";

const STATUS_CONFIG = {
  active: {
    label: "Actif",
    dotColor: "green" as const,
    textColor: "green" as const,
  },
  expired: {
    label: "Expiré",
    dotColor: "red" as const,
    textColor: "red" as const,
  },
};

export const renderPromoCodeCell = (
  promoCode: PromoCodeUI,
  columnKey: string,
): ReactNode => {
  switch (columnKey) {
    case "percentage":
      return <PercentageBadge percentage={promoCode.percentage} />;

    case "status": {
      const config = STATUS_CONFIG[promoCode.status];
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
          {promoCode[columnKey as keyof PromoCodeUI] ?? "—"}
        </span>
      );
  }
};

/**
 * Subscriptions cell renderers
 */

import type { ReactNode } from "react";
import { StatusIndicator } from "@/shared/components/atoms/status-indicator";
import { SubscriptionTypeBadge } from "@/shared/components/atoms/subscription-type-badge";
import { PlanBadge } from "@/shared/components/atoms/plan-badge";
import { SubscriptionsActionsMenu } from "../components";
import type { SubscriptionUI } from "../model/subscription.types";

const STATUS_CONFIG = {
  active: {
    label: "Actif",
    dotColor: "green" as const,
    textColor: "green" as const,
  },
  inactive: {
    label: "Inactif",
    dotColor: "red" as const,
    textColor: "red" as const,
  },
};

export const renderSubscriptionCell = (
  subscription: SubscriptionUI,
  columnKey: string,
): ReactNode => {
  switch (columnKey) {
    case "status": {
      const config = STATUS_CONFIG[subscription.status];
      return (
        <StatusIndicator
          label={config.label}
          dotColor={config.dotColor}
          textColor={config.textColor}
        />
      );
    }

    case "planType":
      return <PlanBadge plan={subscription.planType} />;

    case "subscriptionType":
      return <SubscriptionTypeBadge type={subscription.subscriptionType} />;

    case "actions":
      return <SubscriptionsActionsMenu subscriptionId={subscription.id} />;

    default:
      return (
        <span className="text-sm font-medium text-neutral-800">
          {subscription[columnKey as keyof SubscriptionUI] ?? "—"}
        </span>
      );
  }
};

import { SubscriptionsActionsMenu } from "../components";
import { PlanBadge } from "@/components/atoms/plan-badge";
import { SubscriptionTypeBadge } from "@/components/atoms/subscription-type-badge";
import { StatusIndicator } from "@/components/atoms/status-indicator";
import type { SubscriptionRow } from "../adapters/mapOrdersToSubscriptionsRows";

export const renderSubscriptionCell = (
  subscription: SubscriptionRow,
  columnKey: string,
) => {
  switch (columnKey) {
    case "planType":
      return <PlanBadge plan={subscription.planType} />;

    case "subscriptionType":
      return <SubscriptionTypeBadge type={subscription.subscriptionType} />;

    case "status":
      return (
        <StatusIndicator
          label={subscription.status === "active" ? "Actif" : "Inactif"}
          dotColor={subscription.status === "active" ? "green" : "red"}
          textColor={subscription.status === "active" ? "green" : "red"}
        />
      );

    case "actions":
      return <SubscriptionsActionsMenu subscriptionId={subscription.id} />;

    default:
      return (
        <span className="text-sm font-medium text-neutral-800">
          {subscription[columnKey as keyof SubscriptionRow]}
        </span>
      );
  }
};

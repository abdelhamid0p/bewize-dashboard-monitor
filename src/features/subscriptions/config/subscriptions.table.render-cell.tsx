import { SubscriptionsActionsMenu } from "../components";
import { StatusIndicator } from "@/components/atoms/status-indicator";
import type { SubscriptionRow } from "../types";

export const renderSubscriptionCell = (
  subscription: SubscriptionRow,
  columnKey: string,
) => {
  const computeStatus = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return end >= today ? "active" : "inactive";
  };

  const status = computeStatus(subscription.endDate);

  switch (columnKey) {
    case "status":
      return (
        <StatusIndicator
          label={status === "active" ? "Actif" : "Inactif"}
          dotColor={status === "active" ? "green" : "red"}
          textColor={status === "active" ? "green" : "red"}
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


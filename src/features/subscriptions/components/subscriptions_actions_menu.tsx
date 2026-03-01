import { SubscriptionActionsCell } from "./subscription_actions_cell";

interface SubscriptionsActionsMenuProps {
  subscriptionId: string;
}

export const SubscriptionsActionsMenu = ({
  subscriptionId,
}: SubscriptionsActionsMenuProps) => {
  return (
    <SubscriptionActionsCell
      subscriptionId={subscriptionId}
      onView={(selectedId) => console.log("Voir", selectedId)}
    />
  );
};

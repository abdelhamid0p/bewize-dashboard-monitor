interface SubscriptionTypeBadgeProps {
  type?: string;
}

/**
 * SubscriptionTypeBadge - Reusable atomic component for displaying subscription types
 * Used across Students and Subscriptions features
 */
export const SubscriptionTypeBadge = ({ type }: SubscriptionTypeBadgeProps) => {
  const label = type && type.trim() !== "" ? type : "N/A";

  return <span className="text-sm font-medium text-neutral-800">{label}</span>;
};

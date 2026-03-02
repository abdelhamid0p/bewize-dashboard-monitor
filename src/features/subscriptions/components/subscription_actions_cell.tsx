import { Eye } from "lucide-react";
import { ActionIconButton } from "@/shared/components/atoms/action-icon-button";

interface SubscriptionActionsCellProps {
  subscriptionId: string;
  onView?: (subscriptionId: string) => void;
}

export const SubscriptionActionsCell = ({
  subscriptionId,
  onView,
}: SubscriptionActionsCellProps) => {
  return (
    <ActionIconButton
      icon={<Eye className="size-6 2xl:size-7" />}
      ariaLabel="View subscription"
      className="text-action-eyes rounded-full"
      onClick={() => onView?.(subscriptionId)}
    />
  );
};

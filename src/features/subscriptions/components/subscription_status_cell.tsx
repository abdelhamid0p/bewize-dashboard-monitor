import { Badge } from "@/shared/components/ui/badge";

interface SubscriptionStatusCellProps {
  status: "active" | "inactive";
}

export const SubscriptionStatusCell = ({
  status,
}: SubscriptionStatusCellProps) => {
  return (
    <Badge variant={status === "active" ? "secondary" : "destructive"}>
      {status === "active" ? "Actif" : "Inactif"}
    </Badge>
  );
};

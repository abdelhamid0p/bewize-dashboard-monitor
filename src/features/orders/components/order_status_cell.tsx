import { StatusIndicator } from "@/shared/components/atoms/status-indicator";

interface OrderStatusCellProps {
  status: "paid" | "unpaid" | "free";
}

const STATUS_CONFIG: Record<
  OrderStatusCellProps["status"],
  { label: string; dotColor: "green" | "red" | "blue"; textColor: "green" | "red" | "blue" }
> = {
  paid: { label: "Payé", dotColor: "green", textColor: "green" },
  unpaid: { label: "Non payé", dotColor: "red", textColor: "red" },
  free: { label: "Gratuit", dotColor: "blue", textColor: "blue" },
};

export const OrderStatusCell = ({ status }: OrderStatusCellProps) => {
  const config = STATUS_CONFIG[status];
  return (
    <StatusIndicator
      label={config.label}
      dotColor={config.dotColor}
      textColor={config.textColor}
    />
  );
};

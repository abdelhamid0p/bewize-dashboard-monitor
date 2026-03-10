/**
 * Order cell renderers - custom rendering for specific columns
 */

import type { ReactNode } from "react";
import { StatusIndicator } from "@/shared/components/atoms/status-indicator";
import { PlanBadge } from "@/shared/components/atoms/plan-badge";
import type { OrderUI } from "../model/order.types";

const STATUS_CONFIG: Record<
  OrderUI["status"],
  { label: string; dotColor: "green" | "red" | "blue"; textColor: "green" | "red" | "blue" }
> = {
  paid: { label: "Payé", dotColor: "green", textColor: "green" },
  unpaid: { label: "Non payé", dotColor: "red", textColor: "red" },
  free: { label: "Gratuit", dotColor: "blue", textColor: "blue" },
};

export const renderOrderCell = (
  order: OrderUI,
  columnKey: string,
): ReactNode => {
  switch (columnKey) {
    case "id":
      return (
        <span className="text-sm font-medium text-neutral-800 truncate max-w-[120px] inline-block" title={order.id}>
          {order.id.slice(0, 8)}...
        </span>
      );

    case "status": {
      const config = STATUS_CONFIG[order.status];
      return (
        <StatusIndicator
          label={config.label}
          dotColor={config.dotColor}
          textColor={config.textColor}
        />
      );
    }

    case "plan":
      return <PlanBadge plan={order.plan} />;

    default:
      return (
        <span className="text-sm font-medium text-neutral-800">
          {order[columnKey as keyof OrderUI] ?? "—"}
        </span>
      );
  }
};

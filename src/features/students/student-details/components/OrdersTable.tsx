import React from "react";
import { SectionCard } from "@/shared/components/organisms/section-card";
import { EmptyState } from "@/shared/components/molecules/empty-state";
import { StatusIndicator } from "@/shared/components/atoms/status-indicator";
import type { StudentOrder } from "../model/student-details.types";

const columnHeaders = [
  "Numéro de commande",
  "Type de plan",
  "Montant",
  "Réduction",
  "Date",
  "Statut",
];

interface OrdersTableProps {
  orders: StudentOrder[];
}

/**
 * OrdersTable - Feature component composing shared organisms.
 * No business logic — only column config and cell rendering.
 */
export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <SectionCard title="Dernière commande">
      {/* Table header row */}
      <div className="grid grid-cols-6 bg-neutral-50 border-b border-primary-100">
        {columnHeaders.map((header) => (
          <div
            key={header}
            className="text-center text-neutral-600 font-medium px-2 py-2 sm:py-2.5 md:py-3 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm"
          >
            {header}
          </div>
        ))}
      </div>

      {orders.length === 0 ? (
        <EmptyState
          title="Aucune commande trouvée"
          description="Ajoutez un nouvel abonnement pour commencer"
        />
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-6 border-b border-neutral-100 last:border-0"
          >
            <div className="text-center px-2 py-2 sm:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-neutral-800">
              {order.code}
            </div>
            <div className="text-center px-2 py-2 sm:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-neutral-800">
              {order.planType}
            </div>
            <div className="text-center px-2 py-2 sm:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-neutral-800">
              {order.amount} MAD
            </div>
            <div className="text-center px-2 py-2 sm:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-neutral-800">
              —
            </div>
            <div className="text-center px-2 py-2 sm:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-neutral-800">
              {order.date}
            </div>
            <div className="flex items-center justify-center px-2 py-2 sm:py-2.5">
              <StatusIndicator
                label={order.status}
                dotColor={order.status === "Actif" ? "green" : "red"}
              />
            </div>
          </div>
        ))
      )}
    </SectionCard>
  );
};

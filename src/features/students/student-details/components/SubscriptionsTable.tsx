import React from "react";
import { SectionCard } from "@/shared/components/organisms/section-card";
import { EmptyState } from "@/shared/components/molecules/empty-state";
import type { StudentOrder } from "../model/student-details.types";
import { mapOrdersToSubscriptions } from "../model/student-details.mapper";

const columnHeaders = [
  "ID",
  "Date de début",
  "Date de fin",
  "ID de commande",
  "Type de plan",
  "Statut",
];

interface SubscriptionsTableProps {
  orders: StudentOrder[];
}

/**
 * SubscriptionsTable - Feature component composing shared organisms.
 * Delegates data transformation to mapper (SRP).
 * No inline business logic — only column config and rendering.
 */
export const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({
  orders,
}) => {
  const subscriptions = mapOrdersToSubscriptions(orders);

  return (
    <SectionCard title="Abonnements">
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

      {subscriptions.length === 0 ? (
        <EmptyState
          title="Aucun abonnement trouvé"
          description="Ajoutez un nouvel abonnement pour commencer"
        />
      ) : (
        subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="grid grid-cols-6 border-b border-neutral-100 last:border-0"
          >
            <div className="text-center px-2 py-2 sm:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-neutral-800">
              {sub.id}
            </div>
            <div className="text-center px-2 py-2 sm:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-neutral-800">
              {sub.startDate}
            </div>
            <div className="text-center px-2 py-2 sm:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-neutral-800">
              {sub.endDate}
            </div>
            <div className="text-center px-2 py-2 sm:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-neutral-800">
              {sub.orderId}
            </div>
            <div className="text-center px-2 py-2 sm:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-neutral-800">
              {sub.planType}
            </div>
            <div className="text-center px-2 py-2 sm:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-neutral-800">
              —
            </div>
          </div>
        ))
      )}
    </SectionCard>
  );
};

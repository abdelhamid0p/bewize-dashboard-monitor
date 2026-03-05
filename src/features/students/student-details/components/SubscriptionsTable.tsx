import React from "react";
import type { StudentOrder } from "../model/student-details.types";

interface SubscriptionsTableProps {
  orders: StudentOrder[];
}

export const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({
  orders,
}) => {
  // Extract subscriptions from orders
  const subscriptions = orders
    .map(
      (order) =>
        order.subscription && {
          ...order.subscription,
          orderId: order.id,
          planType: order.planType,
        },
    )
    .filter(Boolean);

  return (
    <div className="bg-white rounded-xl p-4 mt-4 border border-neutral-200">
      <div className="font-semibold text-lg mb-2">Abonnements</div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-neutral-500 border-b">
            <th className="py-2">ID</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>ID de commande</th>
            <th>Type de plan</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-neutral-400 py-4">
                Aucun abonnement trouvé
                <br />
                Ajoutez un nouvel abonnement pour commencer
              </td>
            </tr>
          ) : (
            subscriptions.map((sub: any) => (
              <tr key={sub.id} className="border-b last:border-0">
                <td className="py-2">{sub.id}</td>
                <td>{sub.startDate}</td>
                <td>{sub.endDate}</td>
                <td>{sub.orderId}</td>
                <td>{sub.planType}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

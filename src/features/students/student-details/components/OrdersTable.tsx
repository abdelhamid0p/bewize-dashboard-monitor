import React from "react";
import { StudentOrder } from "../model/student-details.types";

interface OrdersTableProps {
  orders: StudentOrder[];
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <div className="bg-white rounded-xl p-4 mt-4 border border-neutral-200">
      <div className="font-semibold text-lg mb-2">Dernière commande</div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-neutral-500 border-b">
            <th className="py-2">Numéro de commande</th>
            <th>Type de plan</th>
            <th>Montant</th>
            <th>Réduction</th>
            <th>Date</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-neutral-400 py-4">
                Aucune commande trouvée
                <br />
                Ajoutez un nouvel abonnement pour commencer
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="border-b last:border-0">
                <td className="py-2">{order.code}</td>
                <td>{order.planType}</td>
                <td>{order.amount} MAD</td>
                <td>-</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

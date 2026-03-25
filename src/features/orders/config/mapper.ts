/**
 * Order mapper - transforms backend data to UI format
 */

import type { OrderBackend, OrderUI } from "../model/order.types";
import { STATUS_LABELS, PLAN_LABELS, TYPE_LABELS } from "./enums";

export const mapOrderToUI = (backend: OrderBackend): OrderUI => {
  const tableRow = backend as unknown as Partial<OrderUI> & { status?: string; date?: string };
  if (tableRow.student !== undefined || tableRow.paymentMethod !== undefined) {
    const statusRaw = (tableRow.status ?? "").toLowerCase();
    const normalizedStatus: OrderUI["status"] =
      statusRaw === "paid" ? "paid" : statusRaw === "unpaid" ? "unpaid" : "free";

    return {
      id: tableRow.id ?? "",
      student: tableRow.student ?? "—",
      plan: tableRow.plan ?? "—",
      type: tableRow.type ?? "—",
      paymentMethod: tableRow.paymentMethod ?? "—",
      status: normalizedStatus,
      date: tableRow.date ? new Date(tableRow.date).toLocaleDateString("fr-FR") : "—",
    };
  }

  const studentName = [backend.student.firstName, backend.student.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const statusKey = backend.status?.toUpperCase() ?? "";
  const status: OrderUI["status"] =
    statusKey === "PAID" ? "paid" : statusKey === "UNPAID" ? "unpaid" : "free";

  return {
    id: backend.id,
    student: studentName || "—",
    plan: PLAN_LABELS[backend.planType] ?? backend.planType ?? "—",
    type: backend.amount === 0 ? "Gratuit" : "Payant",
    paymentMethod: backend.type ? (TYPE_LABELS[backend.type] ?? backend.type) : "—",
    status,
    date: backend.date
      ? new Date(backend.date).toLocaleDateString("fr-FR")
      : "—",
  };
};

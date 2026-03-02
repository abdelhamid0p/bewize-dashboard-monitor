import type { SubscriptionBackendResponse } from "../model";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8083";

/**
 * Fetch subscriptions from Orders endpoint
 * Uses GET /orders which contains complete subscription data
 * (order info + student + subscription + discount)
 */
export async function fetchSubscriptions(
  page: number = 0,
  size: number = 20,
): Promise<SubscriptionBackendResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/orders?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

import type {
  OrdersQueryParams,
  OrdersRepository,
  Paginated,
} from "../domain/repositories/orders_repository";
import type { Order } from "../domain/entities/order";
import { getStoredToken } from "@/shared/storage/authStorage";

function getBaseUrl(): string {
  const base = import.meta.env.VITE_API_BASE_URL;
  if (base && typeof base === "string" && base.trim()) {
    const trimmed = base.trim();
    return trimmed.startsWith("http")
      ? trimmed.replace(/\/$/, "")
      : `${window.location.origin}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`.replace(/\/$/, "");
  }
  return "/api/v1";
}

const appendParam = (
  params: URLSearchParams,
  key: string,
  value: string | number | undefined,
) => {
  if (value !== undefined && value !== "") {
    params.append(key, String(value));
  }
};

export class HttpOrdersRepository implements OrdersRepository {
  async getOrders(params: OrdersQueryParams = {}): Promise<Paginated<Order>> {
    const query = new URLSearchParams();

    appendParam(query, "page", params.page ?? 0);
    appendParam(query, "size", params.size ?? 10);
    appendParam(query, "search", params.search);
    appendParam(query, "sort", params.sort);
    appendParam(query, "type", params.type);
    appendParam(query, "planType", params.planType);
    appendParam(query, "status", params.status);
    appendParam(query, "code", params.code);
    appendParam(query, "date", params.date);
    appendParam(query, "gender", params.gender);
    appendParam(query, "deviceType", params.deviceType);
    appendParam(query, "level", params.level);
    appendParam(query, "percentage", params.percentage);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const token = getStoredToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/orders?${query.toString()}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

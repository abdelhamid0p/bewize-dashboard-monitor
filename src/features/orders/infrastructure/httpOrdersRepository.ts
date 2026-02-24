import type {
  OrdersQueryParams,
  OrdersRepository,
  Paginated,
} from "../domain/repositories/orders_repository";
import type { Order } from "../domain/entities/order";
import { baseQuery } from "@/shared/services/baseApi";

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

    const result = await baseQuery(
      `/orders?${query.toString()}`,
      { type: "query" } as any,
      {}
    );

    if (result.error) {
      throw new Error(
        `Erreur API: ${result.error.status} ${JSON.stringify(result.error.data)}`
      );
    }

    return result.data as Paginated<Order>;
  }
}

import type { OrdersQueryParams } from "../domain/repositories/orders_repository";

export const DEFAULT_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 10;

export const normalizeOrdersParams = (
  params: OrdersQueryParams = {},
): OrdersQueryParams => {
  const result: OrdersQueryParams = {
    page: params.page ?? DEFAULT_PAGE,
    size: params.size ?? DEFAULT_PAGE_SIZE,
  };

  // Only include optional params if they're defined and not empty
  if (params.search) result.search = params.search;
  if (params.sort) result.sort = params.sort;
  if (params.type !== undefined && params.type !== "") result.type = params.type;
  if (params.planType !== undefined && params.planType !== "")
    result.planType = params.planType;
  if (params.status !== undefined && params.status !== "")
    result.status = params.status;
  if (params.code) result.code = params.code;
  if (params.date) result.date = params.date;
  if (params.gender !== undefined && params.gender !== "")
    result.gender = params.gender;
  if (params.deviceType !== undefined && params.deviceType !== "")
    result.deviceType = params.deviceType;
  if (params.level !== undefined && params.level !== "")
    result.level = params.level;
  if (params.percentage !== undefined && params.percentage !== "")
    result.percentage = params.percentage;

  return result;
};

export const buildOrdersCacheKey = (params: OrdersQueryParams = {}) => {
  const normalized = normalizeOrdersParams(params);
  const entries = Object.entries(normalized);

  entries.sort(([left], [right]) => left.localeCompare(right));

  return entries.map(([key, value]) => `${key}=${String(value)}`).join("&");
};

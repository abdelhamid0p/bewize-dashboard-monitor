import { useForm } from "react-hook-form";
import type { CreateDiscountRequest } from "../model/discount.types";
import { toLocalDateTime } from "../model/date.utils";

/**
 * Hook encapsulating create-discount form state and validation.
 * Follows SRP: separates form logic from UI and API concerns.
 */
export const useCreateDiscountForm = () => {
  const form = useForm<CreateDiscountRequest>();

  const transformPayload = (
    data: CreateDiscountRequest,
  ): CreateDiscountRequest => ({
    ...data,
    startDate: toLocalDateTime(data.startDate),
    endDate: toLocalDateTime(data.endDate),
  });

  const resetForm = () => form.reset();

  return {
    form,
    transformPayload,
    resetForm,
  };
};

import { useForm } from "react-hook-form";
import type { CreateManualSubscriptionRequest } from "../model/subscription.types";
import { toLocalDateTime } from "../model/date.utils";

/**
 * Hook encapsulating create-subscription form state and validation.
 */
export const useCreateSubscriptionForm = () => {
  const form = useForm<CreateManualSubscriptionRequest>({
    defaultValues: {
      studentId: "",
      planType: "MONTH",
      startDate: "",
    },
  });

  const transformPayload = (
    data: CreateManualSubscriptionRequest,
  ): CreateManualSubscriptionRequest => ({
    ...data,
    startDate: toLocalDateTime(data.startDate),
  });

  const resetForm = () => form.reset();

  return {
    form,
    transformPayload,
    resetForm,
  };
};

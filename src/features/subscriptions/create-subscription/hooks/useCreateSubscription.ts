import { useMemo } from "react";
import { useCreateManualSubscriptionMutation } from "../api/createSubscriptionApi";

const toErrorMessage = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "data" in error) {
    const payload = (error as { data?: unknown }).data;

    if (typeof payload === "string") {
      return payload;
    }

    if (typeof payload === "object" && payload !== null && "message" in payload) {
      const message = (payload as { message?: unknown }).message;
      if (typeof message === "string" && message.trim().length > 0) {
        return message;
      }
    }
  }

  return "Impossible de creer l'abonnement pour le moment.";
};

export const useCreateSubscription = () => {
  const [createSubscription, result] = useCreateManualSubscriptionMutation();

  const errorMessage = useMemo(() => {
    if (!result.isError) {
      return null;
    }
    return toErrorMessage(result.error);
  }, [result.error, result.isError]);

  return {
    createSubscription,
    isLoading: result.isLoading,
    isSuccess: result.isSuccess,
    isError: result.isError,
    error: result.error,
    errorMessage,
    data: result.data,
  };
};

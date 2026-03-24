import { baseApi } from "@/shared/services/baseApi";
import type {
  CreateManualSubscriptionRequest,
  ManualSubscriptionResponse,
} from "../model/subscription.types";

export const createSubscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createManualSubscription: builder.mutation<
      ManualSubscriptionResponse,
      CreateManualSubscriptionRequest
    >({
      query: (body) => ({
        url: "/subscriptions/manual",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const { useCreateManualSubscriptionMutation } = createSubscriptionApi;

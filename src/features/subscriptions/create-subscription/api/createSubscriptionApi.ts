import { baseApi } from "@/shared/services/baseApi";
import type {
  CreateManualSubscriptionRequest,
  ManualSubscriptionResponse,
} from "../model/subscription.types";

export interface ManualSubscriptionStudentOption {
  id: string;
  name: string;
}

export const createSubscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getManualSubscriptionStudents: builder.query<
      ManualSubscriptionStudentOption[],
      void
    >({
      query: () => "/subscriptions/manual/students",
      providesTags: ["Student"],
    }),

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

export const {
  useGetManualSubscriptionStudentsQuery,
  useCreateManualSubscriptionMutation,
} = createSubscriptionApi;

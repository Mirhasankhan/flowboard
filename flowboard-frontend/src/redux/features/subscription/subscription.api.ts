import { baseApi } from "../../api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkoutSession: builder.mutation({
      query: (priceId) => ({
        url: `/subscription-plan/checkout-session`,
        method: "POST",
        body: priceId,
      }),
      invalidatesTags: ["subscription"],
    }),
    plans: builder.query({
      query: () => ({
        url: `/subscription-plan`,
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
  }),
});

export const { usePlansQuery, useCheckoutSessionMutation } = subscriptionApi;

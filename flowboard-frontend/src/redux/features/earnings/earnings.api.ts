import { baseApi } from "../../api/baseApi";

const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    withdrawRequest: builder.mutation({
      query: (data) => ({
        url: `/earning/withdraw-request`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["earnings"],
    }),
    earningsSummary: builder.query({
      query: (type) => ({
        url: `/earning/summary?type=${type}`,
        method: "GET",
      }),
      providesTags: ["earnings"],
    }),
    withdrawHistory: builder.query({
      query: () => ({
        url: `/earning/withdraw-history`,
        method: "GET",
      }),
      providesTags: ["earnings"],
    }),
  }),
});

export const {
  useEarningsSummaryQuery,
  useWithdrawHistoryQuery,
  useWithdrawRequestMutation,
} = earningsApi;

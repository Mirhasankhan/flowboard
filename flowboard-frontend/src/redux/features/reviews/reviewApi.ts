import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allReviews: builder.query({
      query: () => ({
        url: `/campsite/allCampsites`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllReviewsQuery } = reviewApi;

import { baseApi } from "../../api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: `/booking/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    userBookings: builder.query({
      query: () => ({
        url: `/booking/user-wise`,
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
    lawyerBookings: builder.query({
      query: () => ({
        url: `/booking/lawyer-wise`,
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
    markCompleted: builder.mutation({
      query: (id) => ({
        url: `/booking/mark-completed/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["bookings"],
    }),
    cancelBooking: builder.mutation({
      query: (data) => ({
        url: `/booking/cancel`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `/review/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    createReport: builder.mutation({
      query: (data) => ({
        url: `/review/create-report`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const {
  useLawyerBookingsQuery,
  useCreateBookingMutation,
  useMarkCompletedMutation,
  useCancelBookingMutation,
  useCreateReviewMutation,
  useUserBookingsQuery,
  useCreateReportMutation
} = bookingsApi;

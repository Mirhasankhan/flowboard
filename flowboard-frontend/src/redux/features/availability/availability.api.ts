import { baseApi } from "../../api/baseApi";

const availabilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setAvailability: builder.mutation({
      query: (data) => ({
        url: "/availability/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["availability"],
    }),
    deleteSlot: builder.mutation({
      query: (id) => ({
        url: `/availability/slot/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["availability"],
    }),
    createSlot: builder.mutation({
      query: (data) => ({
        url: `/availability/create-slot`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["availability"],
    }),
    updateSlot: builder.mutation({
      query: (data) => ({
        url: `/availability/update-slot`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["availability"],
    }),

    availabilitySlots: builder.query({
      query: () => ({
        url: "/availability/all-slots",
        method: "GET",
      }),
      providesTags: ["availability"],
    }),
    dayWiseSlots: builder.query({
      query: ({day,lawyerId}) => ({
        url: `/availability/expert-slots?day=${day}&lawyerId=${lawyerId}`,
        method: "GET",
      }),
      providesTags: ["availability"],
    }),
  }),
});

export const {
  useSetAvailabilityMutation,
  useAvailabilitySlotsQuery,
  useDayWiseSlotsQuery,
  useCreateSlotMutation,
  useDeleteSlotMutation,
  useUpdateSlotMutation
} = availabilityApi;

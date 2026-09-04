import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    services: builder.query({
      query: () => ({
        url: `/legal-service`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
    service: builder.query({
      query: (id) => ({
        url: `/legal-service/${id}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
  }),
});

export const { useServicesQuery , useServiceQuery} = serviceApi;

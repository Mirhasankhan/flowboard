import { baseApi } from "../../api/baseApi";

const boardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewBoard: builder.mutation({
      query: (payload) => ({
        url: "/board/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["boards"],
    }),
    userAllBoards: builder.query({
      query: () => ({
        url: "/board/user-wise",
        method: "GET",
      }),
      providesTags: ["boards"],
    }),
    boardDetails: builder.query({
      query: (id) => ({
        url: `/board/details/${id}`,
        method: "GET",
      }),
      providesTags: ["boards"],
    }),


  }),
});

export const { useCreateNewBoardMutation, useUserAllBoardsQuery, useBoardDetailsQuery } = boardApi;

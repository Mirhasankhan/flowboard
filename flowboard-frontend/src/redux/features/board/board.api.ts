import { baseApi } from "../../api/baseApi";

const boardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewBoard: builder.mutation({
      query: (userInfo) => ({
        url: "/user/request",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["boards"],
    }),
  }),
});

export const { useCreateNewBoardMutation } = boardApi;

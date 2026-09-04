import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: `/post/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: `/post/comment/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
    createReply: builder.mutation({
      query: (data) => ({
        url: `/post/reply/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
   
    posts: builder.query({
      query: ({serviceId,serviceType, level}) => ({
        url: `/post?serviceId=${serviceId}&serviceType=${serviceType}&level=${level}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    toggleLikePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["post"],
    }),
    post: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useCreateCommentMutation,
  useCreateReplyMutation,
  useToggleLikePostMutation,
  usePostsQuery,
  usePostQuery,
} = postApi;

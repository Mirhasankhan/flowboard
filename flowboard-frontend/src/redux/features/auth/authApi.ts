import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerRequest: builder.mutation({
      query: (userInfo) => ({
        url: "/user/request",
        method: "POST",
        body: userInfo,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/user/verify",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/user/resend-otp",
        method: "POST",
        body: email,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),
    socialLogin: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/social-login",
        method: "POST",
        body: userInfo,
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["users", "availability"],
    }),
    sendOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: { email, otp },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: data.token,
        },
      }),
    }),
    changePassword: builder.mutation({
      query: (newPassword) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: newPassword,
      }),
    }),
    updateImage: builder.mutation({
      query: (image) => ({
        url: "/users/update/profileImage",
        method: "PUT",
        body: image,
      }),
      invalidatesTags: ["users"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    updateIntroVideo: builder.mutation({
      query: (file) => ({
        url: "/auth/upload/intro-video",
        method: "PUT",
        body: file,
      }),
      invalidatesTags: ["users"],
    }),
    updateprofileImage: builder.mutation({
      query: (file) => ({
        url: "/auth/upload/profileImage",
        method: "PUT",
        body: file,
      }),
      invalidatesTags: ["users"],
    }),
    allLawyers: builder.query({
      query: ({ experience, type, specializationId }) => ({
        url: `/user/all?experience=${experience}&type=${type}&specializationId=${specializationId}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    lawyerDetails: builder.query({
      query: (id) => ({
        url: `/user/details/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    allUsers: builder.query({
      query: ({ searchQuery, selectedRole, page, limit }) => ({
        url: `/analysis/all-users?search=${searchQuery}&role=${selectedRole}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    
  }),
});

export const {
  useSendOtpMutation,
  useRegisterRequestMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useProfileQuery,
  useUpdateImageMutation,
  useUpdateprofileImageMutation,
  useLawyerDetailsQuery,
  useUpdateIntroVideoMutation,
  useAllLawyersQuery,
  useLoginMutation,
  useAllUsersQuery,
  useUpdateProfileMutation,
  useSocialLoginMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;

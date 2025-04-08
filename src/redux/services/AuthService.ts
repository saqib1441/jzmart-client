import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API
const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (body) => ({
        url: "/send-otp",
        method: "POST",
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks
export const {
  useSendOtpMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
} = AuthApi;

export default AuthApi;

import { ProfileResponse, UserDetailsType } from "@/app/myprofilepreview/page";
import { baseApi } from "./baseapi";

export const authSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get profileDetails
    profileDetails: builder.query<ProfileResponse,void>({
      query: () => `currentuser/details`,
      providesTags: ["User"],
    }),
  }),
});


export const {useProfileDetailsQuery}=authSlice
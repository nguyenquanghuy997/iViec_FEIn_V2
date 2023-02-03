import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_USER_INFO,
} from "@/routes/api";


const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["CompanyInfor"],
});

export const companyInforSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    // Thông tin công ty
    // getBranchByUser: builder.query({
    //   query: () => ({
    //     url: API_USER_INFO,
    //     method: "GET",
    //   }),
    //   providesTags: ["branch_by_user"],
    // }),
    getBranchByUser: builder.query({
      query: () => ({
        url: `${API_USER_INFO}`,
        method: "GET",
      }),
    }),
   
  }),
});

export const {
  // Thông tin công ty
  useGetBranchByUserQuery,
} = companyInforSlice;

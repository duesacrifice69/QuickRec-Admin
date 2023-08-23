import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Vacancy", "AppBasicDetails", "Master"],
  endpoints: (builder) => ({
    getVacancyBySearch: builder.query({
      query: (searchQuery) => `/vacancy/search/?searchQuery=${searchQuery}`,
      providesTags: ["Vacancy"],
    }),
    getSalaryGroups: builder.query({
      query: () => `/master/salaryGroups`,
      providesTags: ["Master"],
    }),
    getBoardGrades: builder.query({
      query: () => `/master/boardGrades`,
      providesTags: ["Master"],
    }),
    getAppBasicDetails: builder.query({
      query: ({ userId }) => ({
        url: `/application/basicDetails/?userId=${userId}`,
      }),
      providesTags: ["AppBasicDetails"],
    }),
    createAppBasicDetails: builder.mutation({
      query: (createReq) => ({
        url: `/application/addBasicDetails`,
        method: "POST",
        body: createReq,
      }),
      invalidatesTags: ["AppBasicDetails"],
    }),
  }),
});

export const {
  useGetVacancyBySearchQuery,
  useGetBoardGradesQuery,
  useGetSalaryGroupsQuery,
  useCreateAppBasicDetailsMutation,
  useGetAppBasicDetailsQuery,
} = api;

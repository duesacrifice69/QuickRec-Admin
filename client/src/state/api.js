import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Vacancy", "Application", "AppBasicDetails", "Master"],
  endpoints: (builder) => ({
    getApplicationsByVacancy: builder.query({
      query: (vacancyId) =>
        `/application/allApplications?vacancyId=${vacancyId ?? ""}`,
      providesTags: ["Application"],
    }),
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
      query: (applicationId) => ({
        url: `/application/basicDetails/?applicationId=${applicationId}`,
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
  useGetApplicationsByVacancyQuery,
  useGetVacancyBySearchQuery,
  useGetBoardGradesQuery,
  useGetSalaryGroupsQuery,
  useCreateAppBasicDetailsMutation,
  useGetAppBasicDetailsQuery,
} = api;

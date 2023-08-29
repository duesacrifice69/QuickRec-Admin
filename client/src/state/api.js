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
    getMasterData: builder.query({
      query: () => `/common/masterData`,
      providesTags: ["Master"],
    }),
    getAppBasicDetails: builder.query({
      query: (applicationId) => ({
        url: `/application/basicDetails/?applicationId=${applicationId}`,
      }),
      providesTags: ["AppBasicDetails"],
    }),
  }),
});

export const {
  useGetApplicationsByVacancyQuery,
  useGetVacancyBySearchQuery,
  useGetMasterDataQuery,
  useGetAppBasicDetailsQuery,
} = api;

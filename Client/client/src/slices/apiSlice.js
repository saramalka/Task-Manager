import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice=createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:2200"
    }),
    endpoints:()=>({})

})
export default apiSlice
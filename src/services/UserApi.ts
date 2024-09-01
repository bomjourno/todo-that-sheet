import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IUser } from "shared/dto/user";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (build) => ({
    getUser: build.query<IUser[], number>({
      query: (limit: number = 1) => ({
        url: `/users`,
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export default userApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IUserGetDto } from "shared/dto/user";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    getUser: build.query<IUserGetDto[], number>({
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

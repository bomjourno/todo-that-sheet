import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IUserGetDto } from "shared/dto/user";

const hostName = process.env.REACT_APP_HOST_NAME || "http://localhost:8080";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: hostName,
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

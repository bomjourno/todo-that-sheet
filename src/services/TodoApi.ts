import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IResponseGetDto, ITodoGetDto } from "shared/dto/todo";

const hostName = process.env.REACT_APP_HOST_NAME || "http://localhost:8080";

const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${hostName}/tasks` }),
  endpoints: (build) => ({
    getMonthPosts: build.query<IResponseGetDto<ITodoGetDto>[], string>({
      query: (date: string = "2024-09-16T12:58:54.658860") => ({
        url: `/month/${date}`,
        headers: {
          Authorization: "Bearer bd078789-a192-49e6-93a9-f0e5bf1398c4",
        },
      }),
    }),
  }),
});

export default todoApi;

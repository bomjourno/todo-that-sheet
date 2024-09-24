import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IResponseDto } from "shared/dto/common";
import { ITodoGetDto } from "shared/dto/todo";

const hostName = process.env.REACT_APP_HOST_NAME || "http://localhost:8080";

const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${hostName}` }),
  endpoints: (build) => ({
    getMonthPosts: build.query<IResponseDto<ITodoGetDto[]>, string>({
      query: (date: string) => ({
        url: `/tasks`,
        // url: `/month/${date}`,
        headers: {
          Authorization: "Bearer bd078789-a192-49e6-93a9-f0e5bf1398c4",
        },
      }),
    }),
  }),
});

export default todoApi;

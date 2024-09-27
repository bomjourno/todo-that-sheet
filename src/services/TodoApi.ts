import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dayjs from "dayjs";

import { IResponseDto } from "shared/dto/common";
import { ITodoGetDto, ITodoPatchDto, ITodoPostDto } from "shared/dto/todo";

const hostName = process.env.REACT_APP_HOST_NAME || "http://localhost:8080";

const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${hostName}/tasks` }),
  tagTypes: ["Todos"],
  endpoints: (build) => ({
    getMonthTodos: build.query<IResponseDto<ITodoGetDto[]>, string | null>({
      query: (d: string | null) => {
        const date = d ? d : dayjs().format("YYYY-MM-DD");

        return {
          url: `/month/${date}`,
          headers: {
            Authorization: "Bearer bd078789-a192-49e6-93a9-f0e5bf1398c4",
          },
        };
      },
      providesTags: () => ["Todos"],
    }),

    getDayTodos: build.query<IResponseDto<ITodoGetDto[]>, string | null>({
      query: (d: string | null) => {
        const date = d ? d : dayjs().format("YYYY-MM-DD");

        return {
          url: `/day/${date}`,
          headers: {
            Authorization: "Bearer bd078789-a192-49e6-93a9-f0e5bf1398c4",
          },
        };
      },
    }),

    createTodo: build.mutation<ITodoGetDto, ITodoPostDto>({
      query: (body: ITodoPostDto) => ({
        url: "",
        method: "POST",
        headers: {
          Authorization: "Bearer bd078789-a192-49e6-93a9-f0e5bf1398c4",
        },
        body,
      }),
      invalidatesTags: ["Todos"],
    }),

    updateTodo: build.mutation<void, ITodoPatchDto>({
      query: (body: ITodoPatchDto) => ({
        url: "",
        method: "PATCH",
        headers: {
          Authorization: "Bearer bd078789-a192-49e6-93a9-f0e5bf1398c4",
        },
        body,
      }),
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: build.mutation<void, string>({
      query: (id: string) => ({
        url: "",
        method: "DELETE",
        headers: {
          Authorization: "Bearer bd078789-a192-49e6-93a9-f0e5bf1398c4",
        },
        body: {
          id,
        },
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export default todoApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBoard } from '../../components/BoardCard/Board.types';
import { baseUrl } from '../../utils/constants/constants';
import { RootState } from '../store';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzJjMGNkMjU1YjVlNmJlZGEzM2FkOCIsImxvZ2luIjoiYW1pbmtrYSIsImlhdCI6MTY2ODY5NjIzMCwiZXhwIjoxNjY4NzM5NDMwfQ.kkK4aPf-zw_1uSLDQC0pVMS0HPJCZzQDAp-f2kChdxU';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  tagTypes: ['Boards'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).auth.token?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    getBoards: build.query<IBoard[], void>({
      query: () => ({
        url: 'boards',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Boards' as const, _id })),
              { type: 'Boards', id: 'LIST' },
            ]
          : [{ type: 'Boards', id: 'LIST' }],
    }),

    createBoard: build.mutation<IBoard, IBoard>({
      query: (body) => ({
        url: 'boards',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),

    updateBoard: build.mutation<IBoard, { boardId: string; body: IBoard }>({
      query: ({ boardId, body }) => ({
        url: `boards/${boardId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),

    deleteBoard: build.mutation<IBoard, string>({
      query: (boardId) => ({
        url: `boards/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardsApi;

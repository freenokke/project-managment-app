import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBoardResponse, IBoardData } from '../../components/BoardCard/Board.types';
import { ModalChild, ModalData } from '../../components/Modal/Modal.types';
import { baseUrl } from '../../utils/constants/constants';
import { RootState } from '../store';

const boardsApi = createApi({
  reducerPath: 'boardsApi',
  tagTypes: ['Boards', 'Tasks'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    getBoards: build.query<IBoardResponse[], string>({
      query: (userId) => ({
        url: `boardsSet/${userId}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Boards' as const, _id })),
              { type: 'Boards', id: 'LIST' },
            ]
          : [{ type: 'Boards', id: 'LIST' }],
    }),

    createBoard: build.mutation<IBoardResponse, IBoardData>({
      query: (body) => ({
        url: 'boards',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),

    editBoard: build.mutation<IBoardResponse, { data: ModalData; body: IBoardData }>({
      query: ({ data, body }) => ({
        url: `boards/${data.boardId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),

    deleteBoard: build.mutation<IBoardResponse, ModalData>({
      query: (data) => ({
        url: `boards/${data.boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useEditBoardMutation,
  useDeleteBoardMutation,
} = boardsApi;

const { reducer } = boardsApi;
export const boardsMiddleware = boardsApi.middleware;
export default reducer;

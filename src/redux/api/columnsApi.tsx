import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IColumnsResponse, IColumnData } from '../../pages/BoardPage/BoardPage.types';
import { baseUrl } from '../../utils/constants/constants';
import { RootState } from '../store';

export const columnsApi = createApi({
  reducerPath: 'columnsApi',
  tagTypes: ['Columns'],
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
    getColumns: build.query<IColumnsResponse[], string>({
      query: (userId) => ({
        url: `boards/${userId}/columns`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Columns' as const, _id })),
              { type: 'Columns', id: 'LIST' },
            ]
          : [{ type: 'Columns', id: 'LIST' }],
    }),
    createColumn: build.mutation<IColumnsResponse, { boardId: string; body: IColumnData }>({
      query: ({ boardId, body }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
  }),
});

export const { useGetColumnsQuery, useCreateColumnMutation } = columnsApi;

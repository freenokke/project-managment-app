import { ModalData } from '../../components/Modal/Modal.types';
import { setError } from '../features/errorSlice';
import { boardsApi } from './boardsApi';

export interface ITaskData {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export interface INewTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export interface ITaskCreate extends Pick<ITaskData, 'boardId' | 'columnId'> {
  body: INewTask;
}
export interface ITaskUpdate extends Pick<ITaskData, 'boardId' | 'columnId' | '_id'> {
  body: INewTask;
}

export const sortCards = (a: ITaskData, b: ITaskData) => {
  return a.order - b.order;
};

export const reorder = (item: ITaskData, index: number) => {
  const task = { ...item };
  task.order = index + 1;
  return task;
};

export const tasksApi = boardsApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<ITaskData[], Pick<ITaskData, 'boardId' | 'columnId'>>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}/tasks`,
      transformResponse: (response: ITaskData[]) => {
        return response.sort(sortCards).map(reorder);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Tasks' as const, _id })),
              { type: 'Tasks', id: arg.columnId },
            ]
          : ['Tasks'],
    }),
    getTasksById: builder.query<ITaskData, Pick<ITaskData, 'boardId' | 'columnId' | '_id'>>({
      query: ({ boardId, columnId, _id }) => `/boards/${boardId}/columns/${columnId}/tasks/${_id}`,
    }),
    getTasksByBoardId: builder.query<ITaskData[], Pick<ITaskData, 'boardId'>>({
      query: ({ boardId }) => `/tasksSet/${boardId}`,
    }),
    createTask: builder.mutation<ITaskData, ITaskCreate>({
      query: ({ boardId, columnId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body,
      }),
      async onQueryStarted({ columnId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(tasksApi.util.invalidateTags([{ type: 'Tasks', id: columnId }]));
        } catch (error) {
          dispatch(setError({ error: true, type: 'task' }));
        }
      },
    }),
    deleteTask: builder.mutation<ITaskData, ModalData>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ columnId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(tasksApi.util.invalidateTags([{ type: 'Tasks', id: columnId }]));
        } catch (error) {
          dispatch(setError({ error: true, type: 'task' }));
        }
      },
    }),
    editTask: builder.mutation<ITaskData, ITaskUpdate>({
      query: ({ boardId, columnId, _id, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${_id}`,
        method: 'PUT',
        body,
      }),
      async onQueryStarted({ columnId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(tasksApi.util.invalidateTags([{ type: 'Tasks', id: columnId }]));
        } catch (error) {
          dispatch(setError({ error: true, type: 'task' }));
        }
      },
    }),
    updateSetOfTasks: builder.mutation<
      ITaskData[],
      Pick<ITaskData, '_id' | 'order' | 'columnId'>[]
    >({
      query: (body) => ({
        url: `/tasksSet`,
        method: 'PATCH',
        body,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(setError({ error: true, type: 'task' }));
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTasksByIdQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useUpdateSetOfTasksMutation,
  useGetTasksByBoardIdQuery,
} = tasksApi;

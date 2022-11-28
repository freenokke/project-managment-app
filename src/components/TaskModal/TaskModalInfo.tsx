import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hooks';
import { parseJwt } from '../../utils/utils';
import { showModal, ModalTypes } from '../../redux/features/modalSlice';
import { Button } from '@material-tailwind/react';
import { useGetBoardsQuery } from '../../redux/api/boardsApi';
import { useGetColumnsQuery } from '../../redux/api/columnsApi';

const TaskModalInfo = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { login } = parseJwt(token ?? '');
  const { taskData } = useAppSelector((state) => state.taskModal);
  const { data: boardsSet } = useGetBoardsQuery(taskData?.userId ?? '');
  const { data: columnsSet } = useGetColumnsQuery(taskData?.boardId ?? '');
  const board = boardsSet?.find(({ _id }) => _id === taskData?.boardId);
  const column = columnsSet?.find(({ _id }) => _id === taskData?.columnId);

  const deleteModal = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.deleteTask, data: { taskId: taskData?._id } }));
  }, [dispatch, taskData?._id]);

  return (
    <>
      <div className="column flex-grow gap-[20px]">
        <div className="flex w-full">
          <div className="w-[50%]">{t('taskModalInfo.board')}</div>
          <div className="w-[50%] font-bold">{board?.title}</div>
        </div>
        <div className="flex w-full">
          <div className="w-[50%]">{t('taskModalInfo.column')}</div>
          <div className="w-[50%] font-bold">{column?.title}</div>
        </div>
        <div className="flex w-full">
          <div className="w-[50%]">{t('taskModalInfo.owner')}</div>
          <div className="w-[50%] font-bold">{login}</div>
        </div>
        <div className="flex w-full">
          <div className="w-[50%]">{t('taskModalInfo.participants')}</div>
          <div className="w-[50%] font-bold flex flex-col">
            {taskData?.users.length ? (
              <ul>
                {taskData?.users.map((user) => (
                  <li key={user}>{user}</li>
                ))}
              </ul>
            ) : (
              'none'
            )}
          </div>
        </div>
      </div>
      <Button variant="text" color="red" className="flex items-end self-end" onClick={deleteModal}>
        {t('taskModalInfo.deleteTask')}
      </Button>
    </>
  );
};

export default TaskModalInfo;

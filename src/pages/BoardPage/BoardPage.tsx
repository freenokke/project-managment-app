import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetColumnsQuery } from '../../redux/api/columnsApi';
import { AppDispatch } from '../../redux/store';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';
import Modal from '../../components/Modal/Modal';
import { ColumnWrapper, Loader } from '../../components';
import { useCallback, useEffect } from 'react';
import { setColumnsOrder, setOpenedBoard } from '../../redux/features/boardInfoSlice';
import { useGetBoardQuery } from '../../redux/api/boardsApi';
import { useState } from 'react';
import { ICurrentColumn } from '../../components/ColumnWrapper/ColumnWrapperTypes';
import { IColumnsResponse } from './BoardPage.types';
import { usePatchColumnsSetMutation } from '../../redux/api/columnsApi';

const BoardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { data, isLoading } = useGetColumnsQuery(id ? id : '');
  const { data: boardData } = useGetBoardQuery(id ? id : '');
  const { t } = useTranslation();
  const [selectedColumn, setSelectedColumn] = useState<ICurrentColumn | null>(null);
  const [columnsList, setColumnsList] = useState<IColumnsResponse[] | null>(null);
  const [patchColumns, {}] = usePatchColumnsSetMutation();

  useEffect(() => {
    if (data) {
      console.log('Данные с сервера:', data);
      setColumnsList(data);
      dispatch(setColumnsOrder(data.length));
    } else {
      dispatch(setColumnsOrder(0));
      setColumnsList(null);
    }
    dispatch(setOpenedBoard(id ? id : ''));
  }, [data, dispatch, id]);

  const updateColumnsList = useCallback(
    (newColumnsList: IColumnsResponse[], type: 'UPDATE' | 'DELETE') => {
      if (type === 'UPDATE') {
        setColumnsList(newColumnsList);
        patchColumns(
          newColumnsList.map((column, index) => {
            return { _id: column._id, order: index + 1 };
          })
        )
          .unwrap()
          .then((data: IColumnsResponse) => console.log('Ответ сервера', data));
      }
      if (type === 'DELETE') {
        setColumnsList(newColumnsList);
        patchColumns(
          newColumnsList.map((column, index) => {
            return { _id: column._id, order: index + 1 };
          })
        );
      }
    },
    [patchColumns]
  );

  const openCreateModal = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.createColumn }));
  }, [dispatch]);

  return (
    <div className="p-2 flex-grow flex flex-col justify-start items-center">
      <Modal />
      <Link
        className=" flex items-center gap-2 self-start transition-colors  cursor-pointer text-gray-500 hover:text-blue-500"
        to="/main"
      >
        <span className="material-icons">keyboard_backspace</span>
        {t('boardPage.backToBoardsList')}
      </Link>
      <h1 className="text-xl">{boardData ? boardData.title : t('main.loading')}</h1>
      {data?.length === 0 ? (
        <div className="text-gray-500 text-xl ">{t('boardPage.noColumns')}</div>
      ) : null}
      {isLoading && <Loader />}
      <div className="flex gap-3 justify-start  overflow-y-hidden p-2 flex-grow w-full">
        {columnsList?.map(({ _id, title, order, boardId }) => {
          return (
            <ColumnWrapper
              key={_id}
              id={_id}
              title={title}
              order={order}
              boardId={boardId}
              selectedColumn={selectedColumn}
              setSelectedColumn={setSelectedColumn}
              updateColumnsList={updateColumnsList}
              columnsList={columnsList}
            />
          );
        })}
        <button
          className="w-10 h-10 min-w-10 bg-white transition-colors text-[#57606A] text-xl material-icons border border-[#D8DEE4] rounded-md hover:bg-[#f6f8fa]"
          onClick={openCreateModal}
        >
          add
        </button>
      </div>
    </div>
  );
};

export default BoardPage;

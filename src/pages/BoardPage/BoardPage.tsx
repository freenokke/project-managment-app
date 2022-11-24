import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetColumnsQuery } from '../../redux/api/columnsApi';
import { AppDispatch } from '../../redux/store';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';
import Modal from '../../components/Modal/Modal';
import { ColumnWrapper, Loader } from '../../components';
import { useCallback, useEffect } from 'react';
import { setColumnsOrder, setOpenedBoard } from '../../redux/features/boardInfoSlice';
import { useGetBoardQuery } from '../../redux/api/boardsApi';

const BoardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetColumnsQuery(id ? id : '');
  const { data: boardData } = useGetBoardQuery(id ? id : '');
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      dispatch(setColumnsOrder(data.length));
    } else {
      dispatch(setColumnsOrder(0));
    }
    dispatch(setOpenedBoard(id ? id : ''));
  }, [data, dispatch, id]);

  const returnToMainPage = useCallback(() => {
    navigate('/main');
  }, [navigate]);

  const openCreateModal = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.createColumn }));
  }, [dispatch]);

  const loading = isLoading || isFetching;

  return (
    <div className="p-2 flex-grow flex flex-col justify-start items-center">
      <Modal />
      <div
        className=" flex items-center gap-2 self-start transition-colors  cursor-pointer text-gray-500 hover:text-blue-500"
        onClick={returnToMainPage}
      >
        <span className="material-icons">keyboard_backspace</span>
        {t('boardPage.backToBoardsList')}
      </div>
      <h1 className="text-xl">{boardData ? boardData.title : t('main.loading')}</h1>
      {data?.length === 0 ? (
        <div className="text-gray-500 text-xl ">{t('boardPage.noColumns')}</div>
      ) : null}
      {loading && <Loader />}
      <div className="flex gap-3 justify-start  overflow-y-hidden p-2 flex-grow w-full">
        {data?.map(({ _id, title, order, boardId }) => {
          return <ColumnWrapper key={_id} id={_id} title={title} order={order} boardId={boardId} />;
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

import React from 'react';
import InnerColumn from '../InnerColumn/InnerColumn';
import { IColumnProps } from './ColumnWrapperTypes';
import { sortByOrder } from '../../utils/utils';
import { useColumnsDraggable } from '../../hooks/useColumnsDraggable';
import { useDeleteColumnMutation } from '../../redux/api/columnsApi';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { useAppSelector } from '../../hooks/redux.hooks';
import { useDispatch } from 'react-redux';
import { setLocalColumns } from '../../redux/features/localDataSlice';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { useTranslation } from 'react-i18next';

const ColumnWrapper: React.FC<IColumnProps> = ({
  id,
  title,
  order,
  boardId,
  updateColumnsList,
  columnsList,
}) => {
  const {
    dragStartEventHandler,
    dragOverEventHandler,
    dragLeaveEventHandler,
    dragEndEventHandler,
    dropEventHandler,
  } = useColumnsDraggable();

  const [deleteColumn, { isLoading }] = useDeleteColumnMutation();
  const { currentDraggableColumn } = useAppSelector((state) => state.drag);
  const dispatch = useDispatch();

  useEnhancedEffect(() => {
    dispatch(setLocalColumns(id));
  }, []);
  const { t } = useTranslation();

  const dropHandler = (e: React.DragEvent) => {
    dropEventHandler(e);
    if (columnsList && order !== currentDraggableColumn?.order) {
      const newColumnsList = columnsList?.map((column) => {
        if (currentDraggableColumn) {
          if (column.order === currentDraggableColumn.order) {
            return { ...column, order: order };
          }
          if (column.order === order) {
            return { ...column, order: currentDraggableColumn?.order };
          }
          return column;
        } else return column;
      });
      updateColumnsList(newColumnsList.sort(sortByOrder), 'UPDATE');
    }
  };

  const deleteColumnHandler = async () => {
    await deleteColumn({ boardId, columnId: id })
      .unwrap()
      .then(() => {
        const newColumnsList = columnsList
          ?.filter((item) => {
            return item._id !== id;
          })
          .map((column, index) => {
            return { ...column, order: index + 1 };
          });
        if (newColumnsList) {
          updateColumnsList(newColumnsList, 'DELETE');
        }
      })
      .catch(() => {
        toast.error(t('errorBoundary.text'));
      });
  };

  return (
    <div
      className="boardColumn h-full relative"
      draggable
      data-type="column"
      onDragStart={(e) => dragStartEventHandler(e, { _id: id, boardId, title, order })}
      onDragOver={(e) => dragOverEventHandler(e, id)}
      onDrop={dropHandler}
      onDragLeave={dragLeaveEventHandler}
      onDragEnd={dragEndEventHandler}
    >
      {
        <InnerColumn
          boardId={boardId}
          columnId={id}
          columnTitle={title}
          order={order}
          deleteColumnFn={deleteColumnHandler}
        />
      }
      {isLoading ? <Loader /> : null}
    </div>
  );
};

export default ColumnWrapper;

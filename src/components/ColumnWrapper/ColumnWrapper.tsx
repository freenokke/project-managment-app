import React from 'react';
import InnerColumn from '../InnerColumn/InnerColumn';
import { IColumnProps } from './ColumnWrapperTypes';
import { sortByOrder } from '../../utils/utils';
import { useColumnsDraggable } from '../../hooks/useColumnsDraggable';
import { useDeleteColumnMutation } from '../../redux/api/columnsApi';
import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { resetCurrentDraggable, setCurrentDraggable } from '../../redux/features/dragSlice';

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
  const dispatch = useAppDispatch();
  const { currentDraggable } = useAppSelector((state) => state.drag);

  const dragStartHandler = (e: React.DragEvent) => {
    dragStartEventHandler(e);
    dispatch(setCurrentDraggable({ itemInfo: { _id: id, order, title, boardId }, type: 'column' }));
  };

  const dragEndHandler = (e: React.DragEvent) => {
    console.log('end');
    dragEndEventHandler(e);
    dispatch(resetCurrentDraggable());
  };

  const dropHandler = (e: React.DragEvent) => {
    dropEventHandler(e);
    // console.log('Меняем колонку', selectedColumn?.title, 'order', selectedColumn?.order);
    // console.log('С колонкой', title, 'order', order);
    if (columnsList && order !== currentDraggable?.order) {
      const newColumnsList = columnsList?.map((column) => {
        if (currentDraggable) {
          if (column.order === currentDraggable.order) {
            return { ...column, order: order };
          }
          if (column.order === order) {
            return { ...column, order: currentDraggable?.order };
          }
          return column;
        } else return column;
      });
      updateColumnsList(newColumnsList.sort(sortByOrder), 'UPDATE');
    }
  };

  const deleteColumnHandler = async () => {
    await deleteColumn({ boardId, columnId: id });
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
  };

  return (
    <div
      className="boardColumn relative"
      draggable
      data-type="column"
      onDragStart={dragStartHandler}
      onDragOver={dragOverEventHandler}
      onDrop={dropHandler}
      onDragLeave={dragLeaveEventHandler}
      onDragEnd={dragEndHandler}
    >
      {<InnerColumn boardId={boardId} columnId={id} columnTitle={title} />}
      {isLoading ? <Loader /> : null}
      <button onClick={deleteColumnHandler}>DELETE</button>
    </div>
  );
};

export default ColumnWrapper;

import React from 'react';
import InnerColumn from '../InnerColumn/InnerColumn';
import { IColumnProps } from './ColumnWrapperTypes';
import { sortByOrder } from '../../utils/utils';
import { useColumnsDraggable } from '../../hooks/useColumnsDraggable';
import { useDeleteColumnMutation } from '../../redux/api/columnsApi';
import Loader from '../Loader/Loader';
import { useAppSelector } from '../../hooks/redux.hooks';

const ColumnWrapper: React.FC<IColumnProps> = ({
  id,
  title,
  order,
  boardId,
  onDropHandler,
  columnsList,
}) => {
  const {
    dragStartEventHandler,
    dragOverEventHandler,
    dragLeaveEventHandler,
    dragEndEventHandler,
    dropEventHandler,
  } = useColumnsDraggable();

  const { currentDraggable } = useAppSelector((state) => state.drag);

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
      onDropHandler(newColumnsList.sort(sortByOrder));
    }
  };

  return (
    <div
      className="boardColumn h-[500px] relative"
      draggable
      data-type="column"
      onDragStart={(e) => dragStartEventHandler(e, { _id: id, boardId, title, order })}
      onDragOver={(e) => dragOverEventHandler(e, id)}
      onDrop={dropHandler}
      onDragLeave={dragLeaveEventHandler}
      onDragEnd={dragEndEventHandler}
    >
      <InnerColumn boardId={boardId} columnId={id} columnTitle={title} order={order} />
    </div>
  );
};

export default ColumnWrapper;

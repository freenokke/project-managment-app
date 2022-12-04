import React from 'react';
import InnerColumn from '../InnerColumn/InnerColumn';
import { IColumnProps } from './ColumnWrapperTypes';
import { sortByOrder } from '../../utils/utils';
import { useColumnsDraggable } from '../../hooks/useColumnsDraggable';
// import { toast } from 'react-toastify';
// import Loader from '../Loader/Loader';
import { useAppSelector } from '../../hooks/redux.hooks';
// import { useTranslation } from 'react-i18next';

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
  // const { t } = useTranslation();

  const dropHandler = (e: React.DragEvent) => {
    dropEventHandler(e);
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
      className="boardColumn h-full relative"
      draggable
      data-type="column"
      onDragStart={(e) => dragStartEventHandler(e, { _id: id, boardId, title, order })}
      onDragOver={(e) => dragOverEventHandler(e, id)}
      onDrop={dropHandler}
      onDragLeave={dragLeaveEventHandler}
      onDragEnd={dragEndEventHandler}
    >
      {<InnerColumn boardId={boardId} columnId={id} columnTitle={title} order={order} />}
    </div>
  );
};

export default ColumnWrapper;

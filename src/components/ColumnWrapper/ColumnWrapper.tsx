import React from 'react';
import InnerColumn from '../InnerColumn/InnerColumn';
import { IColumnProps } from './ColumnWrapperTypes';
import { sortByOrder } from '../../utils/utils';
import { useColumnsDraggable } from '../../hooks/useColumnsDraggable';
import { useAppSelector } from '../../hooks/redux.hooks';
import { useDispatch } from 'react-redux';
import { setLocalColumns } from '../../redux/features/localDataSlice';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

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

  const { currentDraggableColumn } = useAppSelector((state) => state.drag);
  const dispatch = useDispatch();

  useEnhancedEffect(() => {
    dispatch(setLocalColumns(id));
  }, []);

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

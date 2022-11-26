import React from 'react';
import InnerColumn from '../InnerColumn/InnerColumn';
import { IColumnProps } from './ColumnWrapperTypes';
import { sortByOrder } from '../../utils/utils';
import { useColumnsDraggable } from '../../hooks/useColumnsDraggable';

const ColumnWrapper: React.FC<IColumnProps> = ({
  id,
  title,
  order,
  boardId,
  setSelectedColumn,
  selectedColumn,
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

  const dragStartHandler = (e: React.DragEvent) => {
    dragStartEventHandler(e);
    setSelectedColumn({ id, order, title });
  };

  const dropHandler = async (e: React.DragEvent) => {
    dropEventHandler(e);
    // console.log('Меняем колонку', selectedColumn?.title, 'order', selectedColumn?.order);
    // console.log('С колонкой', title, 'order', order);
    if (columnsList && order !== selectedColumn?.order) {
      const newColumnsList = columnsList?.map((column) => {
        if (selectedColumn) {
          if (column.order === selectedColumn.order) {
            return { ...column, order: order };
          }
          if (column.order === order) {
            return { ...column, order: selectedColumn?.order };
          }
          return column;
        } else return column;
      });
      updateColumnsList(newColumnsList.sort(sortByOrder));
    }
  };

  return (
    <div
      className="boardColumn"
      draggable
      data-type="column"
      onDragStart={dragStartHandler}
      onDragOver={dragOverEventHandler}
      onDrop={dropHandler}
      onDragLeave={dragLeaveEventHandler}
      onDragEnd={dragEndEventHandler}
    >
      {<InnerColumn boardId={boardId} columnId={id} columnTitle={title} />}
    </div>
  );
};

export default ColumnWrapper;

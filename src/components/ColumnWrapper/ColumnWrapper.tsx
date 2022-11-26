import React from 'react';
import InnerColumn from '../InnerColumn/InnerColumn';
import { IColumnProps } from './ColumnWrapperTypes';
import { sortByOrder } from '../../utils/utils';

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
  const dragStartHandler = () => {
    setSelectedColumn({ id, order, title });
  };

  const dragOverHandler = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const dropHandler = async (e: React.DragEvent) => {
    e.preventDefault();
    console.log('Меняем колонку', selectedColumn?.title, 'order', selectedColumn?.order);
    console.log('С колонкой', title, 'order', order);
    if (columnsList) {
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
      console.log(newColumnsList);
    }
  };

  return (
    <div
      className="boardColumn"
      data-order={order}
      draggable
      onDragStart={dragStartHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      {<InnerColumn boardId={boardId} columnId={id} columnTitle={title} />}
    </div>
  );
};

export default ColumnWrapper;

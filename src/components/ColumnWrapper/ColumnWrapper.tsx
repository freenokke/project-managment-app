import React from 'react';
import InnerColumn from '../InnerColumn/InnerColumn';
import { IColumnProps } from './ColumnWrapperTypes';
import { sortByOrder } from '../../utils/utils';
import { useColumnsDraggable } from '../../hooks/useColumnsDraggable';
import { useDeleteColumnMutation } from '../../redux/api/columnsApi';
import Loader from '../Loader/Loader';

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

  const [deleteColumn, { isLoading }] = useDeleteColumnMutation();

  const dragStartHandler = (e: React.DragEvent) => {
    dragStartEventHandler(e);
    setSelectedColumn({ id, order, title });
  };

  const dropHandler = (e: React.DragEvent) => {
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
      onDragEnd={dragEndEventHandler}
      onDragOverCapture={dragOverEventHandler}
    >
      {<InnerColumn boardId={boardId} columnId={id} columnTitle={title} />}
      {isLoading ? <Loader /> : null}
      <button onClick={deleteColumnHandler}>DELETE</button>
    </div>
  );
};

export default ColumnWrapper;

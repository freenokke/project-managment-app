import React from 'react';
import { usePatchColumnsSetMutation } from '../../redux/api/columnsApi';
import InnerColumn from '../InnerColumn/InnerColumn';
import { IColumnProps } from './ColumnWrapperTypes';

const ColumnWrapper: React.FC<IColumnProps> = ({
  id,
  title,
  order,
  boardId,
  setCurrentColumn,
  currentColumn,
}) => {
  const [patchColumns, {}] = usePatchColumnsSetMutation();
  const dragStartHandler = () => {
    setCurrentColumn({ id, order, title });
  };

  const dragOverHandler = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const dropHandler = async (e: React.DragEvent) => {
    e.preventDefault();
    console.log('Меняем колонку', currentColumn?.title, 'с колонкой', title);
    const requestBody = [
      {
        _id: currentColumn?.id,
        order,
      },
      {
        _id: id,
        order: currentColumn?.order,
      },
    ];
    await patchColumns(requestBody);
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

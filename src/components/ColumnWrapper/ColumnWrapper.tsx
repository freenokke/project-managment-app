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
    console.log('drug start event ', order, title);
    setCurrentColumn({ id, order, title });
  };

  const dragOverHandler = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const dropHandler = async (e: React.DragEvent) => {
    e.preventDefault();
    // та, что перетягивается в currentColumn, а дпугая в пропсах
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
    const data = await patchColumns(requestBody);
    console.log(data);
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
      <div className="text-lg ">{title}</div>
      {<InnerColumn boardId={boardId} columnId={id} />}
    </div>
  );
};

export default ColumnWrapper;

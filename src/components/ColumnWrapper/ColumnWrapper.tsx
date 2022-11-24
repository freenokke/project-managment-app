import React from 'react';
import { ColumnProps } from './ColumnWrapperTypes';

const ColumnWrapper: React.FC<ColumnProps> = ({ id, title, order, boardId }) => {
  return (
    <div className="boardColumn ">
      <div className="text-lg ">{title}</div>
    </div>
  );
};

export default ColumnWrapper;

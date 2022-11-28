import React, { FC } from 'react';
import { IProps } from './InnerColumnContent.type';
import { ClipLoader } from 'react-spinners';

const InnerColumnContent: FC<IProps> = ({
  onDragDropFn,
  onDragLeaveFn,
  onDragOverFn,
  children,
  loading,
  columnId,
}) => {
  return (
    <div
      onDragOver={onDragOverFn}
      onDrop={(e) => onDragDropFn(e, { columnId })}
      onDragLeave={onDragLeaveFn}
      className="flex flex-col flex-grow w-full items-center gap-2 p-1 overflow-x-hidden overflow-y-auto"
    >
      {loading ? (
        <div
          className={`${
            !loading && 'hidden'
          } absolute inset-0 w-full h-full flex items-center justify-center`}
        >
          <ClipLoader size={35} color="#366cd6" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default InnerColumnContent;

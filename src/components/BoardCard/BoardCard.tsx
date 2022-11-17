import React from 'react';
import { Link } from 'react-router-dom';
import { IBoardProps } from './Board.types';

const BoardCard = (props: IBoardProps) => {
  const { id, title, description, onClick } = props;
  return (
    <div id={id} className="boardCard md:w-[45%] lg:w-[30%] h-[120px]">
      <Link to={`/board/${id}`} className="block w-full h-full">
        <p className="text-left text-lg font-bold text-gray-700">{title}</p>
        <p>{description}</p>
      </Link>
      <span
        className="material-icons absolute bottom-[7px] right-[40px] text-blue-700 cursor-pointer hover:text-blue-400"
        data-modal="update"
        onClick={onClick}
      >
        edit
      </span>
      <span
        className="material-icons absolute bottom-[7px] right-[7px] text-blue-700 cursor-pointer hover:text-blue-400"
        data-modal="confirm"
        onClick={onClick}
      >
        delete_outline
      </span>
    </div>
  );
};

export default BoardCard;

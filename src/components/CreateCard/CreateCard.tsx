import { ICreateCardProps } from './CreateCard.types';

const CreateCard = (props: ICreateCardProps) => {
  const { title, handleClick } = props;
  return (
    <div
      data-modal="create"
      className="boardCard flex justify-center items-center md:w-[45%] lg:w-[30%] text-lg bg-blue-gray-100/[0.2] hover:bg-blue-gray-200/[0.3]"
      onClick={handleClick}
    >
      <span>CREATE {title.toLocaleUpperCase()}</span>
    </div>
  );
};

export default CreateCard;

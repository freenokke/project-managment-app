import { useTranslation } from 'react-i18next';
import { ICreateCardProps } from './CreateCard.types';

const CreateCard = ({ title, onClick }: ICreateCardProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={`text-gray-700 ${
        title === 'board' &&
        'boardCard flex justify-center items-center md:w-[45%] lg:w-[30%] text-lg bg-blue-gray-100/[0.2] hover:bg-blue-gray-200/[0.3]'
      } ${title === 'task' && 'createTaskBtn px-2 py-3'}`}
      onClick={onClick}
    >
      <span className="material-icons">add</span>
      <span>
        {t('create.button')} {title}
      </span>
    </div>
  );
};

export default CreateCard;

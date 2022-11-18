import { useTranslation } from 'react-i18next';
import { ICreateCardProps } from './CreateCard.types';

const CreateCard = (props: ICreateCardProps) => {
  const { t } = useTranslation();
  const { title, onClick } = props;

  return (
    <div
      className="boardCard flex justify-center items-center md:w-[45%] lg:w-[30%] text-lg bg-blue-gray-100/[0.2] hover:bg-blue-gray-200/[0.3]"
      onClick={onClick}
    >
      <span>
        {t('main.create')} {title}
      </span>
    </div>
  );
};

export default CreateCard;
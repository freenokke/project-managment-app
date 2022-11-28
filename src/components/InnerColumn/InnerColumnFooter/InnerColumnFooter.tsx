import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IProps } from './InnerColumnFooter.type';

const InnerColumnFooter: FC<IProps> = ({ openModalFn }) => {
  const { t } = useTranslation();

  return (
    <div className="text-gray-700 createTaskBtn px-2 py-3" onClick={openModalFn}>
      <span className="material-icons">add</span>
      <span>
        {t('create.button')} {t('taskTitle')}
      </span>
    </div>
  );
};

export default InnerColumnFooter;

import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../hooks/redux.hooks';
import { closeModal } from '../../../redux/features/modalSlice';
import { IFormFields } from './CreateModal.types';
import ModalInput from '../ModalInput/ModalInput';
import { Button } from '@material-tailwind/react';
import useBoardModal from '../useBoardModal';
import { ModalChild } from '../Modal.types';

const CreateModal = ({
  register,
  handleSubmit,
  reset,
  errors,
  isDirty,
  isValid,
  isSubmitted,
}: ModalChild) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const onCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const { createBoard } = useBoardModal();

  const onSubmit: SubmitHandler<IFormFields> = useCallback(
    (data) => {
      const boardData = { title: data['Title'], owner: 'userId', users: [] };
      createBoard(boardData);
      reset();
      onCloseModal();
    },
    [createBoard, onCloseModal, reset]
  );

  return (
    <div className="container flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl mb-10">{t('createModal.modalTitle')}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-9 w-full mb-[40px]"
        autoComplete="off"
      >
        <ModalInput label={t('modal.labelInput')} register={register} errors={errors} />
        <Button type="submit" className="w-full" disabled={!isDirty || (isSubmitted && !isValid)}>
          {t('createModal.modalButton')}
        </Button>
      </form>
    </div>
  );
};

export default CreateModal;

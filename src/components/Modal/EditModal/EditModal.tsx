import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/redux.hooks';
import { closeModal } from '../../../redux/features/modalSlice';
import useBoardModal from '../useBoardModal';
import { SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { IFormFields } from './EditModal.type';
import ModalInput from '../ModalInput/ModalInput';
import { Button } from '@material-tailwind/react';
import { ModalChild } from '../Modal.types';

const EditModal = ({
  register,
  handleSubmit,
  reset,
  errors,
  isDirty,
  isValid,
  isSubmitted,
  data,
}: ModalChild) => {
  const dispatch = useAppDispatch();
  const onCloseModal = useCallback(() => {
    reset();
    dispatch(closeModal());
  }, [dispatch, reset]);

  const { t } = useTranslation();
  const { editBoard } = useBoardModal();

  const onSubmit: SubmitHandler<IFormFields> = useCallback(
    (formData) => {
      editBoard({ title: formData['Title'] }, data ?? '');
      onCloseModal();
    },
    [editBoard, onCloseModal, data]
  );

  return (
    <div className="container flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl mb-10">{t('editModal.modalTitle')}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-9 w-full mb-[40px]"
        autoComplete="off"
      >
        <ModalInput label={t('modal.labelInput')} register={register} errors={errors} />
        {/* <ModalTextarea label="Description" register={register} errors={errors} /> */}
        <Button type="submit" className="w-full" disabled={!isDirty || (isSubmitted && !isValid)}>
          {t('editModal.modalButton')}
        </Button>
      </form>
    </div>
  );
};

export default EditModal;
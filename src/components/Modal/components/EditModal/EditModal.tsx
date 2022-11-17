import { SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { IFormFields } from './EditModal.types';
import ModalInput from '../../../ModalInput/ModalInput';
import { Button } from '@material-tailwind/react';
import useBoardModal from '../../../../hooks/useBoardModal';
import { ModalChild } from '../../Modal.types';
import { useAppDispatch } from '../../../../hooks/redux.hooks';
import { closeModal } from '../../../../redux/features/modalSlice';

const EditModal = ({
  register,
  handleSubmit,
  errors,
  isDirty,
  isValid,
  isSubmitted,
  data,
}: ModalChild) => {
  const dispatch = useAppDispatch();

  const { updateBoard } = useBoardModal();

  const onCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const onSubmit: SubmitHandler<IFormFields> = useCallback(
    (formData) => {
      updateBoard({ title: formData['Title'] }, data ?? '');
      onCloseModal();
    },
    [updateBoard, onCloseModal, data]
  );

  return (
    <div className="container flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl mb-10">Edit Board</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full mb-[40px]"
        autoComplete="off"
      >
        <ModalInput label="Title" register={register} errors={errors} />
        {/* <ModalTextarea label="Description" register={register} errors={errors} /> */}
        <Button type="submit" disabled={!isDirty || (isSubmitted && !isValid)}>
          Edit
        </Button>
      </form>
    </div>
  );
};

export default EditModal;

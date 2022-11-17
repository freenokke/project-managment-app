import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { IModalBoardForm, IFormFields } from './ModalBoardForm.types';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { toggleModal } from '../../redux/features/modalSlice';
import ModalInput from '../ModalInput/ModalInput';
// import ModalTextarea from '../ModalTextarea/ModalTextarea';
import { Button } from '@material-tailwind/react';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

const ModalBoardForm = (props: IModalBoardForm) => {
  const { onCloseModal, onHandleEvent } = props;
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    // getFieldState,
    formState: { errors, isDirty, isValid, isSubmitted, isSubmitSuccessful },
  } = useForm<IFormFields>();

  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    const boardData = { title: data['Title'], owner: 'Harry Potter', users: [] };
    onHandleEvent(boardData);
    reset();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      dispatch(toggleModal());
    }
  });

  return (
    <ModalWrapper onCloseModal={onCloseModal}>
      <div className="container flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl mb-10">Create Board</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-9 w-full mb-[40px]"
          autoComplete="off"
        >
          <ModalInput label="Title" register={register} errors={errors} />
          {/* <ModalTextarea label="Description" register={register} errors={errors} /> */}
          <Button type="submit" disabled={!isDirty || (isSubmitted && !isValid)}>
            Create
          </Button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default ModalBoardForm;

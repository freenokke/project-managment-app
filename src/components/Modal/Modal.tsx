import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { IFormFields } from './Modal.types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { closeModal, ModalTypes } from '../../redux/features/modalSlice';
import ModalWrapper from './ModalWrapper/ModalWrapper';
import CreateModal from './CreateModal/CreateModal';
import EditModal from './EditModal/EditModal';
import DeleteModal from './DeleteModal/DeleteModal';

const ModalTypeMapper = {
  [ModalTypes.createBoard]: CreateModal,
  [ModalTypes.createColumn]: CreateModal,
  [ModalTypes.createTask]: CreateModal,
  [ModalTypes.deleteBoard]: DeleteModal,
  [ModalTypes.deleteColumn]: DeleteModal,
  [ModalTypes.deleteTask]: DeleteModal,
  [ModalTypes.editBoard]: EditModal,
  [ModalTypes.editColumn]: EditModal,
  [ModalTypes.editTask]: EditModal,
};

const Modal = () => {
  const { visible, type, data } = useAppSelector((state) => state.modal);
  const { userId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitted },
    setValue,
  } = useForm<IFormFields>();

  const onCloseModal = useCallback(() => {
    dispatch(closeModal());
    reset();
  }, [dispatch, reset]);

  if (!visible) return null;

  const Component = ModalTypeMapper[type];

  return (
    <ModalWrapper onCloseModal={onCloseModal}>
      <Component
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
        setValue={setValue}
        errors={errors}
        isDirty={isDirty}
        isValid={isValid}
        isSubmitted={isSubmitted}
        data={data}
        type={type}
        userId={userId}
      />
    </ModalWrapper>
  );
};

export default Modal;

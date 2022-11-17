import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { IFormFields } from './Modal.types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { closeModal, ModalTypes } from '../../redux/features/modalSlice';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import CreateModal from './components/CreateModal/CreateModal';
import DeleteModal from './components/DeleteModal/DeleteModal';
import EditModal from './components/EditModal/EditModal';

const ModalTypeMapper = {
  [ModalTypes.create]: CreateModal,
  [ModalTypes.deleteBoard]: DeleteModal,
  [ModalTypes.deleteColumn]: DeleteModal,
  [ModalTypes.edit]: EditModal,
};

const Modal = () => {
  const { visible, type, data } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const onCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitted },
  } = useForm<IFormFields>();

  if (!visible) return null;
  const Component = ModalTypeMapper[type];

  return (
    <ModalWrapper onCloseModal={onCloseModal}>
      <Component
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isDirty={isDirty}
        isValid={isValid}
        isSubmitted={isSubmitted}
        data={data}
        type={type}
      />
    </ModalWrapper>
  );
};

export default Modal;

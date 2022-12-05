import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { IFormFields } from './Modal.types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { closeModal, ModalTypes } from '../../redux/features/modalSlice';
import ModalWrapper from './ModalWrapper/ModalWrapper';
import CreateModal from './CreateModal/CreateModal';
import EditModal from './EditModal/EditModal';
import DeleteModal from './DeleteModal/DeleteModal';
import useBoardModal from './useBoardModal';
import useColumnModal from './useColumnModal';
import useTaskModal from './useTaskModal';

const CreateTypes = [ModalTypes.createBoard, ModalTypes.createColumn, ModalTypes.createTask];
const EditTypes = [ModalTypes.editBoard, ModalTypes.editColumn, ModalTypes.editTask];
const DeleteTypes = [
  ModalTypes.deleteBoard,
  ModalTypes.deleteColumn,
  ModalTypes.deleteTask,
  ModalTypes.deleteUser,
];

const Modal = () => {
  const { visible, type, data } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const { createBoard, editBoard, deleteBoard } = useBoardModal();
  const { createColumn, deleteColumn } = useColumnModal();
  const { createTask, editTask, deleteTask } = useTaskModal();

  const formProps = useForm<IFormFields>();

  const { reset } = formProps;

  const onCloseModal = useCallback(() => {
    dispatch(closeModal());
    reset();
  }, [dispatch, reset]);

  const Component = useMemo(() => {
    if (CreateTypes.includes(type)) {
      return (
        <CreateModal
          {...formProps}
          onCloseModal={onCloseModal}
          type={type}
          data={data}
          createBoard={createBoard}
          createColumn={createColumn}
          createTask={createTask}
        />
      );
    } else if (EditTypes.includes(type)) {
      return (
        <EditModal
          {...formProps}
          onCloseModal={onCloseModal}
          type={type}
          data={data}
          editBoard={editBoard}
          editTask={editTask}
        />
      );
    } else if (DeleteTypes.includes(type)) {
      return (
        <DeleteModal
          onCloseModal={onCloseModal}
          type={type}
          data={data}
          deleteBoard={deleteBoard}
          deleteColumn={deleteColumn}
          deleteTask={deleteTask}
        />
      );
    }
    return null;
  }, [
    createBoard,
    createColumn,
    createTask,
    data,
    deleteBoard,
    deleteColumn,
    deleteTask,
    editBoard,
    editTask,
    formProps,
    onCloseModal,
    type,
  ]);

  if (!visible) return null;

  return <ModalWrapper onCloseModal={onCloseModal}>{Component}</ModalWrapper>;
};

export default Modal;

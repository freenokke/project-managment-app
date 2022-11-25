import { FC, useCallback } from 'react';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';
import { IProps } from './TaskWrapper.type';
import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';

const TaskWrapper: FC<IProps> = ({
  taskData,
  onDragDropFn,
  onDragOverFn,
  onDragStartFn,
  onDragLeaveFn,
  onDragEndFn,
}) => {
  const { _id: taskId, boardId, columnId, title } = taskData;
  const dispatch = useAppDispatch();

  const deleteModal = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.deleteTask, data: { boardId, columnId, taskId } }));
  }, [dispatch, boardId, columnId, taskId]);

  const editModal = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.editTask, data: { boardId, columnId, taskId } }));
  }, [dispatch, boardId, columnId, taskId]);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStartFn(e, taskData)}
      onDragOver={onDragOverFn}
      onDrop={(e) => onDragDropFn(e, taskData)}
      onDragLeave={onDragLeaveFn}
      onDragEnd={onDragEndFn}
      className="relative w-full rounded shadow"
    >
      <div className="w-full flex-shrink-0 pl-1 pr-8 py-2 rounded cursor-pointer transition-all bg-white hover:bg-blue-100">
        {title}
      </div>
      <div className="absolute top-0 right-0 text-gray-700 cursor-pointer">
        <Menu placement="left">
          <MenuHandler>
            <span className="material-icons text-xl rounded-full leading-none transition-all hover:bg-blue-gray-50">
              more_horiz
            </span>
          </MenuHandler>
          <MenuList className="flex min-w-min p-0">
            <MenuItem className="p-1 text-red-700 first-letter:capitalize">
              <span onClick={deleteModal} className="material-icons text-xl">
                delete
              </span>
            </MenuItem>
            <MenuItem className="p-1 text-blue-700 first-letter:capitalize">
              <span onClick={editModal} className="material-icons text-xl">
                edit
              </span>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default TaskWrapper;

import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import React, { FC, useCallback, useRef, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux.hooks';
import { ModalTypes, showModal } from '../../../redux/features/modalSlice';
import { useTranslation } from 'react-i18next';
import { useEditColumnMutation } from '../../../redux/api/columnsApi';
import { IProps } from './InnerColumnHeader.type';

const InnerColumnHeader: FC<IProps> = ({ columnTitle, taskCount, boardId, columnId, order }) => {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [title, setTitle] = useState(columnTitle);
  const [editStatus, setEditStatus] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [editColumn, {}] = useEditColumnMutation();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const updateTitleHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  }, []);

  const onCLickHandler = useCallback(() => {
    setCurrentTitle(ref.current?.textContent ?? '');
    setEditStatus(true);
  }, []);

  const onKeyUpHandler = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        setEditStatus(false);
        editColumn({ boardId, columnId, body: { title, order } });
      }
      if (e.key === 'Escape') {
        setTitle(currentTitle);
        setEditStatus(false);
      }
    },
    [currentTitle, boardId, columnId, order, title, editColumn]
  );

  const deleteModal = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.deleteColumn, data: { boardId, columnId } }));
  }, [boardId, columnId, dispatch]);

  const changeTitle = useCallback(() => {
    setEditStatus(false);
    editColumn({ boardId, columnId, body: { title, order } });
  }, [boardId, columnId, order, title, editColumn]);

  const cancelTitleChanging = useCallback(() => {
    setTitle(currentTitle);
    setEditStatus(false);
  }, [currentTitle]);

  const hideColumn = () => {};

  return (
    <div className="flex items-center min-h-[50px] py-[10px] px-[8px] relative pr-[36px]">
      {editStatus ? (
        <div className="flex justify-center items-center gap-1">
          <input
            value={title}
            onChange={updateTitleHandler}
            onKeyUp={onKeyUpHandler}
            autoFocus
            maxLength={50}
            type="text"
            className="pl-1 outline-gray-700/50"
          />
          <span onClick={changeTitle} className="material-icons text-green-700 cursor-pointer">
            done
          </span>
          <span
            onClick={cancelTitleChanging}
            className="material-icons text-red-700 cursor-pointer"
          >
            close
          </span>
        </div>
      ) : (
        <h3
          className="max-w-[70%] text-base font-semibold tracking-wide break-words cursor-default"
          ref={ref}
          onClick={onCLickHandler}
        >
          {title}
        </h3>
      )}
      <div className="text-xs flex justify-center items-center h-5 w-5 ml-1 rounded-full bg-blue-gray-100">
        {taskCount}
      </div>
      <div className="absolute right-1 top-1 cursor-pointer">
        <Menu placement="bottom">
          <MenuHandler>
            <span className="material-icons text-gray-700 rounded-full hover:bg-blue-gray-100">
              more_vert
            </span>
          </MenuHandler>
          <MenuList className="flex flex-col min-w-min">
            <MenuItem onClick={hideColumn} className="flex items-center">
              <span className="material-icons mr-2">visibility_off</span>
              {t('column.hide')}
            </MenuItem>
            <MenuItem onClick={deleteModal} className="flex items-center">
              <span className="material-icons mr-2 text-red-700">delete_forever</span>
              {t('column.delete')}
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default InnerColumnHeader;

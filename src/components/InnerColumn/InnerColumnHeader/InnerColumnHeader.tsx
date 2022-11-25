import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import React, { FC, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IProps } from './InnerColumnHeader.type';

const InnerColumnHeader: FC<IProps> = ({ columnTitle, taskCount }) => {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [title, setTitle] = useState(columnTitle);
  const [editStatus, setEditStatus] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');

  const { t } = useTranslation();

  const updateTitleHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  }, []);

  const onCLickHandler = useCallback(() => {
    setCurrentTitle(ref.current?.textContent ?? '');
    setEditStatus(true);
  }, []);

  const onBlurHandler = useCallback(() => {
    setEditStatus(false);
  }, []);

  const onKeyUpHandler = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        setEditStatus(false);
      }
      if (e.key === 'Escape') {
        setTitle(currentTitle);
        setEditStatus(false);
      }
    },
    [currentTitle]
  );

  const hideColumn = () => {};
  const deleteColumn = () => {};

  return (
    <div className="flex items-center min-h-[50px] py-[10px] px-[8px] relative pr-[36px]">
      {editStatus ? (
        <input
          value={title}
          onChange={updateTitleHandler}
          onBlur={onBlurHandler}
          onKeyUp={onKeyUpHandler}
          autoFocus
          maxLength={50}
          type="text"
          className="pl-1 outline-gray-700/50"
        />
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
            <MenuItem className="flex items-center">
              <span onClick={hideColumn} className="material-icons mr-2">
                visibility_off
              </span>
              {t('column.hide')}
            </MenuItem>
            <MenuItem className="flex items-center">
              <span onClick={deleteColumn} className="material-icons mr-2 text-red-700">
                delete_forever
              </span>
              {t('column.delete')}
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default InnerColumnHeader;

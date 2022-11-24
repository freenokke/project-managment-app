import { useCallback, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { ITask, ITaskModal } from './TaskModal.types';

const myTask: ITask = {
  _id: '12345',
  title: 'My Task',
  order: 1,
  boardId: '637ba4d7255b5e6beda3415f',
  columnId: '637bb42e255b5e6beda34172',
  description:
    'The user changes the belonging of the task to the column using drag-n-drop. (It is recommended to use the existing library from React ecosystem to implement the drag-n-drop functionality). Implement the ability to interact with the task in such a way that the user can comfortably view / change the data in the task (modal/separate route/editable fields etc.) . Note that click can happen after MouseUp on d-n-d. Implement the ability to delete a task. The Delete task button should be located in a convenient place for the user. On click: Confirmation modal -> delete. ATTENTION! Deleting a column removes the tasks associated with it from the BD automatically.',
  userId: '6372c0cd255b5e6beda33ad8',
  users: [],
};

const TaskModal = ({ onCloseModal }: ITaskModal) => {
  const [editInput, setEditInput] = useState(false);
  const [inputValue, setInputValue] = useState('My Task');
  const [title, setTitle] = useState('My Task');
  const [editTextarea, setEditTextarea] = useState(false);
  const [textareaValue, setTextareaValue] = useState(myTask.description);

  const setEditInputMode = useCallback(() => {
    setEditInput(!editInput);
  }, [editInput]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target?.value);
  };

  const setNewTitle = useCallback(() => {
    setTitle(inputValue);
    setEditInputMode();
  }, [inputValue, setEditInputMode]);

  const setEditTextareaMode = useCallback(() => {
    setEditTextarea(!editTextarea);
  }, [editTextarea]);

  const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target?.value);
  };

  const setNewTextarea = useCallback(() => {
    setTextareaValue(textareaValue);
    setEditTextareaMode();
  }, [textareaValue, setEditTextareaMode]);

  return (
    <>
      <div onClick={onCloseModal} className="modalOverlay absolute bg-blue-gray-300/[0.4]" />
      <div className="absolute top-0 bottom-0 right-0 left-0 sm:left-[15%] z-20 overflow-y-scroll shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-gray-50 p-[40px_10px] md:p-[40px_30px] lg:p-[50px]h-full">
        <p className="text-[18px] p-[20px_20px_10px] lg:p-[0_20px]">{myTask.boardId}</p>
        <span
          className="material-icons absolute top-[20px] right-[20px] text-slate-900 cursor-pointer"
          onClick={onCloseModal}
        >
          close
        </span>
        <div className="h-full column lg:gap-[20px]">
          {!editInput ? (
            <div className="flex justify-between items-end lg:items-center gap-[10px] p-[20px_20px_55px] lg:p-[20px]">
              <h1 className="text-[24px]">{title}</h1>
              <Button
                variant="outlined"
                className="flex items-center h-[20px] md:h-[30px]"
                onClick={setEditInputMode}
              >
                Edit
              </Button>
            </div>
          ) : (
            <form className="column p-[20px] gap-[10px] lg:row lg:justify-between">
              <input
                className="p-[5px_10px] lg:flex-grow"
                value={inputValue}
                onChange={handleInput}
                autoFocus
              />
              <div className="self-end row gap-[5px]">
                <Button
                  variant="outlined"
                  className="h-[20px] md:h-[32px] flex items-center"
                  onClick={setEditInputMode}
                >
                  Cancel
                </Button>
                <Button
                  color="green"
                  className="h-[26px] md:h-[32px] flex items-center"
                  onClick={setNewTitle}
                >
                  Save
                </Button>
              </div>
            </form>
          )}

          <div className="column flex-grow lg:row">
            <div className="column flex-grow lg:w-[60%] border-2 p-[20px_5px] md:p-[20px]">
              {!editTextarea ? (
                <div className="column">
                  <Button
                    variant="text"
                    className="self-end h-[20px] md:h-[30px] flex items-center"
                    onClick={setEditTextareaMode}
                  >
                    Edit
                  </Button>
                  <h3 className="p-[0_20px] text-[20px]">Description</h3>
                  <div className="p-[20px_0] lg:p-[20px]">{textareaValue}</div>
                </div>
              ) : (
                <>
                  <h3 className="p-[30px_20px_10px] text-[20px]">Description</h3>
                  <textarea
                    className="w-full h-full p-[10px_10px] lg:p-[20px]"
                    value={textareaValue}
                    onChange={handleTextarea}
                    autoFocus
                  />
                  <div className="self-end row gap-[5px] mt-[30px]">
                    <Button
                      variant="outlined"
                      className="h-[20px] md:h-[32px] flex items-center"
                      onClick={setEditTextareaMode}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="green"
                      className="h-[26px] md:h-[32px] flex items-center"
                      onClick={setNewTextarea}
                    >
                      Save
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className="column border-2 gap-[40px] p-[22px_20px] lg:w-[40%]">
              <div className="column flex-grow gap-[20px]">
                <div>
                  <span className="font-bold">Board: </span>
                  {myTask.boardId}
                </div>
                <div>
                  <span className="font-bold">Column: </span>
                  {myTask.columnId}
                </div>
                <div>
                  <span className="font-bold">Owner: </span>
                  {myTask.userId}
                </div>
                <div>
                  <span className="font-bold">Assignees: </span>
                  {myTask.users.length ? myTask.users : 'none'}
                </div>
              </div>
              <Button variant="text" color="red" className="flex items-end self-end">
                Delete task
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;

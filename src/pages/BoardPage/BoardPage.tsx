import { useState, useCallback } from 'react';
import TaskModal from '../../components/TaskModal/TaskModal';

const columns = [
  {
    columnId: '1',
    order: 1,
    items: [
      { id: '1', order: 1 },
      { id: '2', order: 2 },
      { id: '3', order: 3 },
      { id: '4', order: 4 },
    ],
  },
  {
    columnId: '2',
    order: 2,
    items: [
      { id: '5', order: 1 },
      { id: '6', order: 2 },
      { id: '7', order: 3 },
      { id: '8', order: 4 },
    ],
  },
];

const BoardPage = () => {
  const [visible, setVisible] = useState(false);

  const showTaskModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeTaskModal = useCallback(() => {
    setVisible(false);
  }, []);

  const [currentColumns, setCurrentColumns] = useState<string | null>(null);
  const [currentTask, setCurrentTask] = useState<{ id: string; order: number } | null>(null);

  const dragStartTaskHandler = (
    event: React.DragEvent<HTMLDivElement>,
    columnId: string,
    task: { id: string; order: number }
  ) => {
    setCurrentColumns(columnId);
    setCurrentTask(task);
  };

  const dragLeaveTaskHandler: React.DragEventHandler<HTMLDivElement> = (event) => {
    console.log('drop');
  };

  const dragEndTaskHandler: React.DragEventHandler<HTMLElement> = (event) => {
    console.log('drop');
  };

  const dragOverTaskHandler: React.DragEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
  };

  const dropTaskHandler = (
    event: React.DragEvent<HTMLDivElement>,
    columnId: string,
    task: { id: string; order: number }
  ) => {
    event.preventDefault();
    console.log('drop', columnId, task);
  };

  return (
    <>
      <div className="relative flex flex-grow justify-center items-center gap-[40px]">
        {visible && <TaskModal onCloseModal={closeTaskModal} />}
        {columns.map((column) => (
          <div
            key={column.columnId}
            id={column.columnId}
            className="border-4 w-[300px] h-[500px] border-cyan-800 flex flex-col gap-[10px] justify-center items-center"
          >
            <h2 className="text-4xl">{column.columnId}</h2>
            {column.items.map((task) => (
              <div
                draggable
                onDragStart={(event) => dragStartTaskHandler(event, column.columnId, task)}
                onDragLeave={dragLeaveTaskHandler}
                onDragEnd={dragEndTaskHandler}
                onDragOver={dragOverTaskHandler}
                onDrop={(event) => dropTaskHandler(event, column.columnId, task)}
                key={task.id}
                onClick={showTaskModal}
                className="w-[90%] h-[40px] border-2 border-deep-orange-500 cursor-grab flex justify-center items-center"
              >
                {task.id}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default BoardPage;

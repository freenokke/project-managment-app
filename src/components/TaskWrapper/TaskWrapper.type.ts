import { ITaskData } from '../../redux/api/tasksApi';

export interface IProps {
  taskData: ITaskData;
  onDragStartFn: (e: React.DragEvent<HTMLDivElement>, data: ITaskData) => void;
  onDragDropFn: (e: React.DragEvent<HTMLDivElement>, data: ITaskData) => void;
  onDragOverFn: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeaveFn: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEndFn: (e: React.DragEvent<HTMLDivElement>) => void;
}

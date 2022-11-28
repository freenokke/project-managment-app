import { ITaskData } from '../../../redux/api/tasksApi';

export interface IProps {
  children: JSX.Element[] | undefined;
  onDragDropFn: (e: React.DragEvent<HTMLDivElement>, data: Pick<ITaskData, 'columnId'>) => void;
  onDragOverFn: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeaveFn: (e: React.DragEvent<HTMLDivElement>) => void;
  loading: boolean;
  columnId: string;
}

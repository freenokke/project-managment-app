export interface IProps {
  columnTitle: string;
  taskCount: number | undefined;
  deleteColumn: () => void;
  columnId: string;
  boardId: string;
  order: number;
}

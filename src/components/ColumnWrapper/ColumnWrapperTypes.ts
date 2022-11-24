import { Dispatch, SetStateAction } from 'react';

export interface IColumnProps {
  id: string;
  title: string;
  order: number;
  boardId: string;
  setCurrentColumn: Dispatch<SetStateAction<ICurrentColumn | null>>;
  currentColumn: ICurrentColumn | null;
}

export interface ICurrentColumn {
  id: string;
  order: number;
  title: string;
}

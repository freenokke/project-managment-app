import { Dispatch, SetStateAction } from 'react';
import { IColumnsResponse } from '../../pages/BoardPage/BoardPage.types';

export interface IColumnProps {
  id: string;
  title: string;
  order: number;
  boardId: string;
  selectedColumn: ICurrentColumn | null;
  setSelectedColumn: Dispatch<SetStateAction<ICurrentColumn | null>>;
  updateColumnsList: (newColumnsList: IColumnsResponse[], type: 'UPDATE' | 'DELETE') => void;
  columnsList: IColumnsResponse[] | null;
}

export interface ICurrentColumn {
  id: string;
  order: number;
  title: string;
}

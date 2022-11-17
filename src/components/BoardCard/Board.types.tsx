export interface IBoard {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IBoardProps {
  id: string;
  title: string;
  description?: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

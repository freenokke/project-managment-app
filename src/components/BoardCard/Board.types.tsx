export interface IBoardResponse {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IBoardData {
  title: string;
  owner: string;
  users: string[];
}

export interface IBoardProps {
  id: string;
  title: string;
  description?: string;
}

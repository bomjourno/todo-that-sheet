export interface ITodoGetDto {
  id: string;
  owner: string;
  status: string;
  title: string;
  date: string;
  priority: number;
  flagged: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITodoPostDto {
  title: string;
  date: string;
  priority: number;
  flagged: boolean;
}
export interface ITodoPatchDto {
  id: string;
  title: string;
  date: string;
  priority: number;
  flagged: boolean;
  status: string;
}

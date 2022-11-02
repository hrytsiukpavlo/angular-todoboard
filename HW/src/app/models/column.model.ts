export interface Comment {
  id: number;
  text: string;
}

export interface Card {
  id: number;
  text: string | null;
  checked: boolean;
}

export interface Column {
  id: number;
  title: string | null;
  description: string;
  creationDate: Date | string;
  color: string;
  list: Card[];
}

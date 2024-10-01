export interface GetItem {
  id: number,
  title: string;
  subtitle: string;
  descriptions: string[];
  status: string;
  priority: string;
  time: number
}

export interface CreateItem {
  title: string;
  subtitle: string;
  descriptions: string[];
  status: string;
  priority: string;
  time: number
}


export interface GetItem {
  id: number;
  title: string;
  subtitle: string;
  descriptions: string[];
  status: string;
  priority: string;
  time: number;
  order: number;
}

export interface CreateItem {
  title: string;
  subtitle: string;
  descriptions: string[];
  status: string;
  priority: string;
  time: number;
}

export interface CreateItemAutoOrder {
  title: string;
  subtitle: string;
  descriptions: string[];
  status: string;
  priority: string;
  time: number;
  order: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  nickname: string;
  username: string;
  email: string;
  password: string;
}

export interface Profile {
  nickname: string;
}

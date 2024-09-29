export interface Item {
  title: string;
  subtitle: string;
  descriptions: string[];
  status: string;
}

export interface ListProps {
  title: string;
  data: Item[];
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddItem: (e: React.FormEvent) => void;
}

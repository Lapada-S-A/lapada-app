export interface Header {
  title: string;
  key: string;
  sortable?: boolean;
  align?: "center" | "start" | "end" | undefined;
}

export interface Item {
    id: number;
    [key: string]: any;
  }
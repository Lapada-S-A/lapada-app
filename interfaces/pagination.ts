export interface Pagination {
  page: number;
  per_page: number;
  total: number;
  order_by: string;
  order_desc: boolean;
  order_asc: boolean;
}

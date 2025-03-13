export interface Category {
  id?: number;
  name: string;
}

export interface CategoryPaginatedResponse {
  categories: Category[];
  page: number;
  per_page: number;
  total: number;
  pages: number;
}

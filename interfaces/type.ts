export interface Type {
  id?: number;
  name: string;
  description: string;
}

export interface TypePaginatedResponse {
  types: Type[];
  page: number;
  per_page: number;
  total: number;
  pages: number;
}
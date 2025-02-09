import type { Category } from "./category";

export type FilterData = {
    title?: string | null;
    categoryId: Category | null ;
    typeId: ModelWithId | null;
    status: string | null;
    minBid: number | null;
    maxBid: number | null;
    endDate: string | Date |  null;
};

export type ModelWithId = {
  id?: number;
  name?: string;
}

export type ModelWithLabel ={
  name?: string;
  label?: string;
}

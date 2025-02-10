import type { Category } from "./category";
import type { Type } from "./type";

export type FilterData = {
    title?: string | null;
    categoryId: Category | null ;
    typeId: Type | null;
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

export type FilterData = {
    title?: string | null;
    categoryId: ModelWithId | null ;
    typeId: ModelWithId | null;
    status: string | null;
    initialValue: number | null;
    highestBid: number | null;
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

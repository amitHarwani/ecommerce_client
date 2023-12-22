export type category = {
  _id: string;
  name: string;
  owner: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type categories = {
  categories: Array<category>;
  totalCategories: number;
  limit: number;
  page: number;
  totalPages: number;
  serialNumberStartFrom: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
};

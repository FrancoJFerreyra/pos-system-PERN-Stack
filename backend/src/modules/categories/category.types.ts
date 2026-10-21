export type CreateCategoryData = {
  name: string;
};

export type UpdateCategoryData = {
  name?: string;
};

export type GetAllCategoryQuery = {
  name?: string;
  populate?: string[];
};

export type GetByIdCategoryQuery = {
  populate?: string[];
};

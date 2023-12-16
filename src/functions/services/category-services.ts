import APIClient from "./api-client";

export interface Category {
  _id: string;
  name: string;
  children: Category[];
}

export default new APIClient<Category>("/settings/allCategory");

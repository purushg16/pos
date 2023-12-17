import { APIGetClient, APIPostClient } from "./api-client";

export interface Category {
  _id: string;
  name: string;
  children: Category[];
}

const GetCategory = new APIGetClient<Category>("/settings/allCategory");
const PostCategory = new APIPostClient<Category>("/settings/allCategory");

export { GetCategory, PostCategory };

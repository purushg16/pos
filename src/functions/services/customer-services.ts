import { APIGetClient, APIPostClient } from "./api-client";

export interface Customer {
  _id?: string;
  name: string;
  number: number;
  balance: number;
}

const getAllCustomer = new APIGetClient<Customer>("/party/allCustomer");
const addCustomer = new APIPostClient<Customer>("/party/addCustomer");

export { addCustomer, getAllCustomer };

import APIClient from "./api-client";

export interface Customer {
  name: string;
  number: number;
  balance: number;
}

const addCustomer = new APIClient<Customer>("/party/allCustomer");
const getAllCustomer = new APIClient<Customer>("/party/addCustomer");

export { addCustomer, getAllCustomer };

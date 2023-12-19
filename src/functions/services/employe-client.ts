import { APIGetClient, APIPostClient } from "./api-client";

export interface Employee {
  name: string;
  passcode: number;
}

const GetEmployee = new APIGetClient<Employee>("/party/allEmployee");
const PostEmployee = new APIPostClient<Employee>("/party/addEmployee");

export { GetEmployee, PostEmployee };

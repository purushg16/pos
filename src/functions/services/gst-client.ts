import { APIGetClient, APIPostClient } from "./api-client";

export interface GST {
  gstinNo: string;
  billNo: number;
}

const GetGST = new APIGetClient<GST>("/settings/allGstin");
const PostGST = new APIPostClient<GST>("/settings/addGstin");

export { GetGST, PostGST };

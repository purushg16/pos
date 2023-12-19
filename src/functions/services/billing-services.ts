import { APIPostClient } from "./api-client";

interface BillProducts {
  productId: string;
  stock: number;
  salesPrice: number;
}

export interface BillData {
  customer: string;
  billAmount: number;
  gstinNo: string;
  billType: string;
  billerName: string;
  itemHandled: boolean;
  handler: string;
  paymentMode: string;
  payment: string;
  partialAmount?: number;
  products: BillProducts[];
}

const PostBill = new APIPostClient<BillData>("/billing/bill");
export default PostBill;

// const GetBill = new APIGetClient<BillData>("/settings/allCategory");
// export { GetBill, PostBill };

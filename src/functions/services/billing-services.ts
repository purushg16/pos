import { BillData } from "../../components/entities/BillData";
import { APIPostClient } from "./api-client";

const PostBill = new APIPostClient<BillData>("/billing/bill");
export default PostBill;

// const GetBill = new APIGetClient<BillData>("/settings/allCategory");
// export { GetBill, PostBill };

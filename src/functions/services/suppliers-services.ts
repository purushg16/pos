import { APIGetClient } from "./api-client";

interface Suppliers {
  supplierId: string;
  purchasePrice: number;
  salesPrice: number;
  stock: number;
}

export default new APIGetClient<Suppliers>("/party/allSupplier");

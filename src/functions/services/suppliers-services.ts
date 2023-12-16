import APIClient from "./api-client";

interface Suppliers {
  supplierId: string;
  purchasePrice: number;
  salesPrice: number;
  stock: number;
}

export default new APIClient<Suppliers>("/party/allSupplier");

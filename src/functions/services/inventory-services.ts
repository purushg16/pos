import APIClient from "./api-client";

interface ProductSupplier {
  supplierId: string;
  purchasePrice: number;
  salesPrice: number;
  stock: number;
}

export interface Product {
  _id: string;
  itemName: string;
  barCode: number;
  code: number;
  unit: string;
  category: string;
  taxRate: number;
  mrp: number;
  suppliers: ProductSupplier[];
}

export default new APIClient<Product>("/inventory/allItems");

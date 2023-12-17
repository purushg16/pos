import { APIGetClient, APIPostClient } from "./api-client";

interface ProductSupplier {
  supplierId: string;
  purchasePrice: number;
  salesPrice: number;
  stock: number;
}

export interface Product {
  _id?: string;
  itemName: string;
  barCode: number;
  code: number;
  unit: string;
  category: string;
  taxRate: number;
  mrp: number;
  suppliers?: ProductSupplier[];
}

const getAllProducts = new APIGetClient<Product>("/inventory/allItems");
const postProduct = new APIPostClient<Product>("/inventory/addItem");

export { getAllProducts, postProduct };

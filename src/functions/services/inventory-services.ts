import { APIGetClient, APIPostClient } from "./api-client";

interface ProductSupplier {
  supplierId: string;
  purchasePrice: number;
  stock: number;
}

export interface Product {
  _id?: string;
  itemName: string;
  barCode: number;
  code: number;
  unit: string;
  topUnit: string;
  unitConv: number;
  category: string;
  salesPrice: number;
  taxRate: number;
  mrp: number;
  zone: string;
  suppliers?: ProductSupplier[];
}

const getAllProducts = new APIGetClient<Product>("/inventory/allItems");
const postProduct = new APIPostClient<Product>("/inventory/addItem");

export { getAllProducts, postProduct };
